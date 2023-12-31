import errors from "../../helpers/errors.helper.js";

const main = async (req, res, next) => {
    try {

        let entity = {};

        if (req.proposal) {
            entity = req.proposal;
        } else {
            entity = req.demand;
        }

        if (entity.user_id != req.body.user_id) {
            errors.notAuthorizedError("No está autorizado para editar esta entrada", "NOT_AUTHORIZED");
        }

        next();

    } catch (err) {
        next(err);
    }
}

export default main;