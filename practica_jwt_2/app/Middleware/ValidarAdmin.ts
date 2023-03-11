import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsuariosController from 'App/Controllers/Http/UsuariosController'
import Usuario from 'App/Models/Usuario'

export default class ValidarAdmin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header('authorization')

    if(authorizationHeader == undefined){
      return ctx.response.status(400).send({
        mensaje: "Falta el token de autorización",
        estado: 401,
      })
    }      

    try{
      const usuariosController = new UsuariosController()
      const {id} = await usuariosController.obtenerPayload(authorizationHeader)  
      const usuario = await Usuario.find(id) 

      if(!usuario){
        return ctx.response.status(401).json({
          msj: 'Token no válido'
        })
      }
  
      if( usuario.perfil != 1){
        return ctx.response.status(401).json({
          msj: 'No tiene permisos para acceder a esta ruta'
        })
      }
      await next()
    }catch(error){            
      console.log(error);
      ctx.response.status(400).json({"msj": "Token no valido"})
    }    
  }
}
