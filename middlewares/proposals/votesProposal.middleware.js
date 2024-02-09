import validateSchema from "../../helpers/validationSchema.helper.js";
import voteProposalSchema from "../../schemas/proposals/voteProposal.shema.js";
import { voteProposal } from "../../controllers/proposal.controller.js";
import extractUserIdFromToken from "../../helpers/extractUserIdFromToken.helper.js";


const main = async (req, res, next) => {
    try {

        await validateSchema(voteProposalSchema, req.body);
        const {proposal_id} = req.params;
        const user_id = extractUserIdFromToken(req.headers.auth_token);
        const { value, demand_id } = req.body;
        
        console.log(req.body,"body");
        console.log(user_id, "user_id");
        console.log(proposal_id, "proposal_id");
        const votes = await voteProposal(value, proposal_id, user_id, demand_id);

        res.send({
            status: 200,
            message: 'voto completado con exito 🗳️',
            data: {
                votes
            }
        })
    } catch (error) {
        next(error);
    }
};

export default main;