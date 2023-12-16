import { validateUserRecoveryCode } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    
    const { recoveryCode } = req.params;
    
    try {
       
        const user = await validateUserRecoveryCode(recoveryCode);

        res.user = user;
        req.body.user_id = user.id;

        next();
    } catch (error) {
        next(error);
    }
};

export default main;
