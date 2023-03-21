import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer'
import Form from 'App/Models/Form'
import Question from 'App/Models/Question'

export default class FormsController {
    public async createForm({request,response} : HttpContextContract){
        try{
            const {userId, answers} = request.all()
            const form = new Form()
            form.userId = userId
            await form.save()
            for (const answer of answers) {
                const myAnswer = new Answer()
                myAnswer.answer = answer.answer
                myAnswer.questionId = answer.questionId;
                myAnswer.formId = (await (Form.query().max('id')))[0]['max']
                await myAnswer.save()
            }
            response.status(200)
            return {
                "state":true,
                "message":"Respuestas almacenadas con exito"
            }
        }catch(error){
            response.status(500)
            response.json({
                "state": false,
                "message": "Error al almacenar las respuestas",
                "error":error.message
            })
        }
    }

    public async getForm({response} : HttpContextContract){
        try {
            const form : Question[] = await Question.query().preload('options',sql => {
                sql.select('id','option')
            })
            response.status(200)
            return {
                "state":true,
                "questions":form
            }
        } catch (error) {
            response.status(500)
            response.json({
                "state": false,
                "message": "Error al obtener el listado",
                "error":error.message
            })
        }
    }

    public async getAllEvaluations({response}: HttpContextContract) {
        const forms = Form.query().preload('teacher').preload('answers',answers => {
            answers.preload('question')
        })
        response.status(200)
        return forms
    }

    public async getAnswers({response,params}: HttpContextContract){
        try {
            const answers = await Answer.query().preload('question').whereHas('form',formsQuery=> {
                formsQuery.where('user_id',params.id_teacher)
            })
            response.status(200)
            response.json({
                "state":true,
                "answers": answers
            })
        } catch (error) {
            response.status(500)
            response.json({
                "state": false,
                "message": "Error al obtener el listado",
                "error":error.message
            })
        }
    }
}
