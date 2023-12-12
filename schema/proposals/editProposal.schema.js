import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const editProposalSchema = joi.object({
    id: joi.number().integer().required().messages(joiMsg),
    description: joi.string().min(10).max(1000).required().messages(joiMsg),
    files: joi.array().items(joi.string().min(10).max(1000).messages(joiMsg))
})

export default editProposalSchema;