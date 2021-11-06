const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isJumping = false
let position = 0
let isGameStarted = false
let isGameOver = false

function pular(event) {
	if (event.keyCode === 32) {
		if (!isGameStarted) {
			createCactus()
		} else {
			if (!isJumping) {
				jump()
			}
		}
	}
}

function jump() {
	isJumping = true

	let upInterval = setInterval(() => {
		if (position >= 150) {
			clearInterval(upInterval)

			//descendo
			let downInterval = setInterval(() => {
				if (position <= 0) {
					clearInterval(downInterval)
					isJumping = false
				} else {
					position -= 20
					dino.style.bottom = position + 'px'
				}
			}, 20)
		} else {
			// Subindo
			position += 20
			dino.style.bottom = position + 'px'
		}
	}, 20)
}

function createCactus() {
	isGameStarted = true
	const cactus = document.createElement('div')
	let cactusPosition = screen.width
	let randomTime = Math.random() * 6000

	cactus.classList.add('cactus')
	cactus.style.left = screen.width - 50 + 'px'
	background.appendChild(cactus)
	console.log('createCactus')

	let leftInterval = setInterval(() => {
		cactusPosition -= 10
		cactus.style.left = cactusPosition + 'px'

		if (cactusPosition < -60) {
			clearInterval(leftInterval)
			background.removeChild(cactus)
		} else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
			// Game Over
			console.log('isGameOver')
			isGameOver = true
			cactus
			clearInterval(leftInterval)
			document.body.innerHTML =
				'<h1 id="over" class="game-over">Fim de jogo</h1><br><center><button onClick="location.reload()">Reiniciar</button></center>'
		} else {
			cactusPosition -= 10
			cactus.style.left = cactusPosition + 'px'
		}
	}, 20)

	console.log(isGameOver)

	if(isGameOver === false) {
	setTimeout(createCactus, randomTime) }
}

document.addEventListener('keypress', pular)