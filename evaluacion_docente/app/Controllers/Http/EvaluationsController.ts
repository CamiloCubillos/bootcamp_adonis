import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer'
import Evaluation from 'App/Models/Evaluation'

export default class EvaluationsController {
    public async createEvaluation({request,response} : HttpContextContract){
        try{
            const {userId, answers} = request.all()
            const evaluation = new Evaluation()
            evaluation.userId = userId
            await evaluation.save()
            for (const answer of answers) {
                const myAnswer = new Answer()
                myAnswer.answer = answer.answer
                myAnswer.questionId = answer.questionId;
                myAnswer.evaluationId = (await (Evaluation.query().max('id')))[0]['max']
                await myAnswer.save()
            }
            response.status(200)
            return {
                "message":"evaluación registrada correctamente"
            }
        }catch(error){
            console.log(error)
        }
    }

    public async getAllEvaluations({response}: HttpContextContract) {
        const evaluations = Evaluation.query().preload('teacher').preload('answers',answers => {
            answers.preload('question')
        })
        response.status(200)
        return evaluations
    }
}
