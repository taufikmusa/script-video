import { useState, useEffect, useRef, useCallback } from 'react'
import { muat, simpan, kiraPatah, anggarMasa } from './util'

// Saiz lalai ikut skrin: phone lebih kecil supaya muat 4-5 patah sebaris
const lebar = typeof window !== "undefined" ? window.innerWidth : 1000
// saizKamera = saiz teks bila kamera hidup (lebih kecil supaya muka tak tertutup)
const TETAPAN_LALAI = { laju: 5, saiz: lebar < 600 ? 34 : 52, saizKamera: 18, cermin: false, tengah: false }
const HAD = { lajuMin: 1, lajuMax: 20, saizMin: 18, saizMax: 96 }

// Saiz output TikTok/Reels 9:16 HD
const OUT_W = 1080, OUT_H = 1920

// Mic pelayar lebih perlahan berbanding app kamera (app kamera ada penguat sendiri).
// Naikkan suara ~2.5x, kemudian compressor/limiter supaya suara kuat tapi tak pecah.
const GANDAAN_SUARA = 2.5

function kuatkanSuara(trekAudio) {
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC || !trekAudio.length) return null
  const ac = new AC()
  ac.resume?.()
  const sumber = ac.createMediaStreamSource(new MediaStream(trekAudio))
  const gandaan = ac.createGain()
  gandaan.gain.value = GANDAAN_SUARA
  const komp = ac.createDynamicsCompressor()        // ratakan suara kuat/perlahan
  komp.threshold.value = -20; komp.knee.value = 10; komp.ratio.value = 4
  komp.attack.value = 0.005; komp.release.value = 0.2
  const had = ac.createDynamicsCompressor()         // limiter: elak pecah/clip
  had.threshold.value = -2; had.knee.value = 0; had.ratio.value = 20
  had.attack.value = 0.001; had.release.value = 0.1
  const dest = ac.createMediaStreamDestination()
  sumber.connect(gandaan).connect(komp).connect(had).connect(dest)
  return { trek: dest.stream.getAudioTracks(), tutup: () => { try { ac.close() } catch {} } }
}

