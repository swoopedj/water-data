const request = require('request');
const site_formatter = require('../formatters/site_formatter.js');
const param_combine = require('../formatters/parameter_consolidator.js');

const MySites = module.exports;

MySites.hydrateSiteData = (sub_list) => {
  let siteList = sub_list.map(sub => sub.site_id).join(',')
  let options = {
    url: `http://waterservices.usgs.gov/nwis/iv/?format=json,1.1&sites=${siteList}&parameterCd=00060,00065,00062`
  };

  return new Promise(function(resolve, reject){
    request.get(options, function(error, response, body){
      if(error){
        console.log('Error in server: ', error)
        throw new Error(error)
      }

      response.body = JSON.parse(body);
      let site_list = response.body.value.timeSeries.map((site) => {
        return site_formatter(site, null);
      });

      let mysite_data = {
        subscription_list: sub_list,
        site_list: param_combine(site_list)
      }

      resolve(mysite_data);
      
    })
  })

};



