import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Editorial from 'App/Models/Editorial';

export default class EditorialesController {
    public async registrar({request}: HttpContextContract){
        const {nombre} = request.all();
        const editorial = new Editorial
        editorial.nombreEditorial = nombre;
        await editorial.save();
        return{editorial, "msj": "Editorial registrada"}
    }

    public async getListarEditorial(): Promise<Editorial[]> {
        const editoriales = await Editorial.all();
        return editoriales;
    }
}
