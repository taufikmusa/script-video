// Green screen: kesan badan (MediaPipe selfie segmenter, jalan dalam phone) → tukar latar
// kepada hijau / gambar studio, pilihan garis putih keliling badan. Semua dilukis ke canvas 1080x1920.

export const OUT_W = 1080, OUT_H = 1920
const SW = 288, SH = 512          // resolusi topeng (kecil supaya laju di phone, dibesarkan licin)

let janjiSeg = null
export function muatSegmenter() {
  if (!janjiSeg) {
    janjiSeg = (async () => {
      const { ImageSegmenter } = await import("@mediapipe/tasks-vision")
      const asas = new URL("mediapipe/", document.baseURI).href
      const fileset = { wasmLoaderPath: asas + "vision_wasm_internal.js", wasmBinaryPath: asas + "vision_wasm_internal.wasm" }
      const opsyen = delegate => ({
        baseOptions: { modelAssetPath: asas + "selfie_segmenter.tflite", delegate },
        runningMode: "VIDEO", outputConfidenceMasks: true, outputCategoryMask: false,
      })
      try { return await ImageSegmenter.createFromOptions(fileset, opsyen("GPU")) }
      catch { return await ImageSegmenter.createFromOptions(fileset, opsyen("CPU")) }
    })()
    janjiSeg.catch(() => { janjiSeg = null })
  }
  return janjiSeg
}

const kanvas = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c }

// Potong tengah sumber w×h kepada nisbah 9:16
function potong(vw, vh) {
  const r = OUT_W / OUT_H
  let sw = vw, sh = vh, sx = 0, sy = 0
  if (vw / vh > r) { sw = vh * r; sx = (vw - sw) / 2 } else { sh = vw / r; sy = (vh - sh) / 2 }
  return [sx, sy, sw, sh]
}

// Tukar gambar (fail dari Gallery) kepada JPEG 1080x1920 (potong tengah) — senang disimpan & dilukis
export async function sediakanGambar(fail) {
  const url = URL.createObjectURL(fail)
  try {
    const img = await new Promise((ok, gagal) => { const i = new Image(); i.onload = () => ok(i); i.onerror = gagal; i.src = url })
    const c = kanvas(OUT_W, OUT_H)
    const [sx, sy, sw, sh] = potong(img.naturalWidth, img.naturalHeight)
    c.getContext("2d").drawImage(img, sx, sy, sw, sh, 0, 0, OUT_W, OUT_H)
    return c.toDataURL("image/jpeg", 0.85)
  } finally { URL.revokeObjectURL(url) }
}

export function buatPemapar(out) {
  const ctx = out.getContext("2d")
  const kecil = kanvas(SW, SH), kctx = kecil.getContext("2d")
  const topeng = kanvas(SW, SH), tctx = topeng.getContext("2d")
  const garis = kanvas(SW, SH), gctx = garis.getContext("2d")
  const orang = kanvas(OUT_W, OUT_H), octx = orang.getContext("2d")
  const data = tctx.createImageData(SW, SH)
  for (let i = 0; i < data.data.length; i += 4) { data.data[i] = data.data[i + 1] = data.data[i + 2] = 255 }
  let adaTopeng = false, tsAkhir = 0
  // AI kesan badan ialah kerja paling berat. Kalau ia lambat, jangan biar video ikut lambat:
  // video tetap dilukis setiap frame, AI cuma dijalankan setiap 2/3 frame (guna topeng terakhir).
  let kiraan = 0, purataMs = 0

  return function lukis(video, seg, { gs, latar, gambar, garisPutih, tebal }) {
    const vw = video.videoWidth, vh = video.videoHeight
    if (!vw || !vh) return
    const [sx, sy, sw, sh] = potong(vw, vh)
    if (!gs || !seg) { ctx.drawImage(video, sx, sy, sw, sh, 0, 0, OUT_W, OUT_H); return }

    // 1. Topeng badan pada resolusi kecil (ikut beban)
    const langkau = purataMs > 24 ? 3 : purataMs > 12 ? 2 : 1
    if (kiraan++ % langkau === 0) {
    kctx.drawImage(video, sx, sy, sw, sh, 0, 0, SW, SH)
    const ts = Math.max(performance.now(), tsAkhir + 1); tsAkhir = ts
    const t0 = performance.now()
    try {
      seg.segmentForVideo(kecil, ts, hasil => {
        const m = hasil.confidenceMasks?.[0]
        if (!m) return
        const f = m.getAsFloat32Array(), d = data.data
        for (let i = 0; i < f.length; i++) {
          const a = (f[i] - 0.35) / 0.3           // tepi lebih tegas, kurang 'halo'
          d[i * 4 + 3] = a <= 0 ? 0 : a >= 1 ? 255 : a * 255
        }
        tctx.putImageData(data, 0, 0)
        adaTopeng = true
      })
    } catch {}
    purataMs = purataMs * 0.8 + (performance.now() - t0) * 0.2
    }

    // 2. Latar
    if (latar === "gambar" && gambar?.complete && gambar.naturalWidth) ctx.drawImage(gambar, 0, 0, OUT_W, OUT_H)
    else { ctx.fillStyle = "#00FF00"; ctx.fillRect(0, 0, OUT_W, OUT_H) }
    if (!adaTopeng) return

    // 3. Garis putih = topeng dikembangkan ke semua arah, diwarnakan putih
    if (garisPutih) {
      const r = (tebal * SW) / OUT_W
      gctx.globalCompositeOperation = "source-over"
      gctx.clearRect(0, 0, SW, SH)
      for (let k = 0; k < 16; k++) {
        const t = (k / 16) * Math.PI * 2
        gctx.drawImage(topeng, Math.cos(t) * r, Math.sin(t) * r)
      }
      gctx.drawImage(topeng, 0, 0)
      gctx.globalCompositeOperation = "source-in"
      gctx.fillStyle = "#fff"; gctx.fillRect(0, 0, SW, SH)
      gctx.globalCompositeOperation = "source-over"
      ctx.drawImage(garis, 0, 0, OUT_W, OUT_H)
    }

    // 4. Badan (video dipotong ikut topeng)
    octx.globalCompositeOperation = "source-over"
    octx.clearRect(0, 0, OUT_W, OUT_H)
    octx.drawImage(video, sx, sy, sw, sh, 0, 0, OUT_W, OUT_H)
    octx.globalCompositeOperation = "destination-in"
    octx.drawImage(topeng, 0, 0, OUT_W, OUT_H)
    octx.globalCompositeOperation = "source-over"
    ctx.drawImage(orang, 0, 0)
  }
}
