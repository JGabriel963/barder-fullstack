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
    <td>R$${investimento.media}</td>
    `
    document.querySelector('#tableInvest > tbody').appendChild(row)
}

function procurarInvestimento() {
    const code = document.getElementById('codigo').value
    const investiment = investimentos.filter(i => i.codigo === code)
    if (investiment === undefined) {
        alert('Investimento não encontrado!')
        return
    } else {
        console.log(investiment)
        document.querySelector('.modal-code').classList.add('hidden')
        document.querySelector('.records').classList.add('active')
        investiment.forEach(renderInvestimento)
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

async function setup() {
    const results = await fetchInvestimento()
    investimentos.push(...results)
    investimentos.sort(compararDatas)
    console.log(investimentos)

}

function newInvestimento() {
    document.querySelector('.modal-code').classList.remove('hidden')
    document.querySelector('.records').classList.remove('active')
    document.getElementById('codigo').value = ""
    document.querySelectorAll('tbody > tr').forEach(el => el.remove())
}

document.addEventListener('DOMContentLoaded', setup)
document.getElementById('new-code').addEventListener('click', newInvestimento)
document.getElementById('send-invest').addEventListener('click', procurarInvestimento)
