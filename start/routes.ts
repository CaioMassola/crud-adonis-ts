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

//Token
Route.post('/token', 'AuthController.token');

//User
Route.group(() => {
  Route.post('/create', 'UsersController.create');
  Route.get('/read', 'UsersController.read').middleware('auth');
  Route.put('/update/:id', 'UsersController.update').middleware('auth');
  Route.delete('/delete/:id', 'UsersController.delete').middleware('auth');
}).prefix('/user')

Route.get('/', async () => {
  return { api: 'CRUD ADONIS TS' }
})
