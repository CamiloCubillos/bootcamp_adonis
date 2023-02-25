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

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(()=>{
    Route.get('/usuarios','UsuariosController.getListarUsuarios')
    Route.get('/perfil','UsuariosController.getListarUsuariosYPerfil')
    Route.get('/publicaciones','UsuariosController.getListarUsuariosYPublicaciones')
    Route.get('/usuarios-grupos','UsuariosController.getListarUsuariosGrupos')
  }).prefix('/listar')

  Route.group(()=>{
    Route.post('/usuario','UsuariosController.setRegistrarUsuarios')
    Route.post('/perfil','PerfilsController.setRegistrarPerfil')
    Route.post('/publicacion','PublicacionesController.setRegistroPublicacion')
    Route.post('/grupo','GruposController.setRegistrarGrupo')
    Route.post('/usuario-grupo','GrupoUsuarioController.setRegistrarUsuarioGrupo')
  }).prefix('/registrar')

  Route.group(()=>{
    Route.put('/usuario','UsuariosController.updateUsuario')
  }).prefix('/actualizar')

  Route.group(()=>{
    Route.delete('/usuario','UsuariosController.deleteUsuario')
  }).prefix('/eliminar')
}).prefix("/api/v1")