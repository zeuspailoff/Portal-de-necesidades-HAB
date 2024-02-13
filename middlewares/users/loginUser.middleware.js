import validateSchema from '../../helpers/validationSchema.helper.js';
import loginUserSchema from '../../schemas/users/loginUser.schema.js';
import { loginUser } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {


    const { email, password } = req.body;

    try {

        await validateSchema(loginUserSchema, req.body)

        const data = await loginUser(email, password)

        res.send({
            status: 'OK',
            message: 'User authentication successful',
            data: {
                data

            }
        })
    } catch (error) {
        next(error)
    }
}

export default main;