import { useState, useMemo, useEffect } from 'react'
import { skrip, namaSiri } from './data'
import Teleprompter from './Teleprompter'
import { muat, simpan, salinKeClipboard, kiraPatah, anggarMasa, tarikhMelayu } from './util'

const SIRI = ["Semua", ...Array.from(new Set(skrip.map(s => s.siri)))]
const TOPIK = ["Semua", ...Array.from(new Set(skrip.map(s => s.topik)))]
const nombor = s => `${s.siri} · ${String(s.no).padStart(2, "0")}`
const HAD_AWAL = 30

export default function App() {
  const [cari, setCari] = useState("")
  const [siri, setSiri] = useState("Semua")
  const [topik, setTopik] = useState("Semua")
  const [status, setStatus] = useState("semua")   // semua | belum | dah
  const [dahRakam, setDahRakam] = useState(() => muat("dahRakam", {}))
  const [had, setHad] = useState(HAD_AWAL)
  const [disalin, setDisalin] = useState(null)
  const [prompter, setPrompter] = useState(null)   // skrip yang sedang dibuka dalam teleprompter
  const [kembang, setKembang] = useState({})       // kad mana yang dibuka penuh

  // Buka terus teleprompter kalau URL ada #skrip-5 (senang bookmark kat phone)
  useEffect(() => {
    const m = window.location.hash.match(/^#skrip-(\d+)$/)
    if (m) {
      const s = skrip.find(x => x.id === Number(m[1]))
      if (s) setPrompter(s)
    }
  }, [])

  const skripHariIni = useMemo(() => pilihHariIni(skrip, dahRakam), [dahRakam])

  const senaraiPenuh = useMemo(() => {
    const kata = cari.trim().toLowerCase().split(/\s+/).filter(Boolean)
    return skrip.filter(s => {
      if (siri !== "Semua" && s.siri !== siri) return false
      if (topik !== "Semua" && s.topik !== topik) return false
      if (status === "belum" && dahRakam[s.id]) return false
      if (status === "dah" && !dahRakam[s.id]) return false
      if (kata.length === 0) return true
      const hay = [nombor(s), namaSiri[s.siri] || "", s.tajuk, s.teks, s.tags.join(" "), s.topik, s.hook || ""].join(" ").toLowerCase()
      return kata.every(k => hay.includes(k))   // semua kata kunci mesti ada
    })
  }, [cari, siri, topik, status, dahRakam])

  const senarai = senaraiPenuh.slice(0, had)
  // Kiraan dah rakam ikut siri & topik yang sedang dipilih
  const skop = skrip.filter(s => (siri === "Semua" || s.siri === siri) && (topik === "Semua" || s.topik === topik))
  const jumlahRakam = skop.filter(s => dahRakam[s.id]).length
  const tukarStatus = (nilai, on) => { setStatus(on ? nilai : "semua"); setHad(HAD_AWAL) }

  function salin(s) {
    salinKeClipboard(s.teks).then(() => {
      setDisalin(s.id)
      setTimeout(() => setDisalin(null), 1500)
    })
  }
  function tukarRakam(id) {
    setDahRakam(prev => {
      const baru = { ...prev, [id]: !prev[id] }
      simpan("dahRakam", baru)
      return baru
    })
  }
  function bukaPrompter(s) {
    setPrompter(s)
    try { history.replaceState(null, "", `#skrip-${s.id}`) } catch {}
  }
  function tutupPrompter() {
    setPrompter(null)
    try { history.replaceState(null, "", window.location.pathname) } catch {}
  }

  return (
    <div className="app">
      <header className="header">
        <div className="wrap">
          <h1 className="logo">🎬 Vault Skrip Video</h1>
          <p className="tagline">Cari skrip, salin, atau buka teleprompter terus untuk rakam.</p>
        </div>
      </header>

      <div className="wrap kawalan">
        {skripHariIni && (
          <div className="banner">
            <div>
              <div className="banner-tarikh">📅 {tarikhMelayu(new Date())}</div>
              <div className="banner-sub">Skrip cadangan hari ni: <b>{nombor(skripHariIni)} — {skripHariIni.tajuk}</b></div>
            </div>
            <button className="btn btn-emas" onClick={() => bukaPrompter(skripHariIni)}>▶ Rakam sekarang</button>
          </div>
        )}

        <input
          className="search"
          type="search"
          placeholder="🔍 Cari topik, kata kunci… (cth: zakat, 916, script-03 07)"
          value={cari}
          onChange={e => { setCari(e.target.value); setHad(HAD_AWAL) }}
        />
        <div className="chips">
          {SIRI.map(k => (
            <button
              key={k}
              className={"chip chip-siri" + (siri === k ? " aktif" : "")}
              onClick={() => { setSiri(k); setHad(HAD_AWAL) }}
            >
              {k}{namaSiri[k] ? ` · ${namaSiri[k]}` : ""} <span className="chip-n">{k === "Semua" ? skrip.length : skrip.filter(s => s.siri === k).length}</span>
            </button>
          ))}
        </div>
        <div className="chips">
          {TOPIK.map(k => (
            <button
              key={k}
              className={"chip" + (topik === k ? " aktif" : "")}
              onClick={() => { setTopik(k); setHad(HAD_AWAL) }}
            >
              {k} <span className="chip-n">{skrip.filter(s => (siri === "Semua" || s.siri === siri) && (k === "Semua" || s.topik === k)).length}</span>
            </button>
          ))}
        </div>
        <div className="toggles">
          <label className="toggle">
            <input type="checkbox" checked={status === "belum"} onChange={e => tukarStatus("belum", e.target.checked)} />
            <span>Belum rakam sahaja</span>
          </label>
          <label className="toggle">
            <input type="checkbox" checked={status === "dah"} onChange={e => tukarStatus("dah", e.target.checked)} />
            <span>Dah rakam sahaja</span>
          </label>
        </div>
        <div className="statbar">
          <span>Papar {senarai.length} dari {senaraiPenuh.length}</span>
          <span>{jumlahRakam} / {skop.length} dah rakam{siri !== "Semua" ? ` (${siri})` : ""}</span>
        </div>
      </div>

      <main className="wrap grid">
        {senarai.length === 0 && <p className="kosong">Tiada skrip yang padan. Cuba kata kunci lain.</p>}
        {senarai.map(s => {
          const perenggan = s.teks.split(/\n\s*\n/)
          const buka = kembang[s.id]
          return (
            <article key={s.id} className={"kad" + (dahRakam[s.id] ? " kad-rakam" : "")}>
              <div className="kad-atas">
                <span className="no">{nombor(s)}</span>
                <span className="meta">{anggarMasa(kiraPatah(s.teks))} · {kiraPatah(s.teks)} patah</span>
              </div>
              <h2 className="tajuk">{s.tajuk}</h2>
              <div className="sub">
                <span className="badge">{s.topik}</span>
                {s.hook && <span className="gaya">🎣 {s.hook}</span>}
              </div>
              <p className="hook">“{perenggan[0]}”</p>
              <div className="tags">
                {s.tags.map(t => (
                  <button key={t} className="tag" onClick={() => { setCari(t); setHad(HAD_AWAL) }}>#{t}</button>
                ))}
              </div>
              {buka && <div className="teks">{s.teks}</div>}
              <button className="btn-link" onClick={() => setKembang(k => ({ ...k, [s.id]: !k[s.id] }))}>
                {buka ? "▲ Tutup skrip" : "▼ Baca skrip penuh"}
              </button>
              <button className="btn btn-emas btn-penuh" onClick={() => bukaPrompter(s)}>🎬 Teleprompter</button>
              <div className="kad-butang">
                <button className={"btn btn-garis" + (disalin === s.id ? " ok" : "")} onClick={() => salin(s)}>
                  {disalin === s.id ? "✓ Disalin!" : "📋 Salin"}
                </button>
                <button className="btn btn-garis" onClick={() => tukarRakam(s.id)}>
                  {dahRakam[s.id] ? "↩ Belum rakam" : "✓ Dah rakam"}
                </button>
              </div>
              {dahRakam[s.id] && <div className="cap-rakam">✓ Dah rakam</div>}
            </article>
          )
        })}
      </main>

      {senaraiPenuh.length > senarai.length && (
        <div className="wrap lagi">
          <button className="btn btn-garis" onClick={() => setHad(h => h + HAD_AWAL)}>
            ⬇ Tunjuk lagi ({senaraiPenuh.length - senarai.length} lagi)
          </button>
        </div>
      )}

      <footer className="footer">Vault Skrip Video · Taufik Bin Musa</footer>

      {prompter && <Teleprompter skrip={prompter} label={nombor(prompter)} onTutup={tutupPrompter} />}
    </div>
  )
}

// Pilih 1 skrip hari ni (deterministik ikut tarikh, utamakan yang belum rakam)
function pilihHariIni(semua, dahRakam) {
  if (semua.length === 0) return null
  const t = new Date()
  const benih = t.getFullYear() * 10000 + (t.getMonth() + 1) * 100 + t.getDate()
  const belum = semua.filter(s => !dahRakam[s.id])
  const sumber = belum.length ? belum : semua
  const rng = n => { const x = Math.sin(n) * 10000; return x - Math.floor(x) }
  return [...sumber].sort((a, b) => rng(a.id + benih) - rng(b.id + benih))[0]
}
