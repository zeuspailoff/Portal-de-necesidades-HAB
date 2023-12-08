import randomstring from 'randomstring';
import validateSchema from "../../helpers/validationSchema.helper.js";
import newUserSchema from "../../schemas/users/newUser.schema.js";
import { newUserRegister } from "../../controllers/users.controller.js";

const main = async (req, res, next) => {
    try {
        await validateSchema(newUserSchema, req.body);

        const registrationCode = randomstring.generate(30);
        await newUserRegister(req.body, registrationCode);

        res.send({
            status: "OK",
            message: "Usuario creado correctamente"
        })

    } catch (err) {
        next(err);
    }
}

export default main;