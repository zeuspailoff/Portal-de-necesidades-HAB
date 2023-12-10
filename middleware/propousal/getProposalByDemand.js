import { getProposalByDemand } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {

    try {
        const proposals = await getProposalByDemand(req.params.demand_id);
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