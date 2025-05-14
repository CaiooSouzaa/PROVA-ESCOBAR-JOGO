const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let h1 =document.querySelector("h1")

const size = 30
const cobra = [
    { x: 270, y: 240 }
]

const randomNumber = (min, max) =>{
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () =>{
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number/30) * 30
}  

//FUNÇÃO PARA GERAR CORES ALEATORIAS
const randomColor = () =>{
    const red = randomNumber(0 ,255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

const pontos = {
    x: randomPosition(), 
    y:randomPosition(), 
    color: randomColor()
}

let direcao, loopId

//FUNÇÃO QUE CRIA COMIDA 
const drawPontos = () =>{

    const {x, y, color} = pontos

    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0

}
// FUNÇÃO QUE DESENHA A COBRA
const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    cobra.forEach((posicao, index) => {

        if (index == cobra.length - 1) {
            ctx.fillStyle = "white"
        }
        ctx.fillRect(posicao.x, posicao.y, size, size)
    })
}

//FUNÇÃO PARA MOVER A COBRA
const moveSnake = () => {
    if (!direcao) return
    const cabeca = cobra[cobra.length - 1]

    if (direcao == "right") {
        cobra.push({ x: cabeca.x + size, y: cabeca.y })
    }
    if (direcao == "left") {
        cobra.push({ x: cabeca.x - size, y: cabeca.y })
    }
    if (direcao == "down") {
        cobra.push({ x: cabeca.x, y: cabeca.y + size })
    }
    if (direcao == "up") {
        cobra.push({ x: cabeca.x, y: cabeca.y - size })
    }

    cobra.shift()
}

//DESENHAR O GRID
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

//CHECAR SE COMEU O PONTO
const checkEat = () =>{
    
}

//LOOP DA COBRA 
const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawPontos()
    drawSnake()
    moveSnake()

    loopId = setTimeout(() => {
        gameLoop()
    }, 150)


}



h1.innerText = randomColor()
gameLoop()

//AÇÃO DE CADA BOTÃO AO SER APERTADO
document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direcao != "left") {
        direcao = "right"
    }
    if (key == "ArrowLeft" && direcao != "right") {
        direcao = "left"
    }
    if (key == "ArrowDown" && direcao != "up") {
        direcao = "down"
    }
    if (key == "ArrowUp" && direcao != "down") {
        direcao = "up"
    }

})


