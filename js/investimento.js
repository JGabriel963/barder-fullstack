const inputFields = {
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

function validateDate(date) {
    if (!date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
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

let investimentos = []

function createRow(id) {
    const row = document.createElement('tr')
    row.id = `row-${id}`
    return row
}

function editInvestiment(id) {
    const investimento = investimentos.find(i => i.id === id)
    console.log(investimento);
    openModal()
    document.getElementById('id').value = investimento.id
    document.getElementById('code').value = investimento.codigo
    document.getElementById('date').value = investimento.data
    document.getElementById('amount').value = investimento.quantidade
    document.getElementById('unitary-value').value = investimento.valorUnitario
    document.getElementById('brokerage-fee').value = investimento.taxaCorretaria
}

async function deleteInvestimento(id) {
    const investimento = investimentos.find(inome => inome.id === id)
    const confirmation = confirm(`Tem certeza que deseja excluir o investimento de código ${investimento.codigo}?`)
    if (confirmation) {
        await fetch(`http://localhost:3000/investimentos/${id}`, {
            method: 'DELETE'
        })
        document.querySelector(`#row-${id}`).remove()
        const indexToRemove = investimentos.findIndex((i) => i.id === id)
        investimentos.splice(indexToRemove, 1)
    } else return
}

function renderInvestimento(investimento) {
    const row = createRow(investimento.id)
    row.innerHTML = `
    <td>${investimento.codigo}</td>
    <td>${investimento.data}</td>
    <td>${investimento.quantidade}</td>
    <td>R$${investimento.valorUnitario}</td>
    <td>${investimento.compraOuVenda}</td>
    <td>R$${investimento.taxaCorretaria}</td>
    <td>R$${investimento.valorOp}</td>
    <td>R$${investimento.imposto}</td>
    <td>R$${investimento.valorFinal}</td>
    <td>
        <button type="button" class="button green" onclick="editInvestiment(${investimento.id})">Editar</button>
        <button type="button" class="button red" id="delete" onclick="deleteInvestimento(${investimento.id})">Excluir</button>
    </td>
    `
    document.querySelector('#tableInvest > tbody').appendChild(row)
}

function calcularValorFinal(option, valorOp, taxa, imposto) {
    if (option  === "V") {
        return +valorOp - +taxa - +imposto
    } else if (option === "C") {
        return +valorOp + +taxa + +imposto
    }
    return "C"
}

function calcularMedia(code, compraOuVenda, quantidade, valorFinal) {
    const cod = investimentos.filter(i => i.codigo === code)
    const vendas = cod.filter(i => i.compraOuVenda === "V")
    const compras = cod.filter(i => i.compraOuVenda === "C")
    console.log(cod)
    console.log(cod.length)
    console.log(vendas)
    console.log(vendas.length)
    if (cod.length === 0) {
        return +valorFinal / +quantidade
    } else if(compraOuVenda === "V") {
        return +cod[cod.length - 1].media
    } else {
        const somaVendas = vendas.reduce((cont, el) => cont + +el.quantidade, 0)
        console.log(somaVendas)
        const soma = compras.reduce((cont, el) => cont + +el.quantidade, 0) - somaVendas

        console.log(soma)
        console.log(+cod[cod.length - 1].media)
        console.log(+valorFinal)
        console.log(soma + +quantidade)
        return (soma * +cod[cod.length - 1].media + +valorFinal) / (soma + +quantidade)
    }

}

async function saveEditInvestiment(ev) {
    ev.preventDefault()
    try {
        validateFields()
        const id = document.getElementById('id').value
        const codigo = document.querySelector('#code').value
        const data = document.querySelector('#date').value
        const quantidade = document.querySelector('#amount').value
        const valorUnitario = document.querySelector('#unitary-value').value
        const compraOuVenda = document.querySelector('#buy-sell').value
        const taxaCorretaria = document.querySelector('#brokerage-fee').value
        const valorOp = (quantidade * (valorUnitario).replace(',', '.')).toFixed(2)
        const imposto = (valorOp * 0.0003).toFixed(2)
        const valorFinal = (calcularValorFinal(compraOuVenda, valorOp, (taxaCorretaria).replace(',', '.'), imposto)).toFixed(2)
    
        const response = await fetch(`http://localhost:3000/investimentos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({codigo, data, quantidade, valorUnitario, compraOuVenda, taxaCorretaria, valorOp, imposto, valorFinal}),
            headers: {
                'Content-Type': 'application/json'
              }
        })
    
        const investimento = await response.json()
        const indexToRemove = investimentos.findIndex(i => i.id === id)
        investimentos.splice(indexToRemove, 1, investimento)
        document.querySelector(`#row-${id}`).remove()
        renderInvestimento(investimento)
        closeModal()
    } catch(err) {
        inputFields[err.input].classList.add('error')
        alertError(err.input)
    }
    
}

function compararDatas(objeto1, objeto2) {
    const data1 = new Date(objeto1.data.split("/").reverse().join("/"));
    const data2 = new Date(objeto2.data.split("/").reverse().join("/"));

    if (data1 < data2) {
    return -1;
    } else if (data1 > data2) {
    return 1;
    } else {
    return 0;
    }
}

async function fetchInvestimento() {
    return await fetch('http://localhost:3000/investimentos').then(res => res.json())
}

async function setup() {
    const results = await fetchInvestimento()
    investimentos.push(...results)
    investimentos.sort(compararDatas)
    investimentos.forEach(renderInvestimento)
}

function openModal() {
    document.getElementById('modal').classList.add('active')
}

function closeModal() {
    document.getElementById('modal').classList.remove('active')
}

document.addEventListener('DOMContentLoaded', setup)
document.querySelector('form').addEventListener('submit', saveEditInvestiment)
document.querySelector('.modal-close').addEventListener('click', closeModal)

