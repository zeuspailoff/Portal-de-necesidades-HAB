import validateUserSchema from '../../schema/users/validateUser.schema.js'
import loginUserSchema from '../../schema/users/loginUser.schema.js';
import loginUser  from '../../controllers/users.controller';

const main = async (req, res, next) => {
    try {
        await validateUserSchema(loginUserSchema, req.body)

        const token = await loginUser(req.body.email, req.body.password)

        res.send({
            status: 'OK',
            message: 'Autenticación del usuario correcta',
        })
    } catch (error) {
        next(error)
    }
}

export default main;