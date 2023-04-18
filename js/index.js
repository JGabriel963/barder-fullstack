const dateCurrent = () => {
    let dateCurrent = new Date();
    console.log(dateCurrent);
    let day = dateCurrent.getDate();
    let month = dateCurrent.getMonth() + 1;
    let year = dateCurrent.getFullYear();

    return (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) + '/' + year;
}


const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    clearFields()
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_investimento')) || []
const setLocalStorage = (dbClient) => localStorage.setItem('db_investimento', JSON.stringify(dbClient))

// Delete
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

const createClient = (client) => {
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


const salveClient = () => {
    if (isValidFields()) {
        const client = {
            code: document.getElementById('code').value,
            data: dateCurrent(),
            amount: document.getElementById('amount').value,
            unitaryValue: document.getElementById('unitary-value').value,
            buySell: document.getElementById('buy-sell').value,
            brokerageFee: document.getElementById('brokerage-fee').value,
            opValue: document.getElementById('amount').value * document.getElementById('unitary-value').value,
            imposto: 1.92,
            finalValue: (document.getElementById('amount').value * document.getElementById('unitary-value').value) + 1.92
        }
        createClient(client)
        updateTable()
        closeModal()
        console.log("Cadastrando cliente!");
    }
}

const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.code}</td>
    <td>${client.data}</td>
    <td>${client.amount}</td>
    <td>${client.unitaryValue}</td>
    <td>${client.buySell}</td>
    <td>${client.brokerageFee}</td>
    <td>${client.opValue}</td>
    <td>${client.imposto}</td>
    <td>${client.finalValue}</td>
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

updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', salveClient)