import { getUserById } from "../../controllers/users.controller.js";

const main = async (req, res, next) => {
    try {
        const userId = req.user?.id || req.params.userId;

        const user = await getUserById(userId);

        req.user = user;

        next();
    } catch (err) {
        next(err);
    }
}

export default main;