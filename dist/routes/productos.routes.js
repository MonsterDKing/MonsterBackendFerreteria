"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var producto_model_1 = require("../models/producto.model");
var bson_1 = require("bson");
var ProductosRoutes = express_1.Router();
//obtenerProductosPorNombre()
ProductosRoutes.get('/busqueda/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var nombre, codigo, codigodebarras, productos, productos, productos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nombre = req.query.nombre;
                codigo = Number(req.query.codigo) || 0;
                codigodebarras = Number(req.query.codigodebarras) || 0;
                if (!(nombre != null)) return [3 /*break*/, 2];
                return [4 /*yield*/, producto_model_1.Producto.find({ nombre: new RegExp('.*' + nombre + '.*', "i") }).exec()];
            case 1:
                productos = _a.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        productos: productos
                    })];
            case 2:
                ;
                if (!(codigo != 0)) return [3 /*break*/, 4];
                console.log('codigo' + codigo);
                return [4 /*yield*/, producto_model_1.Producto.find({ codigo: codigo }).exec()];
            case 3:
                productos = _a.sent();
                if (productos.length === 0) {
                    return [2 /*return*/, res.json({
                            ok: false,
                            mensa: 'No se encontraron resultados para esta busqueda'
                        })];
                }
                return [2 /*return*/, res.json({
                        ok: true,
                        productos: productos
                    })];
            case 4:
                if (!(codigodebarras != 0)) return [3 /*break*/, 6];
                console.log('codigodebarras' + codigodebarras);
                return [4 /*yield*/, producto_model_1.Producto.find({ codigodebarras: codigodebarras }).exec()];
            case 5:
                productos = _a.sent();
                if (productos.length === 0) {
                    return [2 /*return*/, res.json({
                            ok: false,
                            mensa: 'No se encontraron resultados para esta busqueda'
                        })];
                }
                ;
                return [2 /*return*/, res.json({
                        ok: true,
                        productos: productos
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); });
//obtenerProductosPorMarca
ProductosRoutes.get('/marca', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var marca, productos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                marca = 'Ferreteria General';
                return [4 /*yield*/, producto_model_1.Producto.find().populate('marca', '-_id').exec()];
            case 1:
                productos = _a.sent();
                res.json({
                    ok: true,
                    productos: productos
                });
                return [2 /*return*/];
        }
    });
}); });
//crear producto
ProductosRoutes.post('/', function (req, res) {
    var body = req.body;
    var p = {
        nombre: body.nombre,
        preciogeneral: Number(body.preciogeneral),
        preciodescuento: Number(body.preciodescuento),
        marca: new bson_1.ObjectID(body.marca),
        cantidad: body.cantidad,
        codigo: body.codigo,
        codigodebarras: body.codigodebarras
    };
    producto_model_1.Producto.create(p).then(function (productoDb) {
        res.json({
            ok: true,
            producto: productoDb
        });
    }).catch(function (err) {
        res.status(400).json({
            ok: false,
            mensaje: 'Hubo un error en la creacion del producto',
            err: err
        });
    });
});
//obtenerProductos paginados
ProductosRoutes.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var pagina, skip, productos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pagina = Number(req.query.pagina) || 1;
                skip = pagina - 1;
                skip = skip * 10;
                return [4 /*yield*/, producto_model_1.Producto.find().skip(skip).limit(100).populate('marca').exec()];
            case 1:
                productos = _a.sent();
                res.json({
                    ok: true,
                    productos: productos
                });
                return [2 /*return*/];
        }
    });
}); });
exports.default = ProductosRoutes;
