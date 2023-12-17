import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const updateDemandSchema = joi.object({
    demand_id: joi.number().integer().required().messages(joiMsg),
    status: joi.string().required().messages(joiMsg)
});

export default updateDemandSchema; 