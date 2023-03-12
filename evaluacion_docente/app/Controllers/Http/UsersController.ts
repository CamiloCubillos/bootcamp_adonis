import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
const bcryptjs = require('bcryptjs')

export default class UsersController {
    public async register({request, response}: HttpContextContract){
        try{
            const {firstName, secondName, surname, secondSurname, documentTypeId, documentNumber, rolId, email, password, phone} = request.all();
            const salt = bcryptjs.genSaltSync();
            const user = new User();
            user.firstName = firstName;
            user.secondName = secondName;
            user.surname = surname;
            user.secondSurName = secondSurname;
            user.documentTypeId = documentTypeId;
            user.documentNumber = documentNumber;
            user.rolId = rolId;
            user.email = email;
            user.password = bcryptjs.hashSync( password, salt );
            user.phone = phone
            await user.save();
            response.status(200)
            return{
                "state":true, 
                "message":"Usuario creado correctamente"
            }
        }catch(error){
            response.status(500)
            // Verificar si se ha violado una restriccion de la base de datos. Ej: Valores duplicados
            if(error.constraint){
              return{
                "msg":this.handleConstraintError(error.constraint)
              }
            }else{
              return{
                "state":false, 
                "message":"Fallo en la creación del usuario"
            }
            }
        }
    }

    public async login({request, response}: HttpContextContract){
        const correo = request.input('correo');
        const password = request.input('password');
        try {
          //consultar si existe usuario con ese correo
          const user = await User.findBy('email', correo)
          if(!user){
            return response.status(400).json({msj: 'El usuario no existe'})
          }
          //Validar si la contraseña ingresada es igual a la del usaurio  
          const validPassword = bcryptjs.compareSync( password, user.password );
          if ( !validPassword ) {
            return response.status(400).json({msj: 'Los datos de acceso no son correctos'})
          }

          //Crear token con el id del usuario
          const payload ={
            'id': user.id,
          }
          const token:string = this.generateToken(payload);
    
          response.status(200).json({
            token,
            "msg": "Usuario logueado"})
        } catch (error) {
          console.log(error)
          response.json({"msg": "Error en el servidor."});
        }
    }

    public async getAllUsers({response} : HttpContextContract){
      try{
        const users = await User.all()
        response.status(200)
        return users
      }catch(error){
        console.log(error)
        response.status(500)
        return {
          "message":"Fallo al listar usuarios. Error en el servidor."
        }
      }
    }

    public async getUserById({response, params} : HttpContextContract){
      try {
        const user = await User.find(params.id)
        if(user){
          response.status(200)
          return user
        }else{
          response.status(404)
          return {
            "message":`El usuario con ID: '${params.id}' no existe.`
          }
        }
      } catch (error) {
        console.log(error)
        response.status(500)
        return {
          "message":"Fallo al listar el usuario. Error en el servidor."
        }
      }
    }

    public async updateUser({response,request,params} : HttpContextContract){
      try {
        const {firstName, secondName, surname, secondSurName, documentTypeId, documentNumber, rolId, email, password, phone} = request.all();
        const id = params.id
        const user = await User.find(id)
        if(user){
          const salt = bcryptjs.genSaltSync();
          // Usar 'merge' para actualizar SOLAMENTE las propiedades que se envien por el request. Las propiedades no
          // enviadas en la petición no serán alteradas.
          await user?.merge({
            firstName: firstName,
            secondName: secondName,
            surname: surname,
            secondSurName: secondSurName,
            documentTypeId: documentTypeId,
            documentNumber: documentNumber,
            rolId: rolId,
            email: email,
            password: password ? bcryptjs.hashSync( password, salt) : undefined,
            phone: phone
          }).save()
          response.status(200)
          return{
            "msg":"Actualización realizada con exito"
          }
        }else{
          response.status(404)
          return{
            "msg":`El usuario con ID ${id} no se encuentra registrado.`
          }
        }

      } catch (error) {
        if(error.toString().split(' ')[2] == ".update()"){
          response.status(200)
          return{"message":"No hubo nada que actualizar. La operación terminó con exito."}
        }
        response.status(500)
        return {
          "message":"Fallo al actualizar el usuario. Error en el servidor."
        }
      }
    }

    private generateToken(payload: any):string{
      const opciones = {
        expiresIn: "2 mins"
      }
      return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)    
    }

    private handleConstraintError(constraint:string){
      let errorMsg
      switch (constraint) {
        case 'users_document_number_unique':
          errorMsg = 'El número de documento del usuario ya se encuentra registrado.'
          break;
        case 'users_email_unique':
          errorMsg = 'El email del usuario ya se encuentra registrado.'
          break;
        case 'users_phone_unique':
          errorMsg = 'El número de telefono del usuario ya se encuentra registrado.'
          break;
        default:
          errorMsg = "Error al crear el usuario. Se ha violado una restricción de la base de datos."
          break;
      }
      return errorMsg
    }
}
