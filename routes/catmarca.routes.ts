import { Router, Response } from "express";
import { verificaToken } from "../middleware/autenticacion";
import {CatMarca} from '../models/catmarca.model';

const CatMarcaRoutes = Router();


//obtener todas las marcas
CatMarcaRoutes.get('/' ,async (req:any,res:Response)=>{
   const marca = await CatMarca.find().exec();
   res.json({
       ok:true,
       marca
   })
});

//crear una marca
CatMarcaRoutes.post('/' , async (req:any,res:Response)=>{
    const body = req.body;
    console.log(body);
    const o = {
        nombre:body.nombre
    }
    CatMarca.create(o).then( ObjetoDb =>{
        res.json({
            ok:true,
            ObjetoDb
        })

    }).catch(err =>{
        res.json({
            ok:false,
            mensaje:'No se pudo registrar la marca correctamente',
            err
        })
    })

});


export default CatMarcaRoutes;