import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import Option from 'App/Models/Option'

export default class QuestionsController {

    public async createQuestion({request, response} : HttpContextContract){
        const {question, options, formId} = request.all()
        try {
            const myQuestion = new Question()
            myQuestion.question = question
            myQuestion.formId = parseInt(formId)
            await myQuestion.save()
            for (const option_ of options) {
                let myOption = new Option()
                myOption.option = option_
                const lastQuestionId = (await (Question.query().max('id')))[0]['max']
                myOption.questionId = lastQuestionId
                myOption.save()
            }
            response.status(200)
            response.json({"message":"Pregunta creada exitosamente"})
        } catch (error) {
        }
    }
}
