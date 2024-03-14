$('#valor').mask('#0,00', {reverse: true})

// usd = clp / {clp_usd} || clp = usd * {clp_usd} 
var clp_usd = 946.57

// usd = brl / {brl_usd} || brl = usd * {brl_usd} 
var brl_usd = 5.1443

// brl = clp / {brl_clp} || clp = brl * {brl_clp} 
var brl_clp = clp_usd/brl_usd

const saldoEmDolares = 4000.00
const saldoEmReais = saldoEmDolares * brl_usd
const saldoEmPesos = saldoEmDolares * clp_usd

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
    location.reload()
})

despesa.addEventListener('click', ()=> {
    location.reload()
})