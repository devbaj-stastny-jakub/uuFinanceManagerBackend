const responseErrorCodes = {
    NOT_FOUND: 1,
    NOT_AUTHORIZED: 2,
    DATABASE_ERROR: 3,
    UNKNOWN_ERROR: 4
}
const responseErrorMessages = {
    1: "Objekt [%object%] s id [%id%] se nepodařilo najít",
    2: "K objektu [%object%] s id [%id%] nemáte právo vykonat tuto akci",
    3: "Chyba databáze",
    4: "Chyba serveru",
}

class ErrorMessage {
    messages = []
    addErrorMessage(errorCode, object = null, id = null) {
        const message = responseErrorMessages[errorCode].replace("%object%", object).replace("%id%", id)
        this.messages.push({message: message, errorCode: errorCode})
    }
    build() {
        return {errorMessages: this.messages}
    }
}


module.exports = {responseErrorCodes: responseErrorCodes, ErrorMessage: ErrorMessage}
