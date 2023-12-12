import validateSchema from "../../helpers/validationSchema.helper.js";
import insertNewProposalSchema from "../../schema/proposals/insertNewProposal.schema.js";
import { createProposal } from "../../controllers/proposal.controller.js";
const main = async (req, res, next) => {

    validateSchema(insertNewProposalSchema, req.body);

    const { user_id, demand_id, description } = req.body;
    const files = req.files;

    try {
        const response = await createProposal(user_id, demand_id, description, files);

        res.status(200).json({
            message: 'Proposal was created successfully😁',
            id: response.insertId,
            user: user_id,
            demand: demand_id,
            description: description
        });

    } catch (error) {
        next(error);
    }
};
export default main;