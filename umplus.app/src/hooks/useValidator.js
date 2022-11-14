
export default async (schema, value) => {
    const validate = await schema.isValid(value, { 'abortEarly': false })
    const errors = (await schema.validate(value, { 'abortEarly': false }).catch(a => a)).inner || []
    const errors_record = {};
    errors.forEach((a) => {
        if (!errors_record[a.path]) {
            errors_record[a.path] = a.message
        }
    })
    return {
        errors:errors_record, validate
    }
}