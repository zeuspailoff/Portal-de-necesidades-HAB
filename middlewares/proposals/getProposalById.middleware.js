import validateSchema from "../../helpers/validationSchema.helper.js";
import getProposalByIdSchema from "../../schemas/proposals/getProposalById.schema.js";
import { getProposal } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {


    const { proposal_id } = req.params;

    try {
        await validateSchema(getProposalByIdSchema, req.body);

        const proposals = await getProposal(proposal_id);

        res.send({
            status: 200,
            message: 'Propousal successfully😁',
            data: {
                proposals
            }
        });
    } catch (error) {
        next(error);
    }
};
export default main;
