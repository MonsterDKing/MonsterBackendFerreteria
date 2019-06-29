"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var body_parser_1 = __importDefault(require("body-parser"));
var productos_routes_1 = __importDefault(require("./routes/productos.routes"));
var mongoose_1 = __importDefault(require("mongoose"));
var catmarca_routes_1 = __importDefault(require("./routes/catmarca.routes"));
var server = new server_1.default();
//midleware de transformar post to object 
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//CORS
server.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST ,PUT ,DELETE ,OPTION ");
    next();
});
server.app.use('/productos', productos_routes_1.default);
server.app.use('/catmarcas', catmarca_routes_1.default);
//conectar a db
mongoose_1.default.connect('mongodb://localhost:27017/ferreteria', { useNewUrlParser: true, useFindAndModify: false }, function (err) {
    if (err)
        throw err;
    console.log('Base de datos funcionando correctamente');
});
server.start(function () {
    console.log("Servidor corriendo en el puerto " + server.port);
});
