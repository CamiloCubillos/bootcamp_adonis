import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
    public async store({request, response} : HttpContextContract){
        const book = new Book()
        book.title = request.input('title')
        book.author = request.input('author')
        await book.save()
        return {
            "libro":book,
            "msg":"Registro ingresado correctamente",
            "status":200
        }
    }

    public async index(){
        const books = await Book.query()
        return books
    }

    public async show({params} : HttpContextContract) {
        try {
            const book = await Book.find(params.id)
            if(book){
                return book
            }else{
                return("Registro no existente")
            }
        } catch (error) {
            console.log(error)
        }
    }

    public async update({request, params} : HttpContextContract){
        const book = await Book.find(params.id)
        if(book){
            book.title = request.input('title')
            book.author = request.input('author')

            if(await book.save()){
                return{
                    "msg":"Registro actualizado correctamente",
                    book
                }
            }
            return({
                "msg":"No se pudo actualizar",
                "status":401
            })
        }
        return({
            "msg":"Registro no encontrado",
            "status":401
        })

    }
}
