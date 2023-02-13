const path = require(`path`);
const express = require(`express`);
const hbs = require(`hbs`);
const geocode = require(`./utils/geocode.js`);
const weather = require(`./utils/weather.js`);

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, `../public`);
const viewPath = path.join(__dirname, `../templates/views`);
const partialsPath = path.join(__dirname, `../templates/partials`);

// setup handlebars engine and views locations
app.set(`view engine`, `hbs`);
app.set(`views`, viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get(``, (req, res) => {
  res.render(`index`, {
    title: `Weather app`,
    name1: `Zeeshan`,
    byname: `Zeeshan`,
    address: req.query.address,
  });
});

app.get(`/about`, (req, res) => {
  res.render(`about`, {
    title: `About Me`,
    name: "Zeeshan Haidar",
    byname: `Zeeshan`,
  });
});

app.get(`/help`, (req, res) => {
  res.render(`help`, {
    title: `This is help page`,
    message: `How can we help you`,
    byname: `Zeeshan`,
  });
});

app.get(`/weather`, (req, res) => {
  if (!req.query.address) {
    res.send({
      error: `You must provide an address`,
    });
  }
  geocode(req.query.address, (error, { lat, lon }) => {
    if (error) {
      return res.send({ error });
    }
    weather(lat, lon, (error, weather) => {
      if (error === undefined) {
        res.send({
          weather: weather,
        });
      } else {
        res.send({
          error: error,
        });
      }
    });
  });
  // res.send({
  //   temperature: 27,
  //   placename: `Chiniot`,
  //   byname: `Zeeshan`,
  //   address: req.query.address,
  // });
});

app.get(`/products`, (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: `Your must provide a serach term`,
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// app.get(`/help/*`, (req, res) => {
//   res.send(`Help article not found`);
// });

// app.get(`* `, (req, res) => {
//   res.send(`My 404 page`);
// });

app.get(`/help/*`, (req, res) => {
  res.render(`error404`, {
    errorMessage: `Help article not found`,
    byname: `Zeeshan`,
  });
});

app.get(`*`, (req, res) => {
  res.render(`error404`, {
    errorMessage: `page not found 404`,
    byname: `Zeeshan`,
  });
});

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
  console.log(`Server is up on port 3000.`);
});
