import { findOrFailUserById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {
    
    console.log('esto es el body',req.body);

    const { id } = req.body

    try {

        await findOrFailUserById(id)

        next();
    } catch (error) {
        next(error)
    }
}

export default main;

