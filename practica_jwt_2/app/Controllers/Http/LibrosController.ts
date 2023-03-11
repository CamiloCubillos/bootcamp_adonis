import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Libro from 'App/Models/Libro'

export default class LibrosController {
    public async registrar({request}: HttpContextContract){
        const {titulo, isbn, editorialId, autorId} = request.all();
        const libro = new Libro();
        libro.titulo = titulo;
        libro.isbn = isbn;
        libro.id_editorial = editorialId;
        libro.id_autor = autorId;        
        await libro.save();
        return{libro, "msj": "Libro registrado"}
    }

    public async getListarLibros(): Promise<Libro[]> {
        const libros = await Libro.all();
        return libros;
    }
}
