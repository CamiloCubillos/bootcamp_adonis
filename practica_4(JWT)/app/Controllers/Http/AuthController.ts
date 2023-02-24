import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class AuthController {
    public async register({request, auth} : HttpContextContract) {
        const nombre = request.input('nombre')
        const apellido = request.input('apellido')
        const email = request.input('email')
        const password = request.input('password')
        const perfil = request.input('perfil')
        const tipo_id = request.input('tipo_id')
        const numero_id = request.input('numero_id')
        const barrio = request.input('barrio')
        const municipio = request.input('municipio')
        const departamento = request.input('departamento')

        const idExistente = await this.validarExistenciaId(numero_id)
        if(!idExistente){
            const user = new User();
            user.nombre = nombre
            user.apellido = apellido
            user.email = email
            user.password = password
            user.perfil = perfil
            user.tipo_id = tipo_id
            user.numero_id = numero_id
            user.barrio = barrio
            user.municipio = municipio
            user.departamento = departamento
            await user.save()
    
            const token = await auth.use("api").login(user,{
                expiresIn: "30 mins"
            });
    
            return {
                token,
                "msg":"usuario registrado"
            }
        }else{
            return {
                "msg":`La CC ${numero_id} ya se encuentra registrada en el sistema`
            }
        }

    }

    public async login({auth, request, response} : HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        try {
            const token = await auth.use("api").attempt(email,password,{
                expiresIn : "30 mins"
            });
            return{
                token,
                "msg":"Usuario logueado correctamente"
            }
        } catch (error) {
            console.log(error)
            return response.unauthorized('Credenciales invalidas')
        }
    }

    private async validarExistenciaId(numero_id:string) : Promise<boolean>{
        const res = await User.findBy('numero_id',numero_id)
        if(res) return true
        return false
    }
}
