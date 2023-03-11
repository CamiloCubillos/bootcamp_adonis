import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfilesController {
    public async registrar({request}: HttpContextContract){
        const {nombrePerfil} = request.all();
        const perfil = new Perfil();
        perfil.nombrePerfil = nombrePerfil;
        await perfil.save();
        return{perfil, "msj": "Perfil registrado"}
    }

    public async getListarPerfiles(): Promise<Perfil[]> {
        const perfiles = await Perfil.all();
        return perfiles;
    }
}

