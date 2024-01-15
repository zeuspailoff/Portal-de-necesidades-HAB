import { findOrFailUserById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    const { user_id } = req.params

    try {

        const user = await findOrFailUserById(user_id)

        res.user = { ...res.user, ...user }

        next();
    } catch (error) {
        next(error)
    }
}

export default main;

