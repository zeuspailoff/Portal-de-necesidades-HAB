import joi from 'joi';
import joiMsg from '../joi.error.messages.js'

const getUserById = joi.object({
    id: joi.number().integer().required().messages(joiMsg)
});

export default getUserById;