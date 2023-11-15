const responseErrorCodes = {
    NOT_FOUND: 1,
    NOT_AUTHORIZED: 2,
    DATABASE_ERROR: 3,
    UNKNOWN_ERROR: 4,
    VALIDATION_ERROR: 5
}
const responseErrorMessages = {
    1: "Objekt [%object%] s id [%id%] se nepodařilo najít",
    2: "K objektu [%object%] s id [%id%] nemáte právo vykonat tuto akci",
    3: "Chyba databáze",
    4: "Chyba serveru",
    5: "Chybná vstupní data [%object%]"
}

const ThrowableError = (cause, message, status)=>{
    const error = new Error()
    error.cause = cause
    error.message = message
    error.status = status
    return error
}

const buildErrorMessage = (errorCode, object = null, id = null)=>{
    const message = responseErrorMessages[errorCode].replace("%object%", object).replace("%id%", id)
    return {errorMessages: [message]}
}

module.exports = {responseErrorCodes: responseErrorCodes, buildErrorMessage: buildErrorMessage, ThrowableError}
