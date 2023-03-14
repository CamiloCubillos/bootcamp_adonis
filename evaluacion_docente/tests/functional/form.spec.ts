import { test } from '@japa/runner'
import { getToken } from './getToken'

test.group('Form CRUD tests...',()=>{
    test('Should store a form without questions...',async ({ client }) => {
        const token = await getToken(1) // Obtener token de un usuario con rol 'admin'
        const response = await client.post('api/v1/form').header('Authorization',`Bearer ${token}`).json({
            "formName":"mockForm"
        }
        )
        response.assertStatus(200)
        response.body().assert?.isObject()
        response.assert?.containsSubset(response.body(),{"message":"Formulario creado exitosamente"})
    })

    test('Should store form and its questions and options when valid data is given...',async ({ client }) => {
        const token = await getToken(1) // Obtener token de un usuario con rol 'admin'
        await client.post('api/v1/form').header('Authorization',`Bearer ${token}`).json({
            "formName":"mockFormWithQuestions"
        }).then(async () => {
            const response = await client.post('api/v1/question').header('Authorization',`Bearer ${token}`).json({
                "formId":2,
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
            response.assert?.containsSubset(response.body(),{"message":"Pregunta creada exitosamente"})
        })
    })

    test('Should store form and its questions and options when valid data is given...',async ({ client }) => {
        const token = await getToken(1) // Obtener token de un usuario con rol 'admin'
        await client.post('api/v1/form').header('Authorization',`Bearer ${token}`).json({
            "formName":"mockFormWithQuestions"
        }).then(async () => {
            const response = await client.post('api/v1/question').header('Authorization',`Bearer ${token}`).json({
                "formId":2,
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
            response.assert?.containsSubset(response.body(),{"message":"Pregunta creada exitosamente"})
        })
    })

    test('Should list all forms ids and names...',async ({ client }) => {
        const response = await client.get('api/v1/form')
        response.assertStatus(200)
        response.assert?.isArray(response.body())
    })

    test('Should list form questions and optiones when giving a valid id',async ({ client }) => {
        const response = await client.get('api/v1/form/2')
        response.assertStatus(200)
        response.assert?.isObject(response.body())
    })

    
})
