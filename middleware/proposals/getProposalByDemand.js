import validateSchema from "../../helpers/validationSchema.helper.js";
import getProposalByDemandIdSchema from "../../schema/proposals/getProposalByDemandId.schema.js";
import { getProposalByDemand } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {

    const { demand_id } = req.params;

    await validateSchema(getProposalByDemandIdSchema, req.params);

    try {
        const proposals = await getProposalByDemand(demand_id);
        console.log(proposals);

        res.send({
            status: 200,
            message: "Proposals found😁",
            data: {
                proposals
            }
        })
    } catch (error) {
        next(error);
    }

};
export default main;