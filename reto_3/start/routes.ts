/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/Http/AuthController'

Route.get('/', async () => {
  return { hello: 'world' }
}).middleware('auth')

Route.group(()=>{
  Route.post('/register','AuthController.register')
  Route.post('/login','AuthController.login')

  Route.group(()=>{
    Route.group(()=>{
      Route.post('','BooksController.storeBook')
      Route.get('','BooksController.getAllBooks')
      Route.get(':id','BooksController.getBookById')
      Route.put(':id','BooksController.updateBook')
      Route.delete(':id','BooksController.deleteBook')
    }).prefix('/books')

    Route.group(() => {
      Route.get('','PerfilsController.getAllPerfils')
      Route.post('','PerfilsController.createPerfil')
      Route.get(':id','PerfilsController.getPerfilById')
      Route.put(':id','PerfilsController.updatePerfil')
      Route.delete(':id','PerfilsController.deletePerfil')
    }).prefix('/perfil')

    Route.group(() => {
      Route.get('','UsersController.getAllUsers')
      Route.get(':numero_id','UsersController.getUserByNumeroId')
      Route.put(':numero_id','UsersController.updateUser')
      Route.delete(':numero_id','UsersController.deleteUser')
    }).prefix('/users')

  }).middleware('auth')
}).prefix('/api')
