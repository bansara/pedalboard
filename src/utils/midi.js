import store from '../components/store/store'

export const midiAccess = () => {
  if (navigator && navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({ sysex: false })
      .then(access => {
        const inputs = [...access.inputs];
        const pedal = inputs.find(i => i[0] === '385758241')
        // console.log(pedal[1])
        if (pedal) {
          pedal[1].addEventListener('midimessage', (e) => {
            console.log(e.data)
            if (e.data[0] === 144) {
              store.dispatch({
                type: 'noteOn',
                msg: e.data[1],
                time: Date.now()
              })
            }
          }, false)
        }
      })
  }
  else {
    console.log('MIDI not supported')
  }
}

