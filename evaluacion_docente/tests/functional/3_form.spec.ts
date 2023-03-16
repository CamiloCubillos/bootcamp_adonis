import { test } from '@japa/runner'
import Question from 'App/Models/Question'
import { getToken } from './getToken'

test.group('Form CRUD tests...',()=>{
    test('Should create a form instance with its answers...',async ({ client, assert }) => {
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
            const response = await client.post('api/v1/form/postanswers').header('Authorization',`Bearer ${token}`).json({
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
            response.assert?.containsSubset(response.body(),{"state":true, "message":"Respuestas almacenadas con exito"})
        }catch(error){
            console.log(error)
            const err = JSON.parse(error)
            assert.isObject(err)
            assert.properties(err,['state','message','error'])
        }
    })

    test('Should list all form\' questions with their respective options',async ({ client, assert }) => {
        try{
            const token_admin = await getToken(1) // Obtener token de un usuario con rol 'admin'
            await client.post('api/v1/questions/create').header('Authorization',`Bearer ${token_admin}`).json({
                "question": "¿que dia es hoy?",
                "options": [
                    'lunes',
                    'martes',
                    'miercoles',
                    'jueves'
                ]
            })
            const token = await getToken(2) // Obtener token de un usuario con rol 'estudiante'
            const response = await client.get('api/v1/form/getQuestions').header('Authorization',`Bearer ${token}`)
            response.assertStatus(200)
            assert.isObject(response.body())
            assert.properties(response.body(),['state','questions'])
        }catch(error){
            console.log(error)
            const err = JSON.parse(error)
            assert.isObject(err)
            assert.properties(err,['state','message','error'])
        }
    })
})
