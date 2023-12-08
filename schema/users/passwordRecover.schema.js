import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const passwordRecoverSchema = joi.object({
    email: joi.string().email().required().messages(joiMsg.errorMsg)
});

export default passwordRecoverSchema;