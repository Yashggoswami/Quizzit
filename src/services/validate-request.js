module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        console.log(error);
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        console.log("validate ho gya");
        req.body = value;
        next();
    }
}