
export const draw = (canvas, analyser, dataArray) => {
  requestAnimationFrame(() => draw(canvas, analyser, dataArray))
  analyser.getByteFrequencyData(dataArray)

  // get the canvas from the DOM
  const canvasCtx = canvas.getContext("2d")
  let WIDTH = canvas.width
  let HEIGHT = canvas.height

  // controls overlay color on each frame
  // opacity controls fade out time
  canvasCtx.fillStyle = 'rgba(17,17,17,0.1)'
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

  let barWidth

  // calculate RMS-ish level that emphasizes bass
  const l = dataArray.length
  const arraySum = dataArray.reduce((a, c, i) => a + (c * (l / (i + 1))), 0) / dataArray.length
  // scale the bar to fit the canvas
  barWidth = Math.sqrt(arraySum * 121)

  // draw the bar
  const gr = canvasCtx.createLinearGradient(0, 0, WIDTH, 0)
  gr.addColorStop(0, "rgba(36, 178, 115, 1)")
  gr.addColorStop(0.7, "rgba(203, 234, 45, 1)")
  gr.addColorStop(1, "rgba(234 , 133, 45, 1)")
  canvasCtx.fillStyle = gr
  canvasCtx.fillRect(0, 0, barWidth, HEIGHT)
} 