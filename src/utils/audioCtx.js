const newContext = () => {
  const audioContext = window.AudioContext || window.webkitAudioContext
  return new audioContext({
    sampleRate: 44100
  })
}


export default newContext;