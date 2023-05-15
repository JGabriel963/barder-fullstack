let investimentos = []

async function fetchInvestimento() {
    return await fetch('http://localhost:3000/investimentos').then(res => res.json())
}

function createRow(id) {
    const row = document.createElement('tr')
    row.id = `row-${id}`
    return row
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
    `
    document.querySelector('#tableInvest > tbody').appendChild(row)
}

function procurarInvestimento() {
    const code = document.getElementById('codigo').value
    const investiment = investimentos.filter(i => i.codigo === code)
    if (investiment === undefined) {
        alert('Investimento não encontrado!')
    } else {
        console.log(investiment)
        document.querySelector('.modal-code').classList.add('hidden')
        document.querySelector('.records').classList.add('active')
        investiment.forEach(renderInvestimento)
    } 
}

async function setup() {
    const results = await fetchInvestimento()
    investimentos.push(...results)
    console.log(investimentos)
}

document.addEventListener('DOMContentLoaded', setup)

document.getElementById('send-invest').addEventListener('click', procurarInvestimento)