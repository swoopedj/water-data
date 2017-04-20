module.exports = function(coordinates) {
  var longitude_constant = 0.018315;
  var latitude_constant = 0.014492;
  var bBox = {
    west: coordinates.lng - (radius * longitude_constant),
    south: coordinates.lat - (radius * latitude_constant),
    east: coordinates.lng + (radius * longitude_constant),
    north: coordinates.lat + (radius * latitude_constant)
  }
  var westLong = round(bBox.west).toString()
  var southLat = round(bBox.south).toString()
  var eastLong = round(bBox.east).toString()
  var northLat = round(bBox.north).toString()

  return westLong + ',' + southLat + ',' + eastLong + ',' + northLat;
}

function round(n){
  var str = n.toString()
  if(str.indexOf('.') !== -1){
    var index = str.indexOf('.')
    var decimalSlice = str.slice(index, index + 6)
    var integerSlice = str.slice(0, index)
    return Number(integerSlice + decimalSlice)
  } else {return n}
}