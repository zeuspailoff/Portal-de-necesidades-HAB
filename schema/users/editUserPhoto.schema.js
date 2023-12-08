import joi from 'joi';
import imgSchema from '../imgSchema.js';

const editUserPhotoSchema = joi.object({
    photo: imgSchema.required()
});

export default editUserPhotoSchema;