import validateSchema from "../../helpers/validationSchema.helper.js";
import getAllDemandsByUserIdSchema from "../../schemas/demands/getAllDemandsByUserId.schema.js";
import { getAllDemandsByUserId } from "../../controllers/demands.controller.js";
import extractUserIdFromToken from "../../helpers/extractUserIdFromToken.helper.js";

const main = async (req, res, next) => {


    const {user_id} = req.params
    console.log(user_id);

    try {
        await validateSchema(getAllDemandsByUserIdSchema, req.params);

        const [...response] = await getAllDemandsByUserId(user_id);
        res.send({
            status: 200,
            message: `All demands from User ID: ${user_id} fetched successfully`,
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;