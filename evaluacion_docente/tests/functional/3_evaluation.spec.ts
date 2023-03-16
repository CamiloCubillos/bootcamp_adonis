import { test } from '@japa/runner'
import Question from 'App/Models/Question'
import { getToken } from './getToken'

test.group('Evaluation CRUD tests...',()=>{
    test('Should create an evaluation with its answers...',async ({ client }) => {
        const token_admin = await getToken(1) // Obtener token de un usuario con rol 'admin'
        const token = await getToken(2) // Obtener token de un usuario con rol 'estudiante'
        await client.post('api/v1/questions/create').header('Authorization',`Bearer ${token_admin}`).json({
            "question":"mock question",
            "options":[
                'op1',
                'op2',
                'op3'
            ]
        })
        try{
            const response = await client.post('api/v1/evaluation').header('Authorization',`Bearer ${token}`).json({
                "userId":"3",
                "answers":[
                    {
                        "answer":"lunes",
                        "questionId":(await (Question.query().max('id')))[0]['max']
                    }
                ]
            })
            response.assertStatus(200)
            response.body().assert?.isObject()
            response.assert?.containsSubset(response.body(),{"message":"evaluación registrada correctamente"})
        }catch(error){
            console.log(error)
        }
    })
})
