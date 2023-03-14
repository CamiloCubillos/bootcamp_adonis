import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Form from 'App/Models/Form'

export default class FormsController {
    public async createForm({request,response} : HttpContextContract){
        const {formName} = request.all()
        try {
            const form = new Form
            form.name = formName
            await form.save()
            response.status(200)
            response.json({"message":"Formulario creado exitosamente"})
        } catch (error) {
        }
    }

    public async getAllFormsIds({response} : HttpContextContract){
        try{
            const forms = await Form.all()
            response.status(200)
            return forms
        }catch(error){

        }
    }

    public async getFormById({params, response} : HttpContextContract){
        const form = (await Form.query().where('id',params.id).preload('questions',questions => {
            questions.select('id','question').preload('options',options => {
                options.select('id','option')
            })
        }))[0]
        response.status(200)
        return form
    }
}
