

const validateSchema = async (schema, body) => {
    try {
        await schema.validateAsync(body);
    } catch (error) {
        error.httpStatus = 400;
        error.code = 'Invalid schema';
        throw error;
    }
}

export default validateSchema;