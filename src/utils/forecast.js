const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=791234408890e6d51b17a826bfd0832e&query=" +
    latitude +
    ",%" +
    longitude +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " it is currently " +
          body.current.temperature +
          " degrees. it feels like " +
          body.current.feelslike +
          " degrees out. and the humidity is " +
          body.current.humidity +
          "%."
      );
    }
  });
};

module.exports = forecast;
