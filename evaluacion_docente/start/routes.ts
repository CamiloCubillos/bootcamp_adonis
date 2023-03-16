/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login','UsersController.login')
  Route.group(() => {
    Route.post('/create','UsersController.register')
    Route.get('','UsersController.getAllUsers')
    Route.get('/getUser/:id','UsersController.getUserById')
    Route.put('/update/:id','UsersController.updateUser')
  }).prefix('/user').middleware(['auth','admin'])
  Route.group(()=>{
    Route.get('','FormsController.getAllFormsIds')
    Route.get('/:id','FormsController.getFormById')
    Route.post('','FormsController.createForm').middleware(['auth','admin'])
  }).prefix('/form')
  Route.group(()=>{
    Route.post('/create','QuestionsController.createQuestion').middleware('admin')
    Route.get('/getQuestions','QuestionsController.getQuestions')
    Route.get('/getOptions/:id','QuestionsController.getQuestionOptions')
    Route.get('/getForm','QuestionsController.getForm')
    Route.put('/updateQuestion/:id','QuestionsController.updateQuestion').middleware('admin')
    Route.delete('/deleteQuestion/:id','QuestionsController.deleteQuestion').middleware('admin')
  }).prefix('/questions').middleware('auth')
  Route.group(()=>{
    Route.post('/postanswers','EvaluationsController.createEvaluation').middleware(['auth','student'])
    Route.get('','EvaluationsController.getAllEvaluations').middleware(['auth','admin'])
  }).prefix('/evaluation')
}).prefix('/api/v1')
