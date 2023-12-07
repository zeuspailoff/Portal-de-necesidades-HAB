import { getProposalByDemandId } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {

    try {
        const proposals = await getProposalByDemandId(req.params.demand_id);

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