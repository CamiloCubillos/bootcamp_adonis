import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfilsController {
    public async createPerfil({request,response,auth} : HttpContextContract){
        if(await this.hasPermissions(auth)){
            const perfilData = request.only(['id','rol'])
            await Perfil.create({
                "id":perfilData.id,
                "rol":perfilData.rol
            })
            response.status(202).json({"msg":"Rol creado con exito"})
        }else{
            response.status(403).json({"msg":"No tiene los permisos para acceder"})
        }
    }

    public async getAllPerfils({auth,response} : HttpContextContract){
        if(await this.hasPermissions(auth)){
            const perfils = Perfil.all()
            return perfils
        }else{
            response.status(403).json({"msg":"No tiene los permisos para acceder"})
        }
    }

    public async getPerfilById({request,auth} : HttpContextContract){
        if(await this.hasPermissions(auth)){
            const user = await Perfil.findBy('id',request.param('id'))
            return user
        }else{
            return {"msg":"No tiene los permisos para acceder"}
        }
    }

    public async updatePerfil({request, response, auth} : HttpContextContract){
        if(await this.hasPermissions(auth)){
            const newPerfilData = request.input('newPerfilData')
            const id = request.param('id')
            
            const perfil = await Perfil.findBy('id',id)
            await perfil?.merge(newPerfilData).save()
            response.status(202).json({"msg":"Perfil actualizado con exito"})
        }else{
            return {"msg":"No tiene los permisos para acceder"}
        }
    }

    public async deletePerfil({request,response,auth} : HttpContextContract) {
        if(await this.hasPermissions(auth)){
            const id = request.param('id')
            
            const perfil = await Perfil.findBy('id',id)
            await perfil?.delete()
            response.status(202).json({"msg":"Perfil eliminado con exito"})
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

