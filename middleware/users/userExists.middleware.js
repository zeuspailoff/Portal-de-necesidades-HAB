import { findOrFailUserById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    const { id } = req.params

    try {

        await findOrFailUserById(id)

        next();

    } catch (error) {
        next(error)
    }
}

export default main;