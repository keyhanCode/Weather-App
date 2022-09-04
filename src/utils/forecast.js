const request = require("postman-request");
debugger;
function forecast(latitude, longtitude, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=dca1ae8b63f1e33444292258cd05cb53&query=" +
    latitude +
    "," +
    longtitude +
    "&units = m";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      let err =
        "Unable to connect to location service! Please check your internet connection. ";
      callback(err, undefined);
    } else if (body.error) {
      let err = "Unable to find location. Try another search";
      callback(err, undefined);
    } else {
      callback(undefined, {
        descrition: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelsLike: body.current.feelslike,
      });
    }
  });
}

module.exports = forecast;
