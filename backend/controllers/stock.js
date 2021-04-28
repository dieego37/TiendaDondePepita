let Stock = require("../models/stock");

const registrarStock = (req, res) => {
  let params = req.body;
  let stock = new Stock();

  if(
    params.idProducto &&
    params.cantidad
  ){
    stock.idProducto = params.idProducto;
    stock.cantidad = params.cantidad;
    stock.save((err, saveStock) => {
      if (err) {
        res.status(500).send({ mensaje: "error al conectar al servidor" });
      } else {
        if (saveStock) {
          res.status(200).send({ stock: saveStock });
        } else {
          res.status(401).send({ mensaje: "no se pudo registrar el stock " });
        }
      }
    });
  }
};

module.exports = {
    registrarStock,
};
