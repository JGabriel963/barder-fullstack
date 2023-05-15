export const inputFields = {
    code: document.getElementById('code'),
    data: document.getElementById('date'),
    amount: document.getElementById('amount'),
    unitaryValue: document.getElementById('unitary-value'),
    brokerageFee: document.getElementById('brokerage-fee')
}

function validateEmail(email) {
    if (!email.match(/^[A-Z]{4}\d{1,2}$/)) {
        const err = new Error("Código inválido")
        err.input = 'code'
        throw err
    }
}

function validateAmout(amount) {
    if (!amount.match(/^\d+$/)) {
        const err = new Error("Valor inválido.")
        err.input = 'amount'
        throw err
    }
}

function validateUnitary(value) {
    if (!value.match(/^\d+([,]\d+)?$/)) {
        const err = new Error("Valor inválido.")
        err.input = 'unitaryValue'
        throw err
    }
}

function validateBrokerageFee(value) {
    if (!value.match(/^\d+([,]\d+)?$/)) {
        const err = new Error("Valor inválido.")
        err.input = 'brokerageFee'
        throw err
    }
}

export function validateFields() {
    validateEmail(inputFields.code.value)
    validateAmout(inputFields.amount.value)
    validateUnitary(inputFields.unitaryValue.value)
    validateBrokerageFee(inputFields.brokerageFee.value)
}