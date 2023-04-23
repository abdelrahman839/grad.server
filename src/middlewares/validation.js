module.exports = (schema) => {
    return (req, res, next) => {
        const validation=[];
        const reqOptions = ['body', 'prames', 'query'];
        reqOptions.forEach(key => {
            if (schema[key]){
                const validateRequest = schema[key].validate(req[key]);
                if (validateRequest.error) {
                    validation.push(validateRequest.error.details[0].message)
                }
            }
        });
        if (validation.length) {
            res.status(400).json({ error: validation.join() });
        } else {
            next();
        }
    }
}