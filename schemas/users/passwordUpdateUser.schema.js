import joi from 'joi';
import joiMsg from '../joi.error.messages.js'

const passwordUpdateUserSchema = joi.object({
    user_id: joi.number().required().messages(joiMsg.errorMsg),
    password: joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/)

        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgPassword })
});

export default passwordUpdateUserSchema;