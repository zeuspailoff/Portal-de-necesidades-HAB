import getUserById from '../../controllers/users.controller.js';

const main = async (req, res, next) => {
    try {
        const userId = req.body

        const user = await getUserById(userId)

        req.user = user;

        next();

    } catch (error) {
        next(error)
    }
}

export default main;