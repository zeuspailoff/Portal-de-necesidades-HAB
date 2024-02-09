import { popularProposalsByUserId } from "../../controllers/proposal.controller.js";
import validateSchema from "../../helpers/validationSchema.helper.js";
import popularProposals from "../../schemas/proposals/popularProposals.schema.js";

const main = async (req, res, next) => {


    const { user_id } = req.params;

    try {
        await validateSchema(popularProposals,  req.params);


        console.log(user_id);
        const proposals = await popularProposalsByUserId(user_id);

        res.send({
            status: 200,
            message: "Popular Proposals by User ID found😁",
            data: {
                proposals
            }
        })
    } catch (error) {
        next(error);
    }

};
export default main;