import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
    public async storeBook({request, response,auth} : HttpContextContract){
        if(await this.hasPermissions(auth)){
            const book = new Book()
            book.title = request.input('title')
            book.author = request.input('author')
            await book.save()
            return {
                "libro":book,
                "msg":"Registro ingresado correctamente",
                "status":200
            }
        }else{
            return {"msg":"No tiene los permisos para acceder"}
        }
    }

    public async getAllBooks(){
        const books = await Book.query()
        return books
    }

    public async getBookById({response,params} : HttpContextContract) {
        try {
            const book = await Book.find(params.id)
            if(book){
                return book
            }else{
                return("Registro no existente")
            }
        } catch (error) {
            console.log(error)
            response.status(500).json({"msg":"Error en el servidor"})
        }
    }

    public async updateBook({request,response, params, auth} : HttpContextContract){
        if(await this.hasPermissions(auth)){
            try {
                const book = await Book.find(params.id)
                if(book){
                    const newBookData = request.input('newBookData')
                    const id = request.param('id')
                    
                    console.log(newBookData)
                    const book = await Book.findBy('id',id)
                    await book?.merge(newBookData).save()
                    
                    response.status(202).json({"msg":"Libro actualizado con exito"})
                }else{
                    response.status(404).json({"msg":`El libro con ID ${params.id} no se encuentra registrado`})
                }
                
            } catch (error) {
                console.log(error)
                response.status(500).json({"msg":"Error en el servidor."})
            }

        }else{
            return {"msg":"No tiene los permisos para acceder"}
        }
    }

    public async deleteBook({request,response,auth} : HttpContextContract) {
        if(await this.hasPermissions(auth)){
            const id = request.param('id')
            
            const book = await Book.findBy('id',id)
            await book?.delete()
            response.status(202).json({"msg":"Libro eliminado con exito"})
        }else{
            return {"msg":"No tiene los permisos para acceder"}
        }
    }

    private async hasPermissions(auth) : Promise<boolean>{
        await auth.use('api').authenticate()
        const rol = auth.use('api').Book?.perfil
        if(rol == 1 || rol == 2){  // El token pertenece a un usuario con perfil 'admin' o 'bibliotecario'?
            return true
        }else{
            return false
        }
    }
}
