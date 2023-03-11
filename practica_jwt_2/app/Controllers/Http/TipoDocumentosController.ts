import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TipoDocumento from 'App/Models/TipoDocumento';

export default class TipoDocumentosController {
    public async registrar({request}: HttpContextContract){
        const {nombreDocumento} = request.all();
        const documento = new TipoDocumento();
        documento.nombre_tipo_doc = nombreDocumento;
        await documento.save();
        return{documento, "msj": "Documento registrado"}
    }

    public async getListarDocumentos(): Promise<TipoDocumento[]> {
        const documento = await TipoDocumento.all();
        return documento;
    }
}
