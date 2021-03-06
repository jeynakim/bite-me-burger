// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("../lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

const path = require("path");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: path.join(__dirname, "../styles"),
    destination: path.join(__dirname, "../public/styles"),
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("../routes/users");
const widgetsRoutes = require("../routes/widgets");
const itemsRoutes = require("../routes/items_route");
const ordersRoutes = require("../routes/orders_route");
const restaurauntOrderRoutes = require("../routes/restaurant_order_route")
const addToCart = require("../routes/add_to_cart.js")
const orderCompleteRoutes = require("../routes/order_complete_route")
const viewCart = require("../routes/view_cart.js");
const orderComplete = require("../routes/order_complete.js");
const { sendClientConfirmation, sendAdminOrder, updateClientTime } = require("./twilio/send_sms");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/user/items", itemsRoutes(db));
app.use("/user/orders", ordersRoutes(db))
app.use("/admin/orders", restaurauntOrderRoutes(db))
app.use("/admin/complete", orderComplete(db))
app.use("/user/successful_order", addToCart(db))
app.use("/admin/order/complete", orderCompleteRoutes(db))
app.use("/user/view_cart", viewCart(db))
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/orders", (req, res) => {
  res.render("orders");
});

app.post("/orders", (req, res) => {
  // sendClientConfirmation();
  // sendAdminOrder();
  res.render("orders");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.post("/admin", (req, res) => {
  console.log(`1234heather123`)
  const estimatedTimeForPickup = req.body.name;
  updateClientTime(req.body.name);
  const sqlquery = `
  UPDATE orders
  SET estimate_time_minute = $1
  WHERE id = $2
  `
  const sqlvalues = [estimatedTimeForPickup, req.body.order_id];
  db.query(sqlquery, sqlvalues)
  .then(data => {
    console.log('insert successful', data.rows)
    res.render("admin");
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

app.get("/user/checkout", (req, res) => {
  res.render("checkout");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
