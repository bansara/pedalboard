export const setPreset = (dispatch, preset) => {
  dispatch({
    type: 'CHANGE_PRESET',
    preset
  })
}