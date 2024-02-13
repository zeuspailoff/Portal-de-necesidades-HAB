const errorMsg = {
    'any.required': 'The "{#key}" field is required',
    'string.base': 'The value of "{#key}" must be a string',
    'string.empty': 'The "{#key}" field must not be empty',
    'date.base': 'The value of "{#key}" must be a date type YYYY-MM-DD',
    'number.base': 'The value of "{#key}" must be a number',
    'number.max': 'The file must not exceed 5 MB',
    'object.base': 'The value of "{#key}" must be an object',
    'any.only': 'Only jpeg or png photos are allowed',
    'string.email':
        'You must provide a valid email for "{#key}"',
    'string.min': 'The "{#key}" field must have at least {#limit} characters',
    'string.max': 'The "{#key}" field must not exceed {#limit} characters',
    'object.unknown': 'No additional fields are allowed in this object',
};

const errorMsgUsername = {
    'string.pattern.base':
        'The "{#key}" field must not contain whitespace.',
};

const errorMsgPassword = {
    'string.pattern.base':
        'The password must contain at least one uppercase letter, one lowercase letter, one number, and one punctuation symbol for "{#key}"',
};

export default {
    errorMsg,
    errorMsgUsername,
    errorMsgPassword
};
