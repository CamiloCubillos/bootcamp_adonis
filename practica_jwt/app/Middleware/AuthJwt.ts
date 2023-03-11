import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsuariosController from 'App/Controllers/Http/UsuariosController'

export default class AuthJwt {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header('Authorization')

    if(authorizationHeader == undefined){
      return ctx.response.status(400).send({
        "msg":"Falta el token de autorizacion",
        "estado":401
      })
    }

    const token = authorizationHeader
    
    try{
      const usuariosController = new UsuariosController()
      usuariosController.verificarToken(token)
      await next()
    }catch(error){
      ctx.response.status(400).json({"Token Error":error.toString()})
    }
  }
}
