import { Schema, model, Document } from 'mongoose';
import { ObjectID } from 'bson';

const productoSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'CatMarca'
    },
    cantidad:{
        type:Number,
        default:0
    },
    codigo:{
        type:Number
    },
    codigodebarras:{
        type:Number
    }
});

interface IProducto extends Document{
    nombre:string;
    preciouno:number;
    preciodos:number;
    image:string;
    marca:ObjectID;
    cantidad:Number;
    codigo:Number;
    codigoDeBarras:Number;
}

export const Producto = model<IProducto>('Producto', productoSchema);