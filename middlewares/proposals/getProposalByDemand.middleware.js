import { getProposalByDemand } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {


    const { demand_id } = req.params;
    const demandIdAsNumber = parseInt(demand_id, 10) || demand_id;

    try {

        const proposals = await getProposalByDemand(demand_id);

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