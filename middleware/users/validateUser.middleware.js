import { validateUser } from '../../controllers/users.controller.js';
//import validateSchema from '../../helpers/'
import validateUserSchema from '../../schema/users/validateUser.schema.js';

const main = async (req, res, next) => {
    try {
        const { registrationCode } = req.params

      //  await validateSchema (validateUserSchema, {registrationCode})

        await validateUser(registrationCode)

        res.send({
            status: 'OK',
            message: 'Usuario validado correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export default main;
