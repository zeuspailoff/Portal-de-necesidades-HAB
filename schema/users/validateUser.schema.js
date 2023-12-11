/* COMENTADO PORQUE AÚN NO SE HIZO: 
import joi from 'joi';
import joiMsg from '../joi.error.messages.js' */

const validateUserSchema = joi.object({
    registrationCode: joi.string()
        .required()
        .pattern(/^\S*$/)
        .messages({...joiMsg.errorMsg,...joiMsg.errorMsgUsername})
    });

export default validateUserSchema;