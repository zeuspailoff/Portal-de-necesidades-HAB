import { getAllDemands } from '../../controllers/demands.controller.js';
import extractUserIdFromToken from '../../helpers/extractUserIdFromToken.helper.js';

const main = async (req, res, next) => {

    const user_id = extractUserIdFromToken(req.headers.auth_token);

    try {
        const [...response] = await getAllDemands(user_id);

        res.send({
            status: 200,
            message: 'Demands fetched successfully',
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;