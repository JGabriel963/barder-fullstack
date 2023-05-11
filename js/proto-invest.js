let investimentos = []

function createRow(id) {
    const row = document.createElement('tr')
    row.id = `row-${id}`
    return row
}

async function deleteInvestimento(id) {
    const confirmation = confirm(`Tem certeza que deseja excluir o investimento?`)
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
        <button type="button" class="button red" id="delete" onclick="deleteInvestimento(${investimento.id})">Excluir</button>
    </td>
    `
    document.querySelector('#tableInvest > tbody').appendChild(row)
}



async function fetchInvestimento() {
    return await fetch('http://localhost:3000/investimentos').then(res => res.json())
}


async function setup() {
    const results = await fetchInvestimento()
    investimentos.push(...results)
    investimentos.forEach(renderInvestimento)
}

document.addEventListener('DOMContentLoaded', setup)
