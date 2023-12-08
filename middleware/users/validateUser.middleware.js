import { validateUser } from "../../controllers/users.controller.js";
import validateSchema from "../../helpers/validationSchema.helper.js";
import validateUserSchema from "../../schemas/users/validateUser.schema.js";

const main = async (req, res, next) => {
    try {
        const { registrationCode } = req.params;

        await validateSchema(validateUserSchema, { registrationCode });

        await validateUser(registrationCode);

        res.send({
            status: "OK",
            message: "Usuario validado correctamente"
        });

    } catch (err) {
        next(err);
    }
}

export default main;