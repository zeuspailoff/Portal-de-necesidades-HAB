import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const demandExistsValidateSchema = joi.object({
    demand_id: joi.number().integer().required().messages(joiMsg)
});

export default demandExistsValidateSchema; 