// Format rakaman: iPhone/Safari = mp4, Chrome/Android = webm (atau mp4 kalau disokong)
const JENIS_VIDEO = ["video/mp4;codecs=avc1,mp4a", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"]
function pilihJenis() {
  try {
    if (typeof MediaRecorder === "undefined") return null
    return JENIS_VIDEO.find(j => MediaRecorder.isTypeSupported?.(j)) ?? ""
  } catch { return "" }
}
const masaMMSS = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

export default function Teleprompter({ skrip, label, onTutup }) {
  const [tetapan, setTetapan] = useState(() => muat("prompter2", TETAPAN_LALAI))
  const [main, setMain] = useState(false)
  const [kemajuan, setKemajuan] = useState(0)    // 0..1
  const [tamat, setTamat] = useState(false)

  // Kamera depan + rakam
  const [kamera, setKamera] = useState(true)   // terus buka kamera (mod rakam video)
  const [sedia, setSedia] = useState(false)    // stream kamera dah dapat
  const [ralatKamera, setRalatKamera] = useState("")
  const [rakam, setRakam] = useState(false)
  const [saatRakam, setSaatRakam] = useState(0)
  const [hasil, setHasil] = useState(null)        // { url, blob, nama, saat }
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const recRef = useRef(null)
  const ketulRef = useRef([])
  const mulaRakamRef = useRef(0)
  const lukisRef = useRef(null)     // berhenti gelung lukis canvas
  const [infoKamera, setInfoKamera] = useState("")
  const kameraRef = useRef(false)
  kameraRef.current = kamera
  const kunciSaiz = kamera ? "saizKamera" : "saiz"
  const saizAktif = tetapan[kunciSaiz]

  const scrollRef = useRef(null)
  const posRef = useRef(0)       // kedudukan pecahan (scrollTop dibundarkan oleh pelayar)
  const lastRef = useRef(0)
  const tetapanRef = useRef(tetapan)
  tetapanRef.current = tetapan

  const perenggan = skrip.teks.split(/\n\s*\n/)
  const patah = kiraPatah(skrip.teks)

  const ubah = useCallback((kunci, fn) => {
    setTetapan(t => {
      const baru = { ...t, [kunci]: fn(t[kunci]) }
      simpan("prompter2", baru)
      return baru
    })
  }, [])

  // Kunci scroll body + minta skrin jangan padam (Wake Lock) masa teleprompter dibuka
  useEffect(() => {
    const asal = document.body.style.overflow
    document.body.style.overflow = "hidden"
    let kunci = null
    const minta = async () => {
      try { kunci = await navigator.wakeLock?.request("screen") } catch {}
    }
    const bilaNampak = () => { if (document.visibilityState === "visible") minta() }
    minta()
    document.addEventListener("visibilitychange", bilaNampak)
    return () => {
      document.body.style.overflow = asal
      document.removeEventListener("visibilitychange", bilaNampak)
      try { kunci?.release() } catch {}
    }
  }, [])

  // Hidup/matikan kamera depan
  useEffect(() => {
    if (!kamera) return
    let batal = false
    setRalatKamera("")
    ;(async () => {
      try {
        const st = await navigator.mediaDevices.getUserMedia({
          // iPhone kira width/height ikut landscape; dalam portrait jadi 1080x1920
          video: { facingMode: "user", width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30 } },
          // Suara asli & jelas: matikan pemprosesan gaya 'panggilan telefon' yang buat suara tenggelam
          audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: true, channelCount: 1, sampleRate: 48000 },
        })
        if (batal) { st.getTracks().forEach(t => t.stop()); return }
        streamRef.current = st
        setSedia(true)
        if (videoRef.current) {
          const v = videoRef.current
          v.srcObject = st
          v.onloadedmetadata = () => setInfoKamera(`Kamera ${v.videoWidth}×${v.videoHeight} → Rakam ${OUT_W}×${OUT_H} HD`)
          v.play?.().catch(() => {})
        }
      } catch (e) {
        if (batal) return
        setRalatKamera(e?.name === "NotAllowedError"
          ? "Akses kamera/mic ditolak. Benarkan dalam tetapan pelayar, kemudian cuba lagi."
          : "Kamera tak dapat dibuka pada peranti/pelayar ini.")
        setKamera(false)
      }
    })()
    return () => {
      batal = true
      try { if (recRef.current?.state === "recording") recRef.current.stop() } catch {}
      streamRef.current?.getTracks().forEach(t => t.stop())
      streamRef.current = null
      setSedia(false)
    }
  }, [kamera])

  // Jam rakaman
  useEffect(() => {
    if (!rakam) return
    const t = setInterval(() => setSaatRakam((performance.now() - mulaRakamRef.current) / 1000), 250)
    return () => clearInterval(t)
  }, [rakam])

  // Buang URL video lama bila diganti / tutup
  useEffect(() => () => { if (hasil?.url) URL.revokeObjectURL(hasil.url) }, [hasil])

  const hentiRakam = useCallback(() => {
    try { if (recRef.current?.state === "recording") recRef.current.stop() } catch {}
  }, [])

  // Lukis video kamera ke canvas 1080x1920 (potong tengah 9:16, tak dicermin) → stream untuk dirakam
  const streamTikTok = useCallback(st => {
    const v = videoRef.current
    const c = document.createElement("canvas")
    if (!v || !c.captureStream) return null
    c.width = OUT_W; c.height = OUT_H
    const ctx = c.getContext("2d")
    let hidup = true
    const lukis = () => {
      if (!hidup) return
      const vw = v.videoWidth, vh = v.videoHeight
      if (vw && vh) {
        const r = OUT_W / OUT_H
        let sw = vw, sh = vh, sx = 0, sy = 0
        if (vw / vh > r) { sw = vh * r; sx = (vw - sw) / 2 } else { sh = vw / r; sy = (vh - sh) / 2 }
        ctx.drawImage(v, sx, sy, sw, sh, 0, 0, OUT_W, OUT_H)
      }
      requestAnimationFrame(lukis)
    }
    lukis()
    lukisRef.current = () => { hidup = false }
    const out = c.captureStream(30)
    let suara = null
    try { suara = kuatkanSuara(st.getAudioTracks()) } catch { suara = null }
    ;(suara?.trek ?? st.getAudioTracks()).forEach(t => out.addTrack(t))
    const hentiLukis = lukisRef.current
    lukisRef.current = () => { hentiLukis(); suara?.tutup() }
    return out
  }, [])

  const mulaRakam = useCallback(() => {
    const asal = streamRef.current
    const jenis = pilihJenis()
    if (!asal || jenis === null) { setRalatKamera("Pelayar ini tak sokong rakaman video. Cuba Safari (iPhone) atau Chrome."); return }
    let st = asal
    try { st = streamTikTok(asal) || asal } catch { st = asal }
    const opsyen = { videoBitsPerSecond: 10_000_000, audioBitsPerSecond: 160_000 }
    let rec
    try {
      rec = new MediaRecorder(st, { ...(jenis ? { mimeType: jenis } : {}), ...opsyen })
    } catch {
      try { rec = new MediaRecorder(st) } catch { lukisRef.current?.(); setRalatKamera("Rakaman gagal dimulakan."); return }
    }
    ketulRef.current = []
    rec.ondataavailable = e => { if (e.data?.size) ketulRef.current.push(e.data) }
    rec.onstop = () => {
      setRakam(false)
      setMain(false)
      lukisRef.current?.(); lukisRef.current = null
      if (st !== asal) st.getVideoTracks().forEach(t => t.stop())
      const type = rec.mimeType || jenis || "video/mp4"
      const blob = new Blob(ketulRef.current, { type })
      if (!blob.size) return
      const ext = type.includes("mp4") ? "mp4" : "webm"
      const nama = `${(label || "skrip").replace(/[^\w-]+/g, "_")}_${Date.now()}.${ext}`
      setHasil({ url: URL.createObjectURL(blob), blob, nama, saat: (performance.now() - mulaRakamRef.current) / 1000 })
    }
    rec.start(1000)
    recRef.current = rec
    mulaRakamRef.current = performance.now()
    setSaatRakam(0)
    setRakam(true)
    // Mula skrip dari awal serentak dengan rakaman (terus, tanpa 3-2-1)
    setTamat(false)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    posRef.current = 0
    setMain(true)
  }, [label, skrip, streamTikTok])

  // Skrip habis semasa merakam → henti sendiri selepas 1.5 saat (bagi masa senyum/tutup)
  useEffect(() => {
    if (!(tamat && rakam)) return
    const t = setTimeout(hentiRakam, 1500)
    return () => clearTimeout(t)
  }, [tamat, rakam, hentiRakam])

  const simpanVideo = useCallback(async () => {
    if (!hasil) return
    const fail = new File([hasil.blob], hasil.nama, { type: hasil.blob.type })
    try {
      if (navigator.canShare?.({ files: [fail] })) {
        await navigator.share({ files: [fail], title: skrip.tajuk })
        return
      }
    } catch (e) { if (e?.name === "AbortError") return }
    const a = document.createElement("a")
    a.href = hasil.url; a.download = hasil.nama
    document.body.appendChild(a); a.click(); a.remove()
  }, [hasil, skrip])


  // Enjin scroll
  useEffect(() => {
    if (!main) return
    const el = scrollRef.current
    let id
    posRef.current = el.scrollTop
    lastRef.current = performance.now()
    const langkah = now => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.1)
      lastRef.current = now
      // User tarik/scroll sendiri → ikut kedudukan baru
      if (Math.abs(el.scrollTop - posRef.current) > 3) posRef.current = el.scrollTop
      const { laju } = tetapanRef.current
      const saiz = tetapanRef.current[kameraRef.current ? "saizKamera" : "saiz"]
      posRef.current += laju * 0.15 * saiz * dt
      el.scrollTop = posRef.current
      const maks = el.scrollHeight - el.clientHeight
      if (posRef.current >= maks - 1) {
        setMain(false)
        setTamat(true)
        return
      }
      id = requestAnimationFrame(langkah)
    }
    id = requestAnimationFrame(langkah)
    return () => cancelAnimationFrame(id)
  }, [main])

  const kemaskiniKemajuan = () => {
    const el = scrollRef.current
    if (!el) return
    const maks = el.scrollHeight - el.clientHeight
    setKemajuan(maks > 0 ? el.scrollTop / maks : 0)
  }

  // Scroll sahaja (pause/sambung) — rakaman jalan terus
  const togolScroll = useCallback(() => {
    if (hasil) return
    if (main) { setMain(false); return }
    if (tamat) { scrollRef.current.scrollTop = 0; posRef.current = 0; setTamat(false) }
    setMain(true)
  }, [main, tamat, hasil])

  // Butang utama: kamera sedia → tekan terus rakam / stop. Tiada kamera → main/pause biasa.
  const togolMain = useCallback(() => {
    if (hasil) return
    if (kamera && sedia) { rakam ? hentiRakam() : mulaRakam(); return }
    togolScroll()
  }, [hasil, kamera, sedia, rakam, hentiRakam, mulaRakam, togolScroll])

  const tapTeks = useCallback(() => {
    if (rakam || !(kamera && sedia)) togolScroll()
  }, [rakam, kamera, sedia, togolScroll])

  const ulang = useCallback(() => {
    setMain(false)
    setTamat(false)
    scrollRef.current.scrollTop = 0
    posRef.current = 0
  }, [])

  const lompat = useCallback(arah => {
    const el = scrollRef.current
    el.scrollTop += arah * el.clientHeight * 0.3
    posRef.current = el.scrollTop
  }, [])

  // Papan kekunci + remote Bluetooth (kebanyakan hantar PageUp/PageDown/anak panah)
  useEffect(() => {
    const onKey = e => {
      const k = e.key
      if (k === " " || k === "Enter") { e.preventDefault(); togolMain() }
      else if (k === "Escape") onTutup()
      else if (k === "ArrowUp") { e.preventDefault(); ubah("laju", v => Math.min(HAD.lajuMax, v + 1)) }
      else if (k === "ArrowDown") { e.preventDefault(); ubah("laju", v => Math.max(HAD.lajuMin, v - 1)) }
      else if (k === "PageDown" || k === "ArrowRight") { e.preventDefault(); lompat(1) }
      else if (k === "PageUp" || k === "ArrowLeft") { e.preventDefault(); lompat(-1) }
      else if (k === "+" || k === "=") ubah(kunciSaiz, v => Math.min(HAD.saizMax, v + 2))
      else if (k === "-" || k === "_") ubah(kunciSaiz, v => Math.max(HAD.saizMin, v - 2))
      else if (k === "m" || k === "M") ubah("cermin", v => !v)
      else if (k === "r" || k === "R") ulang()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [togolMain, onTutup, ubah, lompat, ulang, kunciSaiz])

  const baki = Math.round((1 - kemajuan) * patah)

  return (
    <div className={"tp" + (kamera ? " tp-kamera" : "")}>
      {kamera && <video ref={videoRef} className="tp-video" autoPlay playsInline muted />}
      <div className="tp-atas">
        {rakam && <div className="tp-rec">● REC {masaMMSS(saatRakam)}</div>}
        <div className="tp-tajuk">{label ? `${label} · ` : ""}{skrip.tajuk}</div>
        <button className="tp-x" onClick={() => { hentiRakam(); onTutup() }} aria-label="Tutup">✕</button>
      </div>
      <div className="tp-progres"><div style={{ width: `${kemajuan * 100}%` }} /></div>

      <div className="tp-garis" aria-hidden="true" />

      <div ref={scrollRef} className="tp-scroll" onScroll={kemaskiniKemajuan} onClick={tapTeks}>
        <div
          className={"tp-teks" + (tetapan.tengah ? " tengah" : "")}
          style={{ fontSize: saizAktif, transform: tetapan.cermin ? "scaleX(-1)" : "none" }}
        >
          {perenggan.map((p, i) => (
            <p key={i} className={i === perenggan.length - 1 ? "tp-punch" : ""}>{p}</p>
          ))}
          <p className="tp-tamat">— TAMAT —</p>
        </div>
      </div>


      {hasil && (
        <div className="tp-hasil">
          <video src={hasil.url} className="tp-hasil-video" controls playsInline />
          <div className="tp-hasil-info">Video siap · {masaMMSS(hasil.saat)}</div>
          <div className="tp-baris">
            <button className="btn btn-emas" onClick={simpanVideo}>⬇ Simpan / Share</button>
            <button className="btn btn-garis" onClick={() => { setHasil(null); ulang() }}>⟲ Rakam semula</button>
          </div>
          <div className="tp-info">iPhone: pilih "Save Video" untuk masuk Gallery. Video belum disimpan selagi tak tekan Simpan.</div>
        </div>
      )}

      <div className={"tp-kawal" + (main ? " malap" : "")}>
        {ralatKamera && (
          <div className="tp-ralat">
            {ralatKamera} <button className="btn-link" onClick={() => { setRalatKamera(""); setKamera(true) }}>Cuba lagi</button>
          </div>
        )}
        {kamera && infoKamera && !rakam && <div className="tp-info">{infoKamera}</div>}
        <div className="tp-baris">
          <button className="tp-btn" onClick={ulang} disabled={rakam} title="Ulang dari awal (R)">⟲</button>
          {kamera && sedia ? (
            <button className={"tp-btn tp-main tp-rec-btn" + (rakam ? " on" : "")} onClick={togolMain} title="Rakam / Stop (Space)">
              {rakam ? "■" : "●"}
            </button>
          ) : (
            <button className="tp-btn tp-main" onClick={togolMain} title="Main / Pause (Space)">{main ? "⏸" : "▶"}</button>
          )}
          <button className={"tp-btn" + (tetapan.cermin ? " on" : "")} onClick={() => ubah("cermin", v => !v)} title="Cermin (M)">⇋</button>
          <button className={"tp-btn" + (tetapan.tengah ? " on" : "")} onClick={() => ubah("tengah", v => !v)} title="Teks tengah">≡</button>
        </div>
        <div className="tp-baris">
          <div className="tp-grup">
            <span>Laju</span>
            <button className="tp-btn kecil" onClick={() => ubah("laju", v => Math.max(HAD.lajuMin, v - 1))}>−</button>
            <b>{tetapan.laju}</b>
            <button className="tp-btn kecil" onClick={() => ubah("laju", v => Math.min(HAD.lajuMax, v + 1))}>+</button>
          </div>
          <div className="tp-grup">
            <span>Saiz</span>
            <button className="tp-btn kecil" onClick={() => ubah(kunciSaiz, v => Math.max(HAD.saizMin, v - 2))}>A−</button>
            <b>{saizAktif}</b>
            <button className="tp-btn kecil" onClick={() => ubah(kunciSaiz, v => Math.min(HAD.saizMax, v + 2))}>A+</button>
          </div>
        </div>
        <div className="tp-info">
          {kamera && sedia
            ? (rakam ? `Baki ${anggarMasa(baki)} · tap teks untuk pause/sambung scroll · ■ untuk stop` : "Tekan ● — terus rakam & skrip mula scroll")
            : (tamat ? "Siap! Tekan ▶ untuk ulang." : `Baki ${anggarMasa(baki)} · tap teks untuk main/pause`)}
        </div>
      </div>
    </div>
  )
}
