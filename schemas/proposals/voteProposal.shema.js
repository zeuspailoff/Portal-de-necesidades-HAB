import joi from 'joi'
import joiMsg from '../joi.error.messages.js'

const voteProposalSchema = joi.object({
    proposal_id: joi.number().integer().min(1).required().messages(joiMsg),
    user_id: joi.number().integer().min(1).required().messages(joiMsg),
    value: joi.number().integer().min(1).max(5).required().messages(joiMsg),
    demand_id: joi.number().integer().min(1).required().messages(joiMsg)
})

export default voteProposalSchema;