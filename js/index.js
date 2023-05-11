// // Validation 
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

function validateFields() {
    validateEmail(inputFields.code.value)
    validateDate(inputFields.data.value)
    validateAmout(inputFields.amount.value)
    validateUnitary(inputFields.unitaryValue.value)
    validateBrokerageFee(inputFields.brokerageFee.value)
}

// // funções

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(fields => fields.value = "")
}

// const isValidFields = () => {
//     return document.getElementById('form').reportValidity()
// }

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

function openModal() {
    document.getElementById('modal').classList.add('active')
}

function closeModal() {
    document.getElementById('modal').classList.remove('active')
    clearFields()
}

// Não mudar nada de cima

function calcularValorFinal(option, valorOp, taxa, imposto) {
    if (option  === "V") {
        return +valorOp - +taxa - +imposto
    } else if (option === "C") {
        return +valorOp + +taxa + +imposto
    }
    return null
}

async function saveInvestimentos(ev) {
    ev.preventDefault()
    try {
        validateFields()
        const codigo = document.querySelector('#code').value
        const data = document.querySelector('#date').value
        const quantidade = document.querySelector('#amount').value
        const valorUnitario = document.querySelector('#unitary-value').value
        const compraOuVenda = document.querySelector('#buy-sell').value
        const taxaCorretaria = document.querySelector('#brokerage-fee').value
        const valorOp = quantidade * (valorUnitario).replace(',', '.')
        const imposto = (valorOp * 0.0003).toFixed(2)
        const valorFinal = (calcularValorFinal(compraOuVenda, valorOp, (taxaCorretaria).replace(',', '.'), imposto)).toFixed(2)
    
        const response = await fetch(' http://localhost:3000/investimentos', {
            method: 'POST',
            body: JSON.stringify({codigo, data, quantidade, valorUnitario, compraOuVenda, taxaCorretaria, valorOp, imposto, valorFinal}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        const investimento = await response.json()
        console.log(investimento);
        closeModal()

    } catch (err) {
        inputFields[err.input].classList.add('error')
        alertError(err.input)
    }
}

async function fetchInvestimento() {
    return await fetch('http://localhost:3000/investimentos').then(res => res.json())
}


document.querySelector('form').addEventListener('submit', saveInvestimentos)

document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.querySelector('.modal-close').addEventListener('click', closeModal)





