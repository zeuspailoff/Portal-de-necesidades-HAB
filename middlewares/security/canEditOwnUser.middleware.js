import errors from '../../helpers/errors.helper.js';

const main = async (req, res, next) => {
    try {
        
        if(req.user.id !== req.entry.userId){
            errors.notAuthorizedError("No está autorizado para editar esta entrada","NOT_AUTHORIZED");
        }

        next();
    } catch (err) {
        next(err);
    }
}

export default main;