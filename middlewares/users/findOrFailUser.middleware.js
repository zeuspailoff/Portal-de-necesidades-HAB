import { findOrFailUserById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {
    
    const { user_id } = req.body

    try {

        await findOrFailUserById(user_id)

        next();
    } catch (error) {
        next(error)
    }
}

export default main;

