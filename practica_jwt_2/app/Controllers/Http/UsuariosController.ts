import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
const bcryptjs = require('bcryptjs')

export default class UsuariosController {

    public async registrar({request}: HttpContextContract){
      const {tipoDoc, numeroDoc, nombres, correo, contrasena, telefono, direccion, perfil} = request.all();
      const salt = bcryptjs.genSaltSync();
      const usuario = new Usuario();
      usuario.tipo_documento = tipoDoc;
      usuario.numero_documento = numeroDoc;
      usuario.nombres_usuario = nombres;
      usuario.correo = correo;
      usuario.contrasena = bcryptjs.hashSync( contrasena, salt );
      usuario.telefono = telefono;
      usuario. direccion = direccion;
      usuario.perfil = perfil;    
      await usuario.save();
      return{usuario, "msg": "Usuario registrado"}
    }
    
    public async login({request, response}: HttpContextContract){
      const correo = request.input('correo');
      const contrasena = request.input('contrasena');
      try {
        //consultar si existe usuario con ese correo
        const user = await Usuario.findBy('correo', correo)
        if(!user){
          return response.status(400).json({msj: 'El usuario no existe'})
        }
  
        const validPassword = bcryptjs.compareSync( contrasena, user.contrasena );
        if ( !validPassword ) {
          return response.status(400).json({msj: 'Los datos de acceso no son correctos'})
        }
        //Validar si la contraseña ingresada es igual a la del usaurio
        const payload ={
          'nombres': user.nombres_usuario,
          'id': user.idUsuario,
          'cedula': user.numero_documento
        }
        const token:string = this.generarToken(payload);
  
        response.status(200).json({
          token,
          "msg": "Usuario logueado"})
      } catch (error) {
        response.json({"msg": "Credenciales invalidas"});
      }
    }
  
    public generarToken(payload: any):string{
      const opciones = {
        expiresIn: "5 mins"
      }
      return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)    
    }
  
    public verificarToken(authorizationHeader:string){
      let token = authorizationHeader.split(' ')[1]
      token = jwt.verify(token, Env.get('JWT_SECRET_KEY'), (error)=>{
          if(error){
            console.log(error)
            throw new Error("Token expirado");
          }
      })
      return true
    }
    
    public obtenerPayload (authorizationHeader:string) {
      let token = authorizationHeader.split(' ')[1]
      const payload = jwt.verify(token, Env.get("JWT_SECRET_KEY"), {complete: true}).payload
      console.log(payload)
      return payload
    }
  }
