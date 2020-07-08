const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Yara",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Yara",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help message",
    title: "Help",
    name: "Yara",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term!",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            location: location,
            weather: forecastData,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Help article not found.",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    message: "My 404 page",
    name: "Yara",
    title: "Error",
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
