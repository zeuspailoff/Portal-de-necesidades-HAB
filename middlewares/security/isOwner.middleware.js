import errors from "../../helpers/errors.helper.js";
import extractUserIdFromToken from "../../helpers/extractUserIdFromToken.helper.js";

const main = async (req, res, next) => {
    try {

        let entity = {};

        const user_id = extractUserIdFromToken(req.headers.auth_token);

        if (req.proposal) {
            entity = req.proposal;
        } else {
            entity = req.demand;
        }

        if (entity.user_id != user_id) {
            errors.notAuthorizedError("You are not authorized to edit this entry", "NOT_AUTHORIZED");
        }

        next();

    } catch (err) {
        next(err);
    }
}

export default main;