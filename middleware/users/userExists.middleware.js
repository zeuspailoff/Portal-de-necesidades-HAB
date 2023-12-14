import { findOrFailUserById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    const { id } = req.body

    try {

        const user = await findOrFailUserById(id)

        req.user = user;

        next();

    } catch (error) {
        next(error)
    }
}

export default main;