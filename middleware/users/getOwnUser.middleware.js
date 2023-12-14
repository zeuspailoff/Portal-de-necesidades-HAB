const main = async (req, res, next) => {
    try {
        const userInfo = req.user;
        
        //DTO - Data Transfer Object
        const user = {
            id: userInfo.id,
            username: userInfo.username,
            email: userInfo.email,
            avatar: userInfo.avatar,
            createdAt: userInfo.createdAt
        }

        res.send({
            status: "OK",
            message: "Usuario encontrado",
            data:{
                user
            }
        })
    }catch (err) {
        next(err);
    }
}

export default main;