// validation
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
// End

// Inicio do TEste
const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
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

const saveEditInvestiment = () => {
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
            const index = document.getElementById('code').dataset.index
            updateClient(index, investment)
            updateTable()
            closeModal()
        }
    } catch (err) {
        inputFields[err.input].classList.add('error')
        alertError(err.input)
    }
}
// Fim do teste
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


const isValidFields = () => {
    return document.getElementById('form').reportValidity()
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
    document.getElementById('code').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
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
document.getElementById('salvar').addEventListener('click', saveEditInvestiment)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.querySelector('#tableInvest > tbody').addEventListener('click', editDelete)
