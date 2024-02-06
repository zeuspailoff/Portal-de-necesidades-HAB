import { findOrFailUserById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    const { user_id } = req.user?.id || req.params;

    try {

        const user = await findOrFailUserById(user_id)
        console.log('estimate', user);

        req.user = user;


        next();

    } catch (error) {
        next(error)
    }
}


export default main;