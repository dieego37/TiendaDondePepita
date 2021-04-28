let Producto = require("../models/producto");

const registrarProducto = (req, res) => {
  let params = req.body;
  let producto = new Producto();

  if(
    params.nombre &&
    params.descripcion &&
    params.precio
  ){
    producto.nombre = params.nombre;
    producto.descripcion = params.descripcion;
    producto.precio = params.precio;
    Producto.save((err, saveProducto) => {
      if (err) {
        res.status(500).send({ mensaje: "error al conectar al servidor" });
      } else {
        if (saveProducto) {
          res.status(200).send({ categoria: saveProducto });
        } else {
          res.status(401).send({ mensaje: "no se pudo registrar el producto " });
        }
      }
    });
  }
};

const listaProducto = (req, res) => {
  let nombre = req.params["nombre"];
  // Busqueda de las categorias
  Producto.find({ nombre: new RegExp(nombre, "i") }, (err, datosProducto) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosProducto) {
        res.status(200).send({ producto: datosProducto });
      } else {
        res.status(401).send({ mensaje: "No hay productos" });
      }
    }
  });
};

const editarProducto = (req, res) => {
  let id = req.params["id"];
  let params = req.body;
  Producto.findByIdAndUpdate({_id:id}, {nombre: params.nombre, descripcion: params.descripcion, precio: params.precio}, (err, datosProducto) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosProducto) {
        res.status(200).send({ producto: datosProducto });
      } else {
        res.status(401).send({ mensaje: "El producto no se pudo editar " });
      }
    }
  });
};

const eliminarProducto = (req, res) => {
  let id = req.params["id"];
  Producto.findByIdAndDelete({ _id: id }, (err, datosProducto) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosProducto) {
        res.status(200).send({ producto: datosProducto });
      } else {
        res.status(401).send({ mensaje: "El producto no se pudo editar" });
      }
    }
  });
};

module.exports = {
  registrarProducto,
  listaProducto,
  editarProducto,
  eliminarProducto
};
