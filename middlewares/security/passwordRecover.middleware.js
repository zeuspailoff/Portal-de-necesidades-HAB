import validateSchema from "../../helpers/validationSchema.helper.js";
import passwordRecoverSchema from "../../schemas/users/passwordRecover.schema.js";
import { recoverPassword } from "../../controllers/users.controller.js";

const main = async (req, res, next) => {
    try {
        await validateSchema(passwordRecoverSchema, req.body);

        const { email, url } = req.body;

        await recoverPassword(email, url);

        res.send({
            status: "OK",
            message: "Password recovery email sent successfully"
        })

    } catch (err) {
        next(err);
    }
}

export default main;