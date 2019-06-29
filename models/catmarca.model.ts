import {Schema,model,Document} from 'mongoose';


const CatMarcaSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre de la marca es requerido']
    },
    imagen:{
        type:String
    }
});

interface ICatMarca extends Document{
    nombre:string;
    imagen:string;
}

export const CatMarca = model<ICatMarca>('CatMarca',CatMarcaSchema);