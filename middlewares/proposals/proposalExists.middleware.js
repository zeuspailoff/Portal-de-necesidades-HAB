import validateSchema from '../../helpers/validationSchema.helper.js'
import proposalExistsValidateSchema from '../../schemas/proposals/validateProposalExists.schema.js';
import { proposalAlreadyExists }  from '../../controllers/proposal.controller.js';

const main = async (req, res, next) => {

    const { proposal_id } = req.body;
    
    try {
        await validateSchema(proposalExistsValidateSchema, req.body);

        const response = await proposalAlreadyExists(proposal_id);

        req.proposal = response[0];

        next();
        
    } catch (error) {
        next(error);
    }
};

export default main;