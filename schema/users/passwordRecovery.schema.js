/* COMENTADO PORQUE AÚN NO SE HIZO: 
import joi from 'joi';
import joiMsg from '../joi.error.messages.js' */

const passwordRecoverySchema = joi.object({
    email: joi.string().email().required().messages(joiMsg.errorMsg)
});

export default passwordRecoverySchema;