import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async getAllUsers({auth} : HttpContextContract){
        if(await this.hasPermissions(auth)){
            const users = User.all()
            return users
        }else{
            return {"msg":"No tiene los permisos para acceder"}
        }
    }

    public async getUserByNumeroId({request,auth} : HttpContextContract){
        if(await this.hasPermissions(auth)){
            const user = await User.findBy('numero_id',request.param('numero_id'))
            return user
        }else{
            return {"msg":"No tiene los permisos para acceder"}
        }
    }

    public async updateUser({request, response, auth} : HttpContextContract){
        if(await this.hasPermissions(auth)){
            const newUserData = request.input('newUserData')
            const numeroId = request.param('numero_id')
            
            console.log(newUserData)
            const user = await User.findBy('numero_id',numeroId)
            await user?.merge(newUserData).save()
            response.status(202).json({"msg":"Usuario actualizado con exito"})
        }else{
            return {"msg":"No tiene los permisos para acceder"}
        }
    }

    public async deleteUser({request,response,auth} : HttpContextContract) {
        if(await this.hasPermissions(auth)){
            const numeroId = request.param('numero_id')
            
            const user = await User.findBy('numero_id',numeroId)
            await user?.delete()
            response.status(202).json({"msg":"Usuario eliminado con exito"})
        }else{
            return {"msg":"No tiene los permisos para acceder"}
        }
    }

    private async hasPermissions(auth) : Promise<boolean>{
        await auth.use('api').authenticate()
        if(auth.use('api').user?.perfil == 1){  // El token pertenece a un usuario con perfil 'admin'?
            return true
        }else{
            return false
        }
    }
}
