import { deleteFileByID } from '../../controllers/users.controller.js'

const main = async (req, res, next) => {


    const { file_id } = req.params;
    console.log(file_id, "file_id en deletefile middleware");

    try {

        const response = await deleteFileByID(file_id);
        console.log(response, "response en dletefile middleware");
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