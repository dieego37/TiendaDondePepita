let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let port = process.env.PORT || 3002;

let app = express();

let Usuario = require("./routes/usuario");
let Producto = require("./routes/producto");
let Stock = require("./routes/stock");

mongoose.connect(
  "mongodb://localhost:27017/tiendaPepitadb",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Servidor al pelo: ON");
      app.listen(port, function () {
        console.log("Servidor funcionando en el puerto :" + port);
      });
    }
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", Usuario);
app.use("/api", Producto);
app.use("/api", Stock);

module.exports = app;
