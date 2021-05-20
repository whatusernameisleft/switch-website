const vidContainer = document.querySelector('.vidContainer')
const vid = document.querySelector('.switchIntroVid')
const accountButton = $('.accountButton')
const closeButton = $('.closeButton')
const inputContainer = $('.inputContainer')
const input = $('.input')
const account = $('.account')
const formContainer = $('.formContainer')
const cokeInput = $('.coke')
const kfcInput = $('.kfc')
const switchContainer = $('.switchContainer')
const buttons = $('.button')
const screen = $('.screen')
const resetButton = $('.capture')
const startButton = $('.home')
const accessGranted = $('.accessGranted')
const continueText = $('.continue')
const countdown = $('.countdown')

const loginId = 'dQw4w9WgXcQ'
const data = {
    coke: 'Cocaina',
    kfc: '**************************************'
}
const buttonIcons = {
    arrow: {
        UP: 'arrow_upward',
        RIGHT: 'arrow_forward',
        DOWN: 'arrow_downward',
        LEFT: 'arrow_back'
    }, 
    letter: {
        X: 'X',
        A: 'A',
        B: 'B',
        Y: 'Y'
    }
}

const code = []
const konamiCode = ['UP', 'UP', 'DOWN', 'DOWN', 'LEFT', 'RIGHT', 'LEFT', 'RIGHT', 'B', 'A']
let unlocked = false

const onLoadTl = new TimelineMax()
const onLoginTl = new TimelineMax({
    paused: true
})
const switchTl = new TimelineMax({
    paused: true
})

onLoadTl.to(vidContainer, 2, {
    opacity: 0,
    display: 'none',
    ease: Power2.easeInOut
}, '+=1')

$(() => {
    closeButton.hide()
    formContainer.hide()
    switchContainer.hide()
    accessGranted.hide()
    continueText.hide()
    countdown.hide()

    accountButton.on('click', () => {
        account.addClass('open')
        accountButton.fadeOut()
        closeButton.fadeIn(500)
        inputContainer.fadeIn(500)
    })

    closeButton.on('click', () => {
        account.removeClass('open')
        closeButton.fadeOut(500)
        inputContainer.fadeOut(500)
        accountButton.fadeIn()
    })

    buttons.on('click', button => {
        if (!unlocked) return showPressed(button)
        if (button.target.id != 'X') return;
        continueText.hide()
        countdown.show()
        let time = 5
        let interval = setInterval(() => {
            countdown.html(time--)
            if (time < 0) endTimer(interval)
        }, 1000)
    })

    resetButton.on('click', () => {
        screen.empty()
        code.length = 0
    })

    startButton.on('click', () => {
        if (JSON.stringify(code) != JSON.stringify(konamiCode)) return

        accessGranted.show()
        setTimeout(() => {
            accessGranted.hide()
            screen.empty()
            code.length = 0
            screen.css('background-color', 'rgb(0, 255, 0)')
            continueText.show()
            unlocked = true
        }, 500)
    })
})

onLoginTl.to(accountButton, 1, {
    y: '-430%',
    ease: Power2.easeInOut
}, '+=0.1')

function login() {
    if (input.val() != loginId) return

    account.removeClass('open')
    closeButton.fadeOut(500)
    inputContainer.fadeOut(500)
    accountButton.fadeIn()

    onLoginTl.play()
    formContainer.fadeIn(3000)
}

switchTl.from(switchContainer, 3, {
    y: '30%',
    opacity: 0
}, {
    y: '0%',
    opacity: 100,
    ease: Power2.easeInOut
}, '-=1')

function submit() {
    if (cokeInput.val() != data.coke || kfcInput.val() != data.kfc) return

    formContainer.fadeOut(500)
    accountButton.fadeOut(500)
    switchContainer.fadeIn()
    switchTl.play()
}

function getIcon(type, id) {
    return buttonIcons[type][id]
}

function makeSpan(type, icon) {
    if (type == 'arrow') return `<span class="material-icons">${icon}</span>`
    if (type == 'letter') return `<span class="letter-icons">${icon}</span>`
}

function showPressed(button) {
    const type = button.target.classList.item(1)
    const id = button.target.id
    const icon = getIcon(type, id)
    const span = makeSpan(type, icon)
    screen.append(span)
    code.push(id)
}

function endTimer(interval) {
    clearInterval(interval)
    countdown.hide()
}