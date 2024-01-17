import validateSchema from "../../helpers/validationSchema.helper.js";
import deleteProposalSchema from "../../schemas/proposals/deleteProposal.schema.js";
import { deleteProposalById } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {


    const { proposal_id } = req.params;

    try {
        await deleteProposalById(proposal_id);

        res.send({
            status: 200,
            message: 'Propousal is deleted successfully😁'
        })

    } catch (error) {
        next(error);
    }
};
export default main;