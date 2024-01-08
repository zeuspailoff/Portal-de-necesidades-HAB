import validateSchema from "../../helpers/validationSchema.helper.js";
import editUserPasswordSchema from '../../schemas/users/editUserPassword.schema.js';
import { editUserPassword } from "../../controllers/users.controller.js";

const main = async(req,res,next)=>{
    try {
        await validateSchema(editUserPasswordSchema,req.body);

        const { email, recoverPassCode, newPass } = req.body;
        await editUserPassword(email, recoverPassCode, newPass)

        res.send({
            status: 'OK',
            message: 'Contraseña actualizada',
        });
        
    } catch (err) {
        next(err);
    }
}

export default main;