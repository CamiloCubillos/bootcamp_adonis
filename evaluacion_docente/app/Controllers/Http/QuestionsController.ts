import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import Option from 'App/Models/Option'

export default class QuestionsController {

    public async createQuestion({request, response} : HttpContextContract){
        const {question, options} = request.all()
        try {
            const myQuestion = new Question()
            if(!question || !options){
                throw new Error("Campos vacios")
            }
            myQuestion.question = question
            await myQuestion.save()
            for (const option_ of options) {
                let myOption = new Option()
                myOption.option = option_
                const lastQuestionId = (await (Question.query().max('id')))[0]['max']
                myOption.questionId = lastQuestionId
                myOption.save()
            }
            response.status(200)
            response.json({"state":true,"message":"Pregunta creada exitosamente"})
        } catch (error) {
            response.status(500)
            response.json({"state":false,"message":"Error al crear la pregunta","error":error.message})
        }
    }

    public async getQuestions({response} : HttpContextContract){
        try{
            const questions = await Question.all()
            response.status(200)
            response.json({
                "state":true,
                "questions":questions
            })
        }catch(error){
            response.status(500)
            response.json({
                "state": false,
                "message": "Error al listar las preguntas",
                "error":error.message
            })
        }
    }

    public async getQuestionOptions({response,params} : HttpContextContract){
        try {
            const question : Question = (await Question.query().where('id',params.id).preload('options'))[0]
            response.status(200)
            response.json({
                "state":true,
                "message":"Listado de opciones",
                "options":question.options
            })
        } catch (error) {
            response.status(500)
            response.json({
                "state": false,
                "message": "Error al obtener el listado de opciones",
                "error":error.message
            })
        }
    }

    public async updateQuestion({request,response,params} : HttpContextContract){
        try {
            const {question} = request.all()
            const id = params.id
            const myQuestion = await Question.findOrFail(id)
            if(!myQuestion){
                throw new Error(`La pregunta con ID ${id} no existe.`)
            }
            myQuestion.question = question
            await myQuestion.save()
            response.status(200)
            response.json({
                "state": true,
                "message": "Pregunta Editada con exito"
            })
        } catch (error) {
            response.status(500)
            response.json({
                "state": false,
                "message": "Error al editar la pregunta",
                "error":error.message
            })
        }
    }

    public async deleteQuestion({response,params} : HttpContextContract){
        try {
            const id = params.id
            const question = await Question.findOrFail(id)
            await question.delete()
            response.status(200)
            response.json({
                "state": true,
                "message": "Pregunta Eliminada con exito"
            })
        } catch (error) {
            response.status(500)
            response.json({
                "state": false,
                "message": "Error al eliminar la pregunta",
                "error":error.message
            })
        }
    }
}
