import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Autor from 'App/Models/Autor'

export default class AutorsController {
    public async registrar({request}: HttpContextContract){
        const {nombre} = request.all();
        const autor = new Autor();
        autor.nombreAutor = nombre;
        await autor.save();
        return{edit: autor, "msj": "Autor registrado"}
    }

    public async getListarAutor(): Promise<Autor[]> {
        const autores = await Autor.all();
        return autores;
    }
}