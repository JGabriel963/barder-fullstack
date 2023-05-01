// Validation 
const inputFields = {
    code: document.getElementById('code'),
    data: document.getElementById('date'),
    amount: document.getElementById('amount'),
    unitaryValue: document.getElementById('unitary-value'),
    brokerageFee: document.getElementById('brokerage-fee')
}

function validateEmail(email) {
    if (!email.match(/[A-Z]{4}\d{2,3}/)) {
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
    if (!value.match(/^\d+$/)) {
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


// Fim da validation

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    clearFields()
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_investimento')) || []
const setLocalStorage = (dbClient) => localStorage.setItem('db_investimento', JSON.stringify(dbClient))

// Delete - Ainda não esta integrada corretamente na aplicação
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

// Atualizar/Modificar o banco de Dados
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createInvestiment = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

// Interação com o layout
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(fields => fields.value = "")
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
                opValue: document.getElementById('amount').value * document.getElementById('unitary-value').value,
                imposto: (((document.getElementById('amount').value * document.getElementById('unitary-value').value) * 0.03) / 100).toFixed(2),
                finalValue: (document.getElementById('amount').value * document.getElementById('unitary-value').value) + 1.92
            }
            createInvestiment(investment)
            updateTable()
            closeModal()
        }
    } catch (err) {
        inputFields[err.input].classList.add('error')
    }
}

const createRow = (investment, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${investment.code}</td>
    <td>${investment.data}</td>
    <td>${investment.amount}</td>
    <td>R$${investment.unitaryValue}</td>
    <td>${investment.buySell}</td>
    <td>R$${investment.brokerageFee}</td>
    <td>R$${investment.opValue}</td>
    <td>R$${investment.imposto}</td>
    <td>R$${investment.finalValue}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}">Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
    `
    document.querySelector('#tableInvest > tbody').appendChild(newRow)

}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableInvest > tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('code').value = client.code;
    document.getElementById('date').value = client.data;
    document.getElementById('amount').value = client.amount;
    document.getElementById('unitary-value').value = client.unitaryValue;
    document.getElementById('brokerage-fee').value = client.brokerageFee;
}

const editClient = (index) => {
    const client = readClient()[index]
    fillFields(client)
    openModal()
}


const editDelete = (ev) => {
    if (ev.target.type === "button") {

        const [action, index] = ev.target.id.split("-")

        if (action === "edit") {
            editClient(index)
        } else {
            const investment = readClient()[index]
            const confirmation = confirm(`Tem certeza que deseja excluir o inestimento de código ${investment.code}`)
            if (confirmation) {
                deleteClient(index)
                updateTable()
            }
        }
    }
    
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', salveInvestiment)

document.querySelector('#tableInvest > tbody').addEventListener('click', editDelete)
