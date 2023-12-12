import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const updateDemandSchema = joi.object({
    status: joi.number().integer().required().messages(joiMsg)
});

export default updateDemandSchema; 