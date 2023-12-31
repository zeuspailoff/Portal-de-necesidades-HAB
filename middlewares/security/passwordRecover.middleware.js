import validateSchema from "../../helpers/validationSchema.helper.js";
import passwordRecoverSchema from "../../schemas/users/passwordRecover.schema.js";
import { recoverPassword } from "../../controllers/users.controller.js";

const main = async (req, res, next) =>{
    try {
        await validateSchema(passwordRecoverSchema, req.body);

        const { email } = req.body;

        await recoverPassword(email);

        res.send({
            status: "OK",
            message: "Email de recuperación de contraseña enviado correctamente"
        })

    } catch (err) {
        next(err);
    }
}

export default main;