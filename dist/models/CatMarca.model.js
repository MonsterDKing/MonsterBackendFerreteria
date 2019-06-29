"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CatMarcaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la marca es requerido']
    },
    imagen: {
        type: String
    }
});
exports.CatMarca = mongoose_1.model('CatMarca', CatMarcaSchema);
