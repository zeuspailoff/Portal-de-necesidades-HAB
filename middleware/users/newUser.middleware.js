import randomstring from 'randomstring';
//import validateSchema from '../../schema/'
import newUserSchema from '../../schema/users/newUser.schema.js';
import { registerNewUser } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {
    try {

        //await validateSchema(newUserSchema, req.body)

        const registrationCode = randomstring.generate(30);
        await registerNewUser(req.body, registrationCode);

        res.send({
            status: 'OK',
            message: 'Usuario creado correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export default main;