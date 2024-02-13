const main = async (req, res, next) => {
    try {
        const userInfo = req.user;

        const user = {
            id: userInfo.id,
            username: userInfo.username,
            email: userInfo.email,
            avatar: userInfo.avatar,
            createdAt: userInfo.createdAt
        }

        res.send({
            status: "OK",
            message: "User found",
            data: {
                user
            }
        })
    } catch (err) {
        next(err);
    }
}

export default main;