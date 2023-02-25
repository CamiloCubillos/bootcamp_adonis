import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from 'App/Models/Animal'

export default class AnimalsController {
    async createAnimal({request, response} : HttpContextContract){
        const animal = request.only(['codigo_animal','nombre','especie','raza','genero','edad'])
        try{
            await Animal.create(animal);
            response.status(200).json({"msg":"Animal registrado con exito."})
        }catch(error){
            response.status(500).json({"msg":"Error en el servidor: "+error})
        }
    }

    async getAnimals({request, response} : HttpContextContract) : Promise<Animal[]>{
        const codigoAnimal = request.param('codigo_animal')
        const urlParams = request.qs()
        if(codigoAnimal === "all"){
            response.status(200)
            if(urlParams.especie !== undefined && urlParams.menorQueOcho === "true"){
                return await Animal.query().where({"especie":urlParams.especie}).where("edad","<",8)
            }else if(urlParams.especie !== undefined){
                return await Animal.query().where({"especie":urlParams.especie})
            }else if(urlParams.menorQueOcho === "true"){
                return await Animal.query().where("edad","<",8)
            }
            return await Animal.all();
        }else{
            response.status(200)
            return await Animal.query().where({"codigo_animal":codigoAnimal})
        }
    }

    async updateAnimal({request, response} : HttpContextContract){
        const requestData = request.only(['codigo_animal','nombre','especie','raza','genero','edad'])
        try{
            const animal = await Animal.findBy('codigo_animal',requestData.codigo_animal)
            const animalExists: Boolean = await this.checkAnimalExistence(requestData.codigo_animal)
            console.log(requestData.codigo_animal)
            if(animalExists){
                const nuevaData = {
                    'nombre': requestData.nombre,
                    'especie': requestData.especie,
                    'raza': requestData.raza,
                    'genero':requestData.genero,
                    'edad':requestData.edad
                }
                await animal?.merge(nuevaData).save()
                response.status(200).json({"msg":"Actualización realizada con exito"})
            }else{
                response.status(404).json({"msg":"El animal no existe"})
            }
        }catch(error){
            response.status(500).json({"msg":"Error en el servidor: "+error})
            
        }
    }

    async deleteAnimal({request,response} : HttpContextContract){
        const codigoAnimal = request.param('codigo_animal')
        try{
            const animal = await Animal.findBy('codigo_animal',codigoAnimal)
            const animalExists: Boolean = await this.checkAnimalExistence(codigoAnimal)
            if(animalExists){
                await animal?.delete()
                response.status(200).json({"msg":"Animal eliminado con exito"})
            }else{
                response.status(404).json({"msg":"El animal no existe"})
            }
        }catch(error){
            response.status(500).json({"msg":"Error en el servidor: "+error})
        }
    }

    private async checkAnimalExistence(codigo_animal: Number): Promise<Boolean>{
        const total = await Animal.query().where({"codigo_animal":codigo_animal}).count('*').from('animals')
        if(parseInt(total[0]['count']) == 1){
            return true;
        }else{
            return false;
        }
    }
}
