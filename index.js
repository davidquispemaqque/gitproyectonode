const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Ruta para obtener productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Ruta para agregar un nuevo producto (POST)
app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Ruta para actualizar un producto existente (PUT)
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    producto.nombre = req.body.nombre || producto.nombre;
    producto.precio = req.body.precio || producto.precio;

    res.json(producto);
});

// Ruta para eliminar un producto (DELETE)
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    productos.splice(index, 1);
    res.status(204).send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
