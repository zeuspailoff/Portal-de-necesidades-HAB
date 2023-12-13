import getUserAccount from '../../controllers/users.controller';

const main = async (req, res, next) => {
    
    const { user_id, username } = req.body;
    
    try {
        const [...response] = await getUserAccount(user_id);
        res.send({
            status: 200,
            message: 'User found successfully',
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;