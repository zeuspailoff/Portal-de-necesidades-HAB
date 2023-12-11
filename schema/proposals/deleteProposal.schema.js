import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const deleteProposalSchema = joi.object({
    id: joi.number().required().error(new joiMsg('Id is required'))
})

export default deleteProposalSchema;