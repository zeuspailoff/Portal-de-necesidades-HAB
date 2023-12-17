import validateSchema from "../../helpers/validationSchema.helper.js";
import getProposalByIdSchema from "../../schemas/proposals/getProposalById.schema.js";
import { getAvgVotesById } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {

    
    const proposal  = req.proposal;
    
    try {
        await validateSchema(getProposalByIdSchema, req.body);

        const Avg = await getAvgVotesById(proposal.demand_id);

        res.send({
            status: 200,
            message: 'Propousal successfully😁',
            data: {
                proposal_id: proposal.id,
                demand_id: proposal.demand_id,
                AvgVotes: Avg
            }
        });
    } catch (error) {
        next(error);
    }
};
export default main;
