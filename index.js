const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

let h1 = document.querySelector("h1")

const size = 30

const posicaoInicial =  { x: 270, y: 240 }

let cobra = [posicaoInicial]

const img = new Image()
img.src = "bolsonaro.png"

const img2 = new Image()
img2.src = "comuna.png"

//INCREMENTA PONTOS
const incrementScore = () =>{
    score.innerText = parseInt(score.innerText) + 1
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

//FUNÇÃO PARA GERAR CORES ALEATORIAS
const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

//CONFIGURAÇÃO PARA GERA PONTOS ALEATORIOS E DE CORES ALEATORIAS
const pontos = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direcao, loopId

//FUNÇÃO QUE CRIA COMIDA 
const drawPontos = () => {

    const { x, y, color } = pontos

    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillStyle = color
    ctx.drawImage(img2, x, y, size, size)
    ctx.shadowBlur = 0

}
// FUNÇÃO QUE DESENHA A COBRA
const drawSnake = () => {
    
    cobra.forEach((posicao, index) => {
        if(index === cobra.length - 1){
            ctx.drawImage(img,posicao.x, posicao.y, size, size)
        }else{
            ctx.drawImage(img2,posicao.x, posicao.y, size, size)
        }
        
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
const checkEat = () => {
    const cabeca = cobra[cobra.length - 1]

    if (cabeca.x == pontos.x && cabeca.y == pontos.y) {
        incrementScore()
        cobra.push({x: pontos.x, y: pontos.y})

        let x = randomPosition()
        let y = randomPosition()

        while (cobra.find((posicao) => posicao.x == x && posicao.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }

        pontos.x = x
        pontos.y = y
        pontos.color = randomColor()
    }
}


//FUNÇÃO DE COLISSÕES
const checkCollision = () =>{
    const cabeca = cobra[cobra.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = cobra.length - 2

    const wallCollision = cabeca.x < 0 || cabeca.x > canvasLimit || cabeca.y < 0 || cabeca.y > canvasLimit

    const selfCollision = cobra.find((posicao, index) =>{
        return index < neckIndex && posicao.x == cabeca.x && posicao.y == cabeca.y
    })

    if(wallCollision || selfCollision){
       gameOver()
    }
}

//FUNÇÃO DE GAME OVER
const gameOver = () =>{
    console.log('chama')
    direcao = undefined

    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)" 
}

//LOOP DA COBRA 
const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawPontos()
    moveSnake()
    drawSnake()
    checkEat()
    checkCollision()
    
    loopId = setTimeout(() => {
        gameLoop()
    }, 150)
}

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

buttonPlay.addEventListener("click", () =>{
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
    
    cobra = [posicaoInicial]
})
