import { proposalAlreadyExists } from '../../controllers/proposal.controller.js';

const main = async (req, res, next) => {

    const { proposal_id } = req.params;
    
    try {
        const response = await proposalAlreadyExists(proposal_id);

        req.proposal = response[0];

        next();

    } catch (error) {
        next(error);
    }
};

export default main;