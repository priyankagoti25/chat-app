export const formatErrors = (validationErrors) => {
    const formattedErrors = {}

    for (const key in validationErrors.errors) {
        formattedErrors[key] = validationErrors.errors[key].message
    }
    return {errors: formattedErrors, message: validationErrors._message}
}

