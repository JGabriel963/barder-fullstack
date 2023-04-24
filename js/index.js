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
}

const createRow = (investment) => {
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
    dbClient.reverse().forEach(createRow)
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', salveInvestiment)