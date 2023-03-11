import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
const bcryptjs = require('bcryptjs')

export default class UsuariosController {
    public async registrar({request} : HttpContextContract){
        const {nombres, correo, password} = request.all()
        const salt = bcryptjs.genSaltSync()
        const usuario = new Usuario()
        usuario.nombres = nombres
        usuario.correo = correo
        usuario.password = bcryptjs.hashSync(password, salt)
        await usuario.save()
        return{usuario, "msg":"Usuario registrado"}
    }

    public async login({request, response} : HttpContextContract){
        const correo = request.input('correo')
        const password = request.input('password')
        try{
            // Consultar si existe usuario con ese correo
            const user = await Usuario.findBy('correo',correo)
            if(!user){
                return response.status(400).json({"msg":"El usuario no existe"})
            }

            const validPassword = bcryptjs.compareSync(password, user.password)
            if(!validPassword){
                return response.status(400).json({"msg":"Los datos de acceso no son correctos"})
            }

            // Validad si la contraseña ingresada es igual a la del usuario
            const payload = {
                'nombres': user.nombres,
                'id': user.id
            }
            const token:string = this.generarToken(payload)

            response.status(200).json({
                token,
                "msg":"Usuario logueado"
            })
        }catch(error){
            console.log(error)
            response.json({"msg":"Error en el servidor"})
        }
    }

    public generarToken(payload: any):string{
        const opciones = {
            expiresIn: "5 mins"
        }
        return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)
    }

    public verificarToken(authorizationHeader:string){
        let token = authorizationHeader
        console.log(token)
        jwt.verify(token, Env.get('JWT_SECRET_KEY'), (error)=>{
            if(error){
                throw new Error("Token expirado")
            }
        })
        return true
    }
}
