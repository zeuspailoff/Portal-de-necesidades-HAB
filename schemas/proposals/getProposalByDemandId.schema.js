import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const getProposalByDemandIdSchema = joi.object({
    demand_id: joi.number().integer().required().messages(joiMsg)
});

export default getProposalByDemandIdSchema;