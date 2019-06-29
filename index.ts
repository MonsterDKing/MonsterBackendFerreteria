import Server from './classes/server';
import bodyParser from 'body-parser';
import ProductosRoutes from './routes/productos.routes';
import mongoose from 'mongoose';
import CatMarcaRoutes from './routes/catmarca.routes';

const server = new Server();


//midleware de transformar post to object 
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());


//CORS
server.app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST ,PUT ,DELETE ,OPTION ")
    next();
  });
  


server.app.use('/productos',ProductosRoutes);
server.app.use('/catmarcas',CatMarcaRoutes);

//conectar a db
mongoose.connect('mongodb://localhost:27017/ferreteria', {useNewUrlParser:true,useFindAndModify:false}, (err)=>{
    if(err) throw err;
    console.log('Base de datos funcionando correctamente')
});

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`)
})