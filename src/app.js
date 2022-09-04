const path = require("path");
const express = require("express");
const hbs = require("hbs"); //require hbs for set partial location
//
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

//set port
const port = process.env.PORT || 3000;

//call express function
const app = express();

//Define path for express config
const publicDirectoyPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup static directory to save
app.use(express.static(publicDirectoyPath));

//Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup template variables for pages
app.get("", (req, res) => {
  res.render("index.hbs", {
    headTitle: "Weather forecast app",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "About me",
    headTitle: "About",
  });
});

//send object for weather respons
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide address" });
  }
  geoCode(req.query.address, (err, { latitude, longtitude, location } = {}) => {
    if (err) {
      res.send({ err });
    } else {
      forecast(
        latitude,
        longtitude,
        (err, { descrition, temperature, feelsLike } = {}) => {
          if (err) {
            res.send({ err });
          } else {
            const result =
              descrition +
              ". It's currently " +
              temperature +
              " degress out in Celsius , It feels like " +
              feelsLike;
            res.send({
              forecast: result,
              location,
              address: req.query.address,
            });
          }
        }
      );
    }
  });
});

//define 404 pages
app.get("/about/*", (req, res) => {
  res.render("404.hbs", {
    headTitle: "404 Error",
    errorMessage: "about article not found 🗿",
  });
});

app.get("*", (req, res) => {
  res.render("404.hbs", {
    headTitle: "404 Error",
    errorMessage: "Page not found",
  });
});

//set wich port express listen to and run the server
app.listen(port, () => {
  console.log("server is running on port " + port);
});
