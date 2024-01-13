import validateSchema from "../../helpers/validationSchema.helper.js";
import voteProposalSchema from "../../schemas/proposals/voteProposal.shema.js";
import { voteProposal } from "../../controllers/proposal.controller.js";


const main = async (req, res, next) => {
    try {

        await validateSchema(voteProposalSchema, req.body);

        const { value, proposal_id, user_id } = req.body;

        const votes = await voteProposal(value, proposal_id, user_id);

        res.send({
            status: 200,
            message: 'Vote added successfully',
            data: {
                votes
            }
        })
    } catch (error) {
        next(error);
    }
};

export default main;