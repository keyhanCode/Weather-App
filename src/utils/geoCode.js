const request = require("postman-request");

function geoCode(address, callback) {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2FqYWR6YXJlIiwiYSI6ImNsN2QzMHduaTFqaHAzdm5nNmtlYnB0dmcifQ.pp_81OMy1gIPbCVZOl_bVA&limit=1";
    
  request({ url , json: true }, (error, {body} = {}) => {
    if (error) {
      const err =
        "Unable to connect to location service! Please check your internet connection. ";
      callback(err, undefined);

    } else if (body.features.length === 0) {
      const err = "Unable to find location. Try another search";
      callback(err, undefined);

    } else {
      const res = {
        longtitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      };
      callback(undefined, res);
    }
  });
}



module.exports = geoCode
