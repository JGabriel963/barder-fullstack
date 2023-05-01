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

document.querySelector('#tableInvest > tbody').addEventListener('click', editDelete)
