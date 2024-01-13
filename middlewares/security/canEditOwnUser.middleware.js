import errors from '../../helpers/errors.helper.js';

const main = async (req, res, next) => {
    try {
        
        if(req.user.id !== req.entry.userId){
            errors.notAuthorizedError("User not authorized to edit or modify this entry", "NOT_AUTHORIZED");
        }

        next();
    } catch (err) {
        next(err);
    }
}

export default main;