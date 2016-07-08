angular.module('waterData.list', [])
.controller('listCtrl', function(SiteService, $location, $scope, Search){
  var serviceArray = SiteService.siteArray
  var listArray = []
  var listObj = {}

  serviceArray.forEach(function(item){
    var siteObj = {}
    siteObj.site_id = item.sourceInfo.siteCode[0].value;
    siteObj.site_name = item.sourceInfo.siteName;
    siteObj.site_coordinates = item.sourceInfo.geoLocation.geogLocation;
    siteObj.parameter = {
      code: item.variable.variableCode[0].value,
      value: item.values[0].value[0].value,
      time: item.values[0].value[0].dateTime
    }
    siteObj.parameterArray = [siteObj.parameter]

    siteObj.distFromOrigin = distance(SiteService.originCoordinates, siteObj.site_coordinates)
    console.log('SITESERVE ORIGIN: ', SiteService.originCoordinates)
    console.log('SITE COORDS: ', siteObj.site_coordinates)
    if(siteObj.parameter.code === '00060'){
      siteObj.parameter.param_name = 'Stream Flow: ';
      siteObj.parameter.param_unit = 'ft.\u00B3/sec.';
    }
    else if(siteObj.parameter.code === '00065'){
      siteObj.parameter.param_name = 'Gage Height: ';
      siteObj.parameter.param_unit = 'ft.';
    }
    else if(siteObj.parameter.code === '00062'){
      siteObj.parameter.param_name = 'Reservoir Elevation: ';
      siteObj.parameter.param_unit = 'ft.';
    }

    var idString = String(item.sourceInfo.siteCode[0].value)
    
    if(listObj[idString]){
      listObj[idString].parameterArray.push(siteObj.parameter)
    } else {
      listObj[idString] = siteObj;
    }    
  })


  for(var key in listObj){
    listArray.push(listObj[key])
  }

  this.siteList = listArray
  console.log('Site List: ', this.siteList)

  function getSiteDataById(id){
    console.log('ID: ', id)
  }

  function distance(origin, site){
    var radlat1 = Math.PI * origin.lat/180
    var radlat2 = Math.PI * site.latitude/180
    var theta = origin.lng-site.longitude
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    return dist
  }



})