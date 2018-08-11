export default (value) => {
  let stringTime = value + ''
  if (stringTime.indexOf('.') > -1) {
    stringTime = stringTime.split('.')[0] + '\'30\"'
  } else {
    stringTime = stringTime + '\''
  }
  return stringTime
}
