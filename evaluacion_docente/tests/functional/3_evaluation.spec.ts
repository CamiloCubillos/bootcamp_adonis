import { test } from '@japa/runner'
import { getToken } from './getToken'

test.group('Evaluation CRUD tests...',()=>{
    test('Should create an evaluation with its answers...',async ({ client }) => {
        const token = await getToken(2) // Obtener token de un usuario con rol 'estudiante'
        try{
            const response = await client.post('api/v1/evaluation').header('Authorization',`Bearer ${token}`).json({
                "userId":"3",
                "answers":[
                    {
                        "answer":"lunes",
                        "questionId":"1"
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
