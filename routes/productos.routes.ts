import { Router, Response, response } from "express";
import { Producto } from '../models/producto.model';
import { verificaToken } from "../middleware/autenticacion";
import { ObjectID } from "bson";

const ProductosRoutes = Router();

//obtenerProductosPorNombre()
ProductosRoutes.get('/busqueda/', async (req: any, res: Response) => {
    const nombre = req.query.nombre;
    const codigo = Number(req.query.codigo) || 0;
    const codigodebarras = Number(req.query.codigodebarras) || 0;

    if (nombre != null) {
        //regex similares diferencia de como declarar el regex
        // const productos = await Producto.find({nombre: { $regex: '.*' + nombre + '.*', $options: 'i' }}).exec();
        const productos = await Producto.find({ nombre: new RegExp('.*' + nombre + '.*', "i") }).exec();
        return res.json({
            ok: true,
            productos
        });
    };

    if (codigo != 0) {
        console.log('codigo' + codigo)
        const productos = await Producto.find({ codigo: codigo }).exec();
        if (productos.length === 0) {
            return res.json({
                ok: false,
                mensa: 'No se encontraron resultados para esta busqueda'
            })
        }
        return res.json({
            ok: true,
            productos
        });
    }

    if (codigodebarras != 0) {
        console.log('codigodebarras' + codigodebarras)
        const productos = await Producto.find({ codigodebarras: codigodebarras }).exec();
        if (productos.length === 0) {
            return res.json({
                ok: false,
                mensa: 'No se encontraron resultados para esta busqueda'
            })
        };
        return res.json({
            ok: true,
            productos
        });
    }
});



//obtenerProductosPorMarca
ProductosRoutes.get('/marca', async (req: any, res: Response) => {
    const marca = 'Ferreteria General';
    const productos = await Producto.find().populate('marca', '-_id').exec();
    res.json({
        ok: true,
        productos
    })
});

//crear producto
ProductosRoutes.post('/', (req: any, res: Response) => {
    const body = req.body;
    const p = {
        nombre: body.nombre,
        preciogeneral: Number(body.preciogeneral),
        preciodescuento: Number(body.preciodescuento),
        marca: new ObjectID(body.marca),
        cantidad: body.cantidad,
        codigo: body.codigo,
        codigodebarras: body.codigodebarras
    }
    Producto.create(p).then(productoDb => {
        res.json({
            ok: true,
            producto: productoDb
        })
    }).catch(err => {
        res.status(400).json({
            ok: false,
            mensaje: 'Hubo un error en la creacion del producto',
            err
        })
    });

});


//obtenerProductos paginados
ProductosRoutes.get('/', async (req: any, res: Response) => {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const productos = await Producto.find().skip(skip).limit(100).populate('marca').exec();
    res.json({
        ok: true,
        productos
    });
});


export default ProductosRoutes;