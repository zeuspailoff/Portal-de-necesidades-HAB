import validateSchema from "../../helpers/validationSchema.helper.js";
import loginUserSchema from "../../schemas/users/loginUser.schema.js";
import { loginUser } from "../../controllers/users.controller.js";

const main = async (req, res, next) => {
    try {
        await validateSchema(loginUserSchema, req.body);

        const token = await loginUser(req.body.email, req.body.password);

        res.send({
            status: "OK",
            message: "Usuario logueado correctamente",
            data: {
                token: token
            }
        })

    } catch (err) {
        next(err);
    }

};

export default main;