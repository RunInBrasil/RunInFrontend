export default (value) => {
  if (value !== null && value !== undefined) {
    var stringArray = value.split(' ')
    var year = stringArray[0]
    var day = year.substr(year.length - 2, 2)
    var month = year.substr(5, 2)
    var justYear = year.substr(0, 4)

    year = day + '/' + month + '/' + justYear
    var hour = ''
    if (stringArray.length > 1) {
      hour = stringArray[1]
    }
    if (hour === '') {
      return year
    } else {
      return year + ' - ' + hour.substr(0, 5)
    }
  } else {
    return 'Sem Data'
  }
}
