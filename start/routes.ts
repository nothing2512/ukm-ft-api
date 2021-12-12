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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from "@ioc:Adonis/Core/Application";
import {string} from '@ioc:Adonis/Core/Helpers'

function crud(prefix, controller?, additionalRoute?: () => void) {
    prefix = string.pluralize(prefix)
    if (controller === null || controller === undefined) controller = string.pascalCase(prefix)

    Route.group(() => {

        if (additionalRoute) additionalRoute()

        Route.get('/', `${controller}Controller.index`)
        Route.get('/:id', `${controller}Controller.show`)
        Route.post('/', `${controller}Controller.store`).middleware('auth')
        Route.post('/:id/edit', `${controller}Controller.update`).middleware('auth')
        Route.post('/:id/delete', `${controller}Controller.destroy`).middleware('auth')

    }).prefix(prefix)
}

Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/register', 'AuthController.register').middleware('auth')
    Route.any('/logout', 'AuthController.logout').middleware('auth')
}).prefix('auth')

Route.get('/attachments/:directory/:file', async ({params, response}) => {
    return response.download(Application.tmpPath(`uploads/${params.directory}/${params.file}`));
})

crud('ukm')
crud('ukm/members', 'UkmMembers')
crud('user')

Route.group(() => {
    Route.get('/profile', 'UsersController.detail')
    Route.post('/edit', 'UsersController.update')
}).prefix('user').middleware('auth')

Route.get('/', async ({response}) => {
    // @ts-ignore
    return response.status(200).json({
        name: 'Financial Api',
        version: 'v1.0.0',
        version_code: '1.0.0',
        description: 'Authentication is needed to access api'
    });
})

