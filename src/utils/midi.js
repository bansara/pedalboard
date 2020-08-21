import store from '../components/store/store'

export const midiAccess = async (cb) => {
  try {
    const access = await navigator.requestMIDIAccess({ sysex: false })
    const inputs = await [...access.inputs];
    const pedal = await inputs.find(i => i[0] === '385758241')
    console.log(pedal[1])
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
  } catch (e) {
    console.log('MIDI not supported', e)
  }
}

// export const pedal = Promise.resolve(MIDI_Setup()).then(p => p)

// let pedal

// navigator.requestMIDIAccess({ sysex: false })
//   .then(access => {
//     const inputs = [...access.inputs];
//     const outputs = access.outputs;
//     pedal = inputs.find(i => i[0] === '385758241')
//   })

// class Pedal {
//   constructor(input) {
//     this.input = input
//     this.input.addEventListener('midimessage', this.getNote)
//   }
//   getNote = (e) => {
//     if (e.data[0] === 144) {
//       return e.data[1]
//     }
//   }

// return new Pedal(pedal)


// export default pedal