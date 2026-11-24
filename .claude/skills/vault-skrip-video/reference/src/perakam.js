// Perakam MP4 "bersih" guna WebCodecs (pustaka Mediabunny):
// - frame rate 30 TETAP (CFR) — setiap frame dicop masa tepat pada grid 1/30 s
// - keyframe setiap 1 s, indeks (moov) di depan fail
// MediaRecorder Safari keluarkan MP4 berfragmen + masa frame tak sekata → CapCut tersekat.
// Kalau pelayar tak sokong WebCodecs, Teleprompter guna MediaRecorder (cara lama).

let modul = null
const muatModul = () => (modul ??= import("mediabunny"))

export async function semakSokongan({ lebar, tinggi, fps, videoBps, audioBps }) {
  try {
    if (typeof VideoEncoder === "undefined" || typeof AudioEncoder === "undefined" || typeof AudioData === "undefined") return null
    const m = await muatModul()
    const video = await m.getFirstEncodableVideoCodec(["avc", "vp9"], { width: lebar, height: tinggi, bitrate: videoBps, frameRate: fps })
    const audio = await m.getFirstEncodableAudioCodec(["aac", "opus"], { numberOfChannels: 1, sampleRate: 48000, bitrate: audioBps })
    return video && audio ? { video, audio } : null
  } catch { return null }
}

export async function mulaPerakam(canvas, trekAudio, { codec, fps, videoBps, audioBps }) {
  const m = await muatModul()
  const output = new m.Output({ format: new m.Mp4OutputFormat({ fastStart: "in-memory" }), target: new m.BufferTarget() })
  const sumberVideo = new m.CanvasSource(canvas, { codec: codec.video, bitrate: videoBps, keyFrameInterval: 1 })
  output.addVideoTrack(sumberVideo, { frameRate: fps })
  if (trekAudio) output.addAudioTrack(new m.MediaStreamAudioTrackSource(trekAudio, { codec: codec.audio, bitrate: audioBps }))
  await output.start()

  const t0 = performance.now()
  let slot = 0, tertunda = 0, gagal = null
  const tambah = s => {
    tertunda++
    sumberVideo.add(s / fps, 1 / fps).catch(e => { gagal = e }).finally(() => { tertunda-- })
  }
  return {
    // Dipanggil oleh gelung lukis (30fps) selepas canvas dilukis.
    // Isi setiap slot 1/30 s hingga masa kini — frame terlepas diganti frame semasa, jadi audio & video kekal selari.
    tick(now) {
      const sasaran = Math.floor(((now - t0) / 1000) * fps)
      if (tertunda > 45) { slot = sasaran + 1; return }      // pengekod tersangkut: langkau, jangan bengkak memori
      while (slot <= sasaran) tambah(slot++)
    },
    async henti() {
      while (tertunda > 0) await new Promise(r => setTimeout(r, 20))
      if (gagal) throw gagal
      await output.finalize()
      return new Blob([output.target.buffer], { type: "video/mp4" })
    },
    batal() { try { output.cancel() } catch {} },
  }
}
