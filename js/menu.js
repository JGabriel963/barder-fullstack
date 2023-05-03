// Validation 
const inputFields = {
    code: document.getElementById('code'),
    data: document.getElementById('date'),
    amount: document.getElementById('amount'),
    unitaryValue: document.getElementById('unitary-value'),
    brokerageFee: document.getElementById('brokerage-fee')
}

function validateEmail(email) {
    if (!email.match(/[A-Z]{4}\d{1,2}/)) {
        const err = new Error("Código inválido")
        err.input = 'code'
        throw err
    }
}

function validateDate(date) {
    if (!date.match(/\d{2}\/\d{2}\/\d{4}/)) {
        const err = new Error("Data inválida")
        err.input = 'data'
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
    if (!value.match(/^[0-9]+([,][0-9]+?$)/)) {
        const err = new Error("Valor inválido.")
        err.input = 'unitaryValue'
        throw err
    }
}

function validateBrokerageFee(value) {
    if (!value.match(/^\d+$/)) {
        const err = new Error("Valor inválido.")
        err.input = 'brokerageFee'
        throw err
    }
}

function validateFields() {
    validateEmail(inputFields.code.value)
    validateDate(inputFields.data.value)
    validateAmout(inputFields.amount.value)
    validateUnitary(inputFields.unitaryValue.value)
    validateBrokerageFee(inputFields.brokerageFee.value)
}


const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    clearFields()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(fields => fields.value = "")
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_investimento')) || []
const setLocalStorage = (dbClient) => localStorage.setItem('db_investimento', JSON.stringify(dbClient))

const createInvestiment = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const alertError = (error) => {
    switch (error) {
        case 'code':
            alert("Código inválido!")
            break
        case 'data':
            alert('Data inválida! Padrão - DD/MM/AAAA')
            break
        case 'amount':
            alert("Quantidade inválida")
            break
        case 'unitaryValue':
            alert('Valor unitário inválido.')
            break
        case 'brokerageFee':
            alert("Taxa corretária inválida.")
            break
        default:
            alert("Todos estão inválidos.")
            break
    }
}

function valorFinal(valor, valorop, taxa, imposto) {
    if (valor === "C") {
        return valorop + taxa + imposto
    } else {
        return valorop - taxa - imposto
    }
}

const salveInvestiment = () => {
    try {
        validateFields()
        if (isValidFields()) {
            const investment = {
                code: document.getElementById('code').value,
                data: document.getElementById('date').value,
                amount: document.getElementById('amount').value,
                unitaryValue: document.getElementById('unitary-value').value,
                buySell: document.getElementById('buy-sell').value,
                brokerageFee: document.getElementById('brokerage-fee').value,
                opValue: document.getElementById('amount').value * (document.getElementById('unitary-value').value).replace(',', '.'),
                imposto: (((document.getElementById('amount').value * (document.getElementById('unitary-value').value).replace(',', '.')) * 0.03) / 100).toFixed(2),
                finalValue: valorFinal(document.getElementById('buy-sell').value, document.getElementById('amount').value * (document.getElementById('unitary-value').value).replace(',', '.'), document.getElementById('brokerage-fee').value, (((document.getElementById('amount').value * (document.getElementById('unitary-value').value).replace(',', '.')) * 0.03) / 100).toFixed(2))
            }
            createInvestiment(investment)
            // updateTable()
            closeModal()
        }
    } catch (err) {
        inputFields[err.input].classList.add('error')
        alertError(err.input)
    }
}


document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', salveInvestiment)


