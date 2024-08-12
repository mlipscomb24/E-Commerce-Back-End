const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Add a simple route for testing
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// sync sequelize models to the database, then turn on the server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.error("Error starting server:", err);
      } else {
        console.log(`App listening on port ${PORT}!`);
      }
    });
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });
