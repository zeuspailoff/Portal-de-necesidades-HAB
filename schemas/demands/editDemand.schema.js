import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const editDemandSchema = joi.object({
    user_id: joi.number().integer().required().messages(joiMsg),
    id: joi.number().integer().required().messages(joiMsg),
    title: joi.string().min(5).max(50).required().messages(joiMsg),
    description: joi.string().min(10).max(1000).required().messages(joiMsg),
    files: joi.array().items(joi.string().min(10).max(1000).messages(joiMsg))
});

export default editDemandSchema;