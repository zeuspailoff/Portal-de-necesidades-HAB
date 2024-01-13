import validateSchema from "../../helpers/validationSchema.helper.js";
import passwordRecoverSchema from "../../schemas/users/passwordRecover.schema.js";
import { passwordRecover } from "../../controllers/users.controller.js";

const main = async (req, res, next) =>{
    try {
        await validateSchema(passwordRecoverSchema, req.body);

        const { email } = req.body;

        await passwordRecover(email);

        res.send({
            status: "OK",
            message: "Password recovery email sent successfully"
        })

    } catch (err) {
        next(err);
    }
}

export default main;