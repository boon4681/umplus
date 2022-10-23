import * as yup from 'yup'

export default async (schema: yup.ObjectSchema<any, any>, value: any) => {
    const validate = await schema.isValid(value, { 'abortEarly': false })
    const errors = (await schema.validate(value, { 'abortEarly': false }).catch(a => a)).inner || []
    const errors_record: Record<string, string> = {};
    errors.forEach((a: any) => {
        if (!errors_record[a.path]) {
            errors_record[a.path] = a.message
        }
    })
    return {
        errors:errors_record, validate
    }
}