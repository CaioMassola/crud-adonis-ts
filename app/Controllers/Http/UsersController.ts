import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";

export default class UsersController {

    async create({ response, request }: HttpContextContract) {

        try {

            const body = request.only(['username', 'email', 'password']);
            const create_user = await User.create(body);

            return response.status(200).send({ message: 'User registered successfully!', create_user });

        } catch (e) {
            return response.status(400).send({ message: 'Error registering user!', e });
        }
    }

    async read({ response }) {

        try {

            const read = await User.all()

            return response.status(200).send({ message: 'User list!', read });

        } catch (e) {
            return response.status(400).send({ message: 'Error getting user!', e });
        }
    }

    async update({ response, request, auth, params }) {

        try {

            const { username, email, password } = request.body();
            const { id } = params

            if (id == auth.user.id) {
                const data_user = await User.query().select().where('id', id).first();

                if (data_user) {

                    data_user.username = username
                    data_user.email = email
                    data_user.password = password

                    await data_user.save()

                    return response.status(200).send({ message: 'User successfully updated!', data_user });
                }
            } else {
                return response.status(400).send({ message: 'User ID not found or ID not authorized!' });
            }
        } catch (e) {
            return response.status(400).send({ message: 'Error updating user!', e });
        }
    }

    async delete({ response, auth, params }) {

        try {

            const { id } = params

            if (id == auth.user.id) {
                const data_user = await User.findBy('id', id)

                if (data_user) {

                    await data_user.delete()

                    return response.status(200).send({ message: 'User successfully deleted!' });
                }
            } else {
                return response.status(400).send({ message: 'User ID not found or ID not authorized!' });
            }
        } catch (e) {
            return response.status(400).send({ message: 'Error deleting user!', e });
        }
    }
}
