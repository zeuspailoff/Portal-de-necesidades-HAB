import validateSchema from '../../helpers/validationSchema.helper.js'
import proposalExistsValidateSchema from '../../schemas/proposals/validateProposalExists.schema.js';
import { proposalExists }  from '../../controllers/proposal.controller.js';

const main = async (req, res, next) => {

    const { proposal_id } = req.body;
    
    try {
        await validateSchema(proposalExistsValidateSchema, req.body);

        const response = await proposalExists(proposal_id);

        req.proposal = response;

        next();
        
    } catch (error) {
        next(error);
    }
};

export default main;