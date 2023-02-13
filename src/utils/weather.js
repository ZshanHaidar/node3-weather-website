const request = require("postman-request");

const weather = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=14a338fb1e4bfebd0c2ded8c472eb2ec&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to the services!`, undefined);
    } else if (body.error) {
      callback(`Unable to find location`, undefined);
    } else {
      callback(
        undefined,
        `temperature: ${body.current.temperature} name: ${body.location.name}`
      );
    }
  });
};
module.exports = weather;
