import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfilsController {
    public async createPerfil({request,response} : HttpContextContract){
        const perfilData = request.only(['id','rol'])
        await Perfil.create({
            "id":perfilData.id,
            "rol":perfilData.rol
        })
        response.status(202).json({"msg":"Rol creado con exito"})
    }
}

