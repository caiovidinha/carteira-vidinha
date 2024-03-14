$('#valor').mask('#0,00', {reverse: true})

// usd = clp / {clp_usd} || clp = usd * {clp_usd} 
var clp_usd = 946.57

// usd = brl / {brl_usd} || brl = usd * {brl_usd} 
var brl_usd = 5.1443

// brl = clp / {brl_clp} || clp = brl * {brl_clp} 
var brl_clp = clp_usd/brl_usd


let SHEET_ID = '1U9FwQ2BaQMYyckjALWL4LrzGFx2CNP0sRDaIbszBLcY'
    let SHEET_TITLE = 'saldo'
    let SHEET_RANGE = 'A1:A2'

    let FULL_URL =
        'https://docs.google.com/spreadsheets/d/' +
        SHEET_ID +
        '/gviz/tq?sheet=' +
        SHEET_TITLE +
        '&range=' +
        SHEET_RANGE

const getSaldos = async () => {
    fetch(FULL_URL)
        .then((res) => res.text())
        .then((rep) => {
            let data = JSON.parse(rep.substr(47).slice(0, -2))
            setSaldos(data.table.rows[0].c[0].v)
        })
} 
getSaldos()

let saldoEmDolares = 0
let saldoEmReais = 0
let saldoEmPesos = 0

const setSaldos = (valor) =>{
    saldoEmDolares = valor
    moedaTopo.innerHTML = 'USD'
    saldo.innerHTML = saldoEmDolares.toFixed(2).toString().replace('.',',')
    flag.innerHTML = '🇺🇸'
    saldoEmReais = saldoEmDolares * brl_usd
    saldoEmPesos = saldoEmDolares * clp_usd
}



const flag = document.querySelector('#flag')
const saldo = document.querySelector('#saldo')
saldo.innerHTML = saldoEmDolares.toFixed(2).toString().replace('.',',')    
const moedaTopo = document.querySelector('#currency-top')
const select = document.querySelector('#moeda')
const valor = document.querySelector('#valor')
const dolar = document.querySelector('#dolar')
const real = document.querySelector('#real')
const peso = document.querySelector('#peso')
const receita = document.querySelector('#receita')
const despesa = document.querySelector('#despesa')
const converter = document.querySelector('#converter')
const changeSaldo = document.querySelector('#change_saldo')
const moedaDisplay = document.querySelector('#display-currency')

changeSaldo.addEventListener('click',()=>{
    if(moedaTopo.innerHTML == 'USD'){
        moedaTopo.innerHTML = 'BRL'
        saldo.innerHTML = saldoEmReais.toFixed(2).toString().replace('.',',')
        flag.innerHTML = '🇧🇷'
    }
    else if(moedaTopo.innerHTML == 'BRL'){
        moedaTopo.innerHTML = 'CLP'
        saldo.innerHTML = saldoEmPesos.toFixed(2).toString().replace('.',',')
        flag.innerHTML = '🇨🇱'
    }else if(moedaTopo.innerHTML == 'CLP'){
        moedaTopo.innerHTML = 'USD'
        saldo.innerHTML = saldoEmDolares.toFixed(2).toString().replace('.',',')
        flag.innerHTML = '🇺🇸'
    }
})

select.addEventListener('change', () => {
    moedaDisplay.innerHTML=select.value
})

converter.addEventListener('click', ()=>{
    converter.classList.add('opacity-50')
    const vc= valor.value
    if(vc){
        switch(moedaDisplay.innerHTML){
            case 'USD':
                dolar.innerHTML = 'USD ' + parseFloat(vc.replace(',','.')).toFixed(2).toString().replace('.',',')
                real.innerHTML = 'BRL ' + (parseFloat(vc.replace(',','.')) * brl_usd).toFixed(2).toString().replace('.',',')
                peso.innerHTML = 'CLP ' + (parseFloat(vc.replace(',','.')) * clp_usd).toFixed(2).toString().replace('.',',')
                break

            case 'BRL':
                dolar.innerHTML = 'USD ' + (parseFloat(vc.replace(',','.')) / brl_usd).toFixed(2).toString().replace('.',',')
                real.innerHTML = 'BRL ' + parseFloat(vc.replace(',','.')).toFixed(2).toString().replace('.',',')
                peso.innerHTML = 'CLP ' + (parseFloat(vc.replace(',','.')) * brl_clp).toFixed(2).toString().replace('.',',')
                break

            case 'CLP':
                dolar.innerHTML = 'USD ' + (parseFloat(vc.replace(',','.')) / clp_usd).toFixed(2).toString().replace('.',',')
                real.innerHTML = 'BRL ' + (parseFloat(vc.replace(',','.')) / brl_clp).toFixed(2).toString().replace('.',',')
                peso.innerHTML = 'CLP ' + parseFloat(vc.replace(',','.')).toFixed(2).toString().replace('.',',')
                break
        }}
    setTimeout(()=> {
        converter.classList.remove('opacity-50')
    },1000)

})

receita.addEventListener('click', ()=> {
    console.log(saldoEmDolares)
    console.log(parseFloat(dolar.innerHTML.replace('USD ','').replace(',','.')))
    // location.reload()
})

despesa.addEventListener('click', ()=> {
    location.reload()
})