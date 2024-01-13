const errorMsg = {
    'any.required': '"{#key}" field required',
    'string.base': '"{#key}" value must be a string',
    'string.empty': '"{#key}" value cannot be empty',
    'date.base': '"{#key}" value must be YYYY-MM-DD format type date',
    'number.base': '"{#key}" value must be numeric',
    'number.max': 'File size cannot exceed 5mb',
    'object.base': '"{#key}" value must be an object-type',
    'any.only': 'Only .jpeg or .png format files allowed',
    'string.email':
        'A valid email address must be provided for "{#key}"',
    'string.min': '"{#key}" must be {#limit} characters long at least',
    'string.max': '"{#key}" cannot be lenghtier than {#limit} characters',
    'object.unknown': 'Additional fields are not allowed for this object',
};

const errorMsgUsername = {
    'string.pattern.base':
        '"{#key}" must not contain spacings',
};

const errorMsgPassword = {
    'string.pattern.base':
        'Password for "{#key}" must have at least a capitalized letter, a low-cap letter, a number and a symbol/special character',
};

export default {
    errorMsg,
    errorMsgUsername,
    errorMsgPassword
};
