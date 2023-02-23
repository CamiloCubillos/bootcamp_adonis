import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class AuthController {
    public async register({request, auth} : HttpContextContract) {
        const username = request.input('username')
        const email = request.input('email')
        const password = request.input('password')

        const user = new User();
        user.username = username
        user.email = email
        user.password = password
        await user.save()

        const token = await auth.use("api").login(user,{
            expiresIn: "30 mins"
        });

        return {
            token,
            "msg":"usuario registrado"
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
}
