const newContext = () => {
  const audioContext = window.AudioContext || window.webkitAudioContext
  return new audioContext()
}


export default newContext;