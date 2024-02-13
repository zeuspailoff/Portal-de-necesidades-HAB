import { deleteFileByID } from '../../controllers/users.controller.js'

const main = async (req, res, next) => {


    const { file_id } = req.params;

    try {

        const response = await deleteFileByID(file_id);
        res.send({
            status: 200,
            message: `File with ID: ${file_id} deleted successfully`,
            data: {
                response
            }
        })
    } catch (error) {
        next(error);
    }
};

export default main;