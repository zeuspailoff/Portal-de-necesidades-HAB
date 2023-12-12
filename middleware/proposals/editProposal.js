import validateSchema from "../../helpers/validationSchema.helper.js";
import editProposalSchema from "../../schema/proposals/editProposal.schema.js";
import { editProposalById } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {

    await validateSchema(editProposalSchema, req.body);

    const { id, description } = req.body;

    try {
        await editProposalById(id, description);

        res.send({
            status: 200,
            message: 'Propousal is edited successfully😁'
        });
    } catch (error) {
        next(error);
    }
};

export default main;