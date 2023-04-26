const minmaps = 3

const maps = [
    {title: 'anubis', img: 'anubis.jpg'},
    {title: 'agency', img: 'agency.jpg'},
    {title: 'ancient', img: 'ancient.jpg'},
    {title: 'cache', img: 'cache.jpg'},
    {title: 'cobblestone', img: 'cobblestone.jpg'},
    {title: 'dust2', img: 'dust2.jpg'},
    {title: 'inferno', img: 'inferno.jpg'},
    {title: 'mirage', img: 'mirage.jpg'},
    {title: 'nuke', img: 'nuke.jpg'},
    {title: 'office', img: 'office.jpg'},
    {title: 'overpass', img: 'overpass.jpg'},
    {title: 'train', img: 'train.jpg'},
    {title: 'tuscan', img: 'tuscan.jpg'},
    {title: 'vertigo', img: 'vertigo.jpg'},
]
let chosen = []
let notbanned = []

function compare(a, b) {
    if ( a.title < b.title ){
        return -1;
    }
    if ( a.title > b.title ){
        return 1;
    }
    return 0;
}
maps.sort(compare);



const mapsChooseDiv = document.querySelector('.maps-choose')
const mapsBanDiv = document.querySelector('.maps-ban')

maps.map(map => {
    mapsChooseDiv.innerHTML += `<div class="map ${map.title}" onClick="addMap('${map.title}', '${map.img}')" style="background-image: url('img/${map.img}'"><div class="map-title">${map.title}</div></div>`
})

function randombg(){
    let random = Math.floor(Math.random() * 3) + 1
    document.body.style.backgroundImage = `url('img/bg${random}.jpg')`
}
randombg()

function addMap(title, img){
    const div = document.querySelector(`.${title}`)
    if(chosen.find(x => x.title == title)){
        let i = chosen.findIndex(x => x.title == title)
        chosen.splice(i, 1)
        div.classList.remove('active')
    }
    else{
        chosen.push({title: title, img: img})
        div.classList.add('active')
    }
    checkNext()
}

function checkNext(){
    let btn = document.querySelector('.header-btn')
    if(chosen.length >= minmaps){
        if(btn.className.includes('active')) return
        btn.classList.add('active')
    }
    else{
        btn.classList.remove('active')
    }
}



let stage = 1
let team = 1
let isChosen = false

function nextStage(){
    let len = chosen.length
    let stage1 = document.querySelector('.stage1')
    if(stage == 1){
        if(len >= minmaps){
            chosen.sort(compare);
            stage1.style.marginLeft = "-100vw"
            if(len < 4){
                mapsBanDiv.classList.add('maps-ban-flex')
            }
            notbanned = chosen
            generateBanMaps()
        }
    }
    else if(stage == 2){
        stage1.style.marginLeft = "-200vw"
        document.querySelector('.result').style.backgroundImage = `url('img/${notbanned[0].img}')`
        document.querySelector('.result-container').innerHTML = `CHOSEN MAP IS ${notbanned[0].title}!`
    }
}

function generateBanMaps(){
    chosen.map(map => {
        mapsBanDiv.innerHTML += `<div class="map ban-map ban-${map.title}" onClick="banMap('${map.title}')" style="background-image: url('img/${map.img}'"><div class="map-title">BAN ${map.title}</div></div>`
    })
}

function banMap(title){
    const div = document.querySelector(`.ban-${title}`)
    if(notbanned.length > 1){
        if(notbanned.find(x => x.title == title)){
            let i = chosen.findIndex(x => x.title == title)
            chosen.splice(i, 1)
            div.classList.add('banned')
            div.firstChild.innerHTML = 'BANNED'
            changeTeam()
            if(notbanned.length == 1){
                stage = 2
                nextStage()
            }
        }
    }
}

function changeTeam(){
    const div = document.querySelector('.ban-title')
    if(team == 1) team = 2
    else if(team == 2) team = 1
    console.log(team)
    div.innerHTML = `TEAM ${team} BANNING`
}