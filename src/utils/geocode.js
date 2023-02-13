const request = require("postman-request");
const geocode = (address, callback) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=1&appid=a039a8bc81bb92bb0aa8824e809cddde`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to location services!`, undefined);
    } else if (body.lenght === 0 || body.message) {
      callback(`unable to find loaction, try another search`, undefined);
    } else {
      callback(
        undefined,
        //   {
        //   lat: response.body[0].lat,
        //   long: response.body[0].lon,
        //   placename: response.body[0].name,
        // }
        ({ lat, lon } = body[0] || {})
      );
      console.log(lat, lon);
    }
  });
};

module.exports = geocode;
