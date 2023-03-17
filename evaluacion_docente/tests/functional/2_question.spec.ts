import { assert } from '@japa/preset-adonis'
import { test } from '@japa/runner'
import { getToken } from './getToken'

test.group('Question CRUD tests...',()=>{

    test('Should store a question and its options when valid data is given...',async ({ client }) => {
        const token = await getToken(1) // Obtener token de un usuario con rol 'admin'
        const response = await client.post('api/v1/questions/create').header('Authorization',`Bearer ${token}`).json({
            "question": "¿que dia es hoy?",
            "options": [
                'lunes',
                'martes',
                'miercoles',
                'jueves'
            ]
        }
        )
        response.assertStatus(200)
        response.body().assert?.isObject()
        response.assert?.containsSubset(response.body(),{"state":true, "message":"Pregunta creada exitosamente"})
    })

    test('Should give error when trying to store a question with invalid data...',async ({ client, assert }) => {
        const token = await getToken(1) // Obtener token de un usuario con rol 'admin'
        try{
            await client.post('api/v1/questions/create').header('Authorization',`Bearer ${token}`).json({
                "options": [
                    'lunes',
                    'martes',
                    'miercoles',
                    'jueves'
                ]
            })
        }catch(error){
            const err = JSON.parse(error)
            assert.isObject(err)
            assert.properties(err,['state','message','error'])
        }
    })

    test('Should list all questions and handle errors related to that...',async ({ client, assert }) => {
        try{
            const token = await getToken(2) // Obtener token de un usuario con rol 'student'
            const response = await client.get('api/v1/questions/getQuestions').header('Authorization',`Bearer ${token}`)
            response.assertStatus(200)
            assert.isObject(response.body())
            assert.properties(response.body(),['state','questions'])
            assert.isArray(response.body().questions)
        }catch(error){
            const err = JSON.parse(error)
            assert.isObject(err)
            assert.properties(err,['state','message','error'])
        }
    })

    test('Should edit questions and handle errors related to that...',async ({ client, assert }) => {
        try{
            const token = await getToken(1) // Obtener token de un usuario con rol 'admin'
            const response = await client.put('api/v1/questions/updateQuestion/1').header('Authorization',`Bearer ${token}`).json({
                "question":"Pregunta actualizada"
            })
            response.assertStatus(200)
            assert.isObject(response.body())
            assert.properties(response.body(),['state','message'])
        }catch(error){
            const err = JSON.parse(error)
            assert.isObject(err)
            assert.properties(err,['state','message','error'])
        }
    })

    test('Should list question\'s options',async ({ client, assert }) => {
        try{
            const token = await getToken(2) // Obtener token de un usuario con rol 'estudiante'
            const response = await client.get('api/v1/questions/getOptions/1').header('Authorization',`Bearer ${token}`)
            response.assertStatus(200)
            assert.isObject(response.body())
            assert.properties(response.body(),['state','message','options'])
        }catch(error){
            const err = JSON.parse(error)
            assert.isObject(err)
            assert.properties(err,['state','message','error'])
        }
    })

    test('Should delete questions and handle errors related to that...',async ({ client, assert }) => {
        try{
            const token = await getToken(1) // Obtener token de un usuario con rol 'admin'
            const response = await client.delete('api/v1/questions/deleteQuestion/1').header('Authorization',`Bearer ${token}`)
            response.assertStatus(200)
            assert.isObject(response.body())
            assert.properties(response.body(),['state','message'])
        }catch(error){
            const err = JSON.parse(error)
            assert.isObject(err)
            assert.properties(err,['state','message','error'])
        }
    })
})
