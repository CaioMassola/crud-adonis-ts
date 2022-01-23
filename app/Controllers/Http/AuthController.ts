// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    async token({request, response, auth}){
        try {
            const { email, password } = request.post();

            const token = await auth.use('api').attempt(email, password);

            return token;
        }catch (e) {
            return response.status(400).send({message: 'Error generating token!', e});
        }
    }   
}
