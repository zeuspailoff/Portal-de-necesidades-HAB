import { findOrFailUserById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {
    console.log(req.body);

    const { id } = req.body
    console.log('midlewareereeeerereerere');

    try {

        await findOrFailUserById(id)

        next();
    } catch (error) {
        next(error)
    }
}

export default main;

