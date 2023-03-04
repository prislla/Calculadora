/* Aula 15 de JS Aplicacao Calculadora de Media */

let aviso = document.querySelector('#aviso') /* aviso - está embaixo do formulario no html linha 53 */
let formulario = document.querySelector('form') /*seleção do formulário id na linha 12*/

let btnCalcular = document.querySelector('#btnCalcular') /*seleção do botão linha 36*/
let btnLimpar = document.querySelector('#btnLimpar') /*seleção do botão linha 37*/

// selecionar caixas de texto por id
let cxNota1 = document.querySelector('#nota1') /*definição das váriaveis representam os inputs através do id linha */
let cxNota2 = document.querySelector('#nota2')
let cxNota3 = document.querySelector('#nota3')
let cxNota4 = document.querySelector('#nota4')
let cxMedia = document.querySelector('#media')
let cxSituacao = document.querySelector('#situacao')

// CALCULAR MEDIA
function calcularMedia(n1, n2, n3, n4) {
    return (n1 + n2 + n3 + n4) / 4
}

// DEFINIR SITUACAO FINAL COM BASE NA MEDIA
function situacaoFinal(mediaFinal) {
    let situacaoFinal = ''

    if (mediaFinal >= 7) {
        situacaoFinal = 'Muito bem! Aprovado(a)'
    } else if (mediaFinal <= 3) {
        situacaoFinal = 'Deu mole hein! Reprovado(a)'
    } else {
        situacaoFinal = 'Tente outra vez! Recuperação'
    }
    return situacaoFinal
}

// FORMATAR A CAIXA DE SITUACAO FINAL - adiciona e remove classes pra mudar as cores de acordo com a palavra da situação
function formatarSituacao(situacaoFinal) {
    console.log('Situação Final ' + situacaoFinal)
    switch (situacaoFinal) {

        case 'Muito bem! Aprovado(a)':
            cxSituacao.classList.remove('reprovado')
            cxSituacao.classList.remove('recuperacao')
            cxSituacao.classList.add('aprovado')
            console.log('adicionar class aprovado')
            break

        case 'Deu mole hein! Reprovado(a)':
            cxSituacao.classList.remove('aprovado')
            cxSituacao.classList.remove('recuperacao')
            cxSituacao.classList.add('reprovado')
            console.log('adicionar class reprovado')
            break

        case 'Tente outra vez! Recuperação':
            cxSituacao.classList.remove('aprovado')
            cxSituacao.classList.remove('reprovado')
            cxSituacao.classList.add('recuperacao')
            console.log('adicionar class recuperacao')
            break

        default:
            console.log('Situação Indefinida')
    } // fim do switch case

}

// VALIDAR E GERAR FLASH MESSAGE - se um nº1 for menor que zero ou maior que 10 ou nº2 for menor que zero ou maior que 10, vai exibir uma mensagem pra informar um número válido
function validarNumero(numero) { //valida se é negativo ou acima de 10 e faz um aviso atraves de uma mensagem rápida, chamada de flash message
    let num1 = cxNota1.value
    let num2 = cxNota2.value
    let num3 = cxNota3.value
    let num4 = cxNota4.value
    if (num1 < 0 || num1 > 10 || num2 < 0 || num2 > 10 || num3 < 0 || num3 > 10 || num4 < 0 || num4 > 10) {
        formulario.reset() // limpar form 
        aviso.textContent = 'Digite uma nota entre 0.0 e 10.0' //dá um aviso
        aviso.classList.add('alerta') //classe pra colocar cor vermelha
        setTimeout(function () { //função interna setTimeout serve para passar como parametro uma função anonima q vai ser executada após a fração de segundo 2000 representa 2 segundos, define que vai ficar em branco e remove a cor do alerta depois de 2s
            aviso.textContent = ''
            aviso.classList.remove('alerta')
        }, 2000);
    }
}

// CALCULAR A MEDIA APOS O CLICK NO BOTAO, através do escutador
btnCalcular.addEventListener('click', function (e) {
    console.log('Calcular Média')
    // pegar o valor que esta dentro das caixas
    // usar metodo parseFloat p converter string p float
    let nota1 = parseFloat(cxNota1.value) //parseFloat é transformar, pegar o value de cx nota 1 e tranformar num valor float, garantir que terei um numero flutuante, inteiro, etapa fundamental do processo de validação de dados
    let nota2 = parseFloat(cxNota2.value)
    let nota3 = parseFloat(cxNota3.value)
    let nota4 = parseFloat(cxNota4.value)
    let media = calcularMedia(nota1, nota2, nota3, nota4)

    console.log(nota1)
    console.log(nota2)
    console.log(nota3)
    console.log(nota4)
    console.log(media)

    if (isNaN(media) || media < 0) { //faz verificação se a media n for numero ou menor que zero, escrevo na caixa de verificação nao é um numero
        console.log("Não é um número")
        cxSituacao.value = ''
    } else {
        cxMedia.value = parseFloat(media) //pego a media e coloca como ponto flutuante
        cxSituacao.value = situacaoFinal(media)
        formatarSituacao(situacaoFinal(media)) //faz formatação com a cor, a partir da formatar situação
    }
    e.preventDefault()
})

// APOS LIMPAR TIRAR AS CLASS DA CX SITUACAO - nao faz so reset, ele faz outras tarefas, remove as classes pra evitar que fique colorido depois que limpa
btnLimpar.addEventListener('click', function () {
    cxSituacao.classList.remove('aprovado')
    cxSituacao.classList.remove('reprovado')
    cxSituacao.classList.remove('recuperacao')
})