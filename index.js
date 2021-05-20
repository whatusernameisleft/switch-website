const welcome = document.querySelector('.welcome')
const welcomeDiv = document.querySelector('.welcomeDiv')
const cells = document.getElementsByTagName('td')
const interfaceContainer = document.querySelector('.interfaceContainer')
const tableContainer = document.querySelector('.tableContainer')

const onLoadTl = new TimelineMax()
const onSubmitTl = new TimelineMax({
    paused: true
})

const data = {
    "coca cola secret ingredient": {
        "source": "The Coca-Cola Company",
        "value": "Cocaina",
        "status": "CONFIDENTIAL"
    },
    "kfc 11 herbs and spices": {
        "source": "KFC",
        "value": "**************************************",
        "status": "CONFIDENTIAL"
    }
}

onLoadTl.fromTo(welcome, 3, {
    opacity: 0
}, {
    opacity: 100,
    ease: Power2.easeInOut
}, '+=1').fromTo(welcomeDiv, 3, {
    y: '0%'
}, {
    y: '-200%',
    ease: Power2.easeInOut
}, '-=2')

onSubmitTl.to(interfaceContainer, 1, {
    y: '-10%'
}).to(tableContainer, 3, {
    opacity: 100,
    ease: Power2.easeInOut
}, '-=1')

$(() => {
    $('.searchbar').keypress(e => {
        if (e.which != 13) return;

        for (let cell of cells) {
            cell.innerHTML = data[$('.searchbar').val()][cell.className]
        }

        onSubmitTl.play()
    })
})