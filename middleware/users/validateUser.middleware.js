import validateSchema from '../../helpers/validationSchema.helper.js'
import validateUserSchema from '../../schema/users/validateUser.schema.js'
import { validateUserByRegistrationCode } from '../../controllers/users.controller.js'

const main = async (req, res, next) => {

    await validateSchema(validateUserSchema, req.params);

    const { registrationCode } = req.params;

    try {
        const user = await validateUserByRegistrationCode(registrationCode);
        res.send({
            status: 200,
            message: `User with ID: ${user.id} validated successfully`
        })
        next();
    } catch (error) {
        next(error);
    }
};

export default main;
