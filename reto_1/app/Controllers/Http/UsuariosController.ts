import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
    public async getListarUsuarios(): Promise<Usuario[]>{
        const user = await Usuario.all()
        return user
    }

    public async getListarUsuariosYPerfil(): Promise<Usuario[]>{
        const user = await Usuario.query().preload('perfil')
        return user
    }

    public async getListarUsuariosYPublicaciones() : Promise<Usuario[]>{
        const user = await Usuario.query().preload('publicaciones')
        return user
    }

    public async getListarUsuariosGrupos() : Promise<Usuario[]>{
        const user = await Usuario.query().preload('usuario_grupos')
        return user
    }

    public async setRegistrarUsuarios({request, response} : HttpContextContract){
        const dataUsuario = request.only(['codigo_usuario','nombre_usuario','contrasena','email','telefono','perfil'])
        try{
            const codigoUsuario = dataUsuario.codigo_usuario
            const usuarioExistente: Number = await this.getValidarUsuarioExistente(codigoUsuario)
            if(usuarioExistente == 0){
                await Usuario.create(dataUsuario)
                response.status(200).json({"msg":"Registro completado con exito"})                
            }else{
                response.status(400).json({"msg":"Error, el codigo usuario ya se encuentra registrado"})
            }
        } catch (error){
            response.status(500).json({"msg":"Error en el servidor"})
        }
    }

    public async updateUsuario({request, response} : HttpContextContract){
        const requestData = request.only(['codigo_usuario','nombre_usuario','contrasena','email','telefono'])
        try{    
            const usuario = await Usuario.findBy('codigo_usuario',requestData.codigo_usuario)
            const usuarioExistente: Number = await this.getValidarUsuarioExistente(requestData.codigo_usuario)
            console.log(usuarioExistente)
            if(usuarioExistente == 1){
                const nuevaData = {
                    'nombre_usuario': requestData.nombre_usuario,
                    'contrasena': requestData.contrasena,
                    'email': requestData.email,
                    'telefono':requestData.telefono
                }
                await usuario?.merge(nuevaData).save()
                response.status(200).json({"msg":"Actualización realizada con exito"})
            }else{
                response.status(404).json({"msg":"Este usuario no existe"})
            }
        }catch(error){
            response.status(500).json({"msg":"Error en el servidor: "+error})
        }
    }

    public async deleteUsuario({request,response} : HttpContextContract){
        const codigoUsuario = request.only(['codigo_usuario']).codigo_usuario
        try{
            const usuario = await Usuario.findBy('codigo_usuario',codigoUsuario)
            const usuarioExistente: Number = await this.getValidarUsuarioExistente(codigoUsuario)
            console.log(usuarioExistente)
            if(usuarioExistente == 1){
                await usuario?.delete()
                response.status(200).json({"msg":"Usuario eliminado con exito"})
            }else{
                response.status(404).json({"msg":"Este usuario no existe"})
            }
        }catch(error){
            response.status(500).json({"msg":"Error en el servidor: "+error})
        }
    }

    private async getValidarUsuarioExistente(codigo_usuario: Number): Promise<Number>{
        const total = await Usuario.query().where({"codigo_usuario":codigo_usuario}).count('*').from('usuarios')
        return parseInt(total[0]["count(*)"])
    }
}
