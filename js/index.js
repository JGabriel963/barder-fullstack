function dateCurrent() {
    let dateCurrent = new Date();
    let day = dateCurrent.getDay();
    let month = dateCurrent.getMonth();
    let year = dateCurrent.getFullYear();
    let format = (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) + '/' + year;
    return format; // Retornando o resultado formatado
}

console.log(dateCurrent);

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    clearFields()
}

const tempClient = {
    nome: "Lucas",
    email: 'joaogabriel9633@gmail.com',
    celular: '86988923098',
    cidade: 'Teseina/PI'
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
            data: `${data.getDay}/${data.getMonth}/${data.getFullYear}`,
            amount: document.getElementById('amount').value,
            unitaryValue: document.getElementById('unitary-value').value,
            buySell: document.getElementById('buy-sell').value,
            brokerageFee: document.getElementById('brokerage-fee').value,
            opValue: document.getElementById('amount').value * document.getElementById('unitary-value').value,
            imposto: 1.92,
            finalValue: (document.getElementById('amount').value * document.getElementById('unitary-value').value) + 1.92
        }
        createClient(client)
        closeModal()
        console.log("Cadastrando cliente!");
    }
}


// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', salveClient)