import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'

export default class ClientesController {

    public async setRegistrarClientes({request,response} : HttpContextContract) {
        try{
            const dataCliente = request.only(['cedula','nombre','apellido','telefono','correo'])
            const cedulaCliente = dataCliente.cedula
            const clienteExistente : number = await this.getValidarClienteExistente(cedulaCliente)
            if(clienteExistente === 0){
                await Cliente.create(dataCliente)
                response.status(200).json({"msg":"Registro completado con exito"})
            }else{
                response.status(400).json({"msg":"Error, cedula existente"})
            }

        }catch(error){
            console.log(error)
            response.status(500).json({"msg":"Error en el servidor: "+error})
        }
    }

    public async getListarClientes() : Promise<Cliente[]>{
        const clientes = await Cliente.all()
        return clientes;
    }

    public async actualizarClientes({request} : HttpContextContract) {
        const cedula = request.param("id");
        console.log(cedula)
        const cliente = await Cliente.findOrFail(cedula)
        const datos = request.all()
        cliente.nombre = datos.nombre
        cliente.apellido = datos.apellido
        cliente.telefono = datos.telefono
        cliente.correo = datos.correo
        await cliente.save()
        return {"msg":`Ha actualizado correctamente la CC ${cedula}`,"status":200}
    }

    public async eliminarCliente({request}:HttpContextContract){
        const id = request.param('id')
        await Cliente.query().where('cedula',id).delete()
        return {"msg":`Ha eliminado la CC ${id} correctamente`,"status":200}
    }

    private async getValidarClienteExistente(cedula: Number) : Promise<number>{
        const total = await Cliente.query().where({'cedula':cedula})
        return total.length
    }
}
