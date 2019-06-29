"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var productoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El producto necesita un nombre']
    },
    preciogeneral: {
        type: Number,
        required: [true, 'El producto necesita un precio de venta']
    },
    preciodescuento: {
        type: Number
    },
    imagen: {
        type: String
    },
    marca: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'CatMarca'
    },
    cantidad: {
        type: Number,
        default: 0
    },
    codigo: {
        type: Number
    },
    codigodebarras: {
        type: Number
    }
});
exports.Producto = mongoose_1.model('Producto', productoSchema);
