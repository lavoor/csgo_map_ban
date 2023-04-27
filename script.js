const minmaps = 3

const maps = [
    {title: 'anubis', img: 'anubis.webp'},
    {title: 'agency', img: 'agency.webp'},
    {title: 'ancient', img: 'ancient.webp'},
    {title: 'cache', img: 'cache.webp'},
    {title: 'cobblestone', img: 'cobblestone.webp'},
    {title: 'dust2', img: 'dust2.webp'},
    {title: 'inferno', img: 'inferno.webp'},
    {title: 'mirage', img: 'mirage.webp'},
    {title: 'nuke', img: 'nuke.webp'},
    {title: 'office', img: 'office.webp'},
    {title: 'overpass', img: 'overpass.webp'},
    {title: 'train', img: 'train.webp'},
    {title: 'tuscan', img: 'tuscan.webp'},
    {title: 'vertigo', img: 'vertigo.webp'},
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
    document.body.style.backgroundImage = `url('img/bg${random}.webp')`
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
    let stage2 = document.querySelector('.stage2')
    if(stage == 1){
        if(len >= minmaps){
            chosen.sort(compare);
            stage2.style.display = 'block'
            stage1.style.marginLeft = "-100vw"
            if(len < 4){
                mapsBanDiv.classList.add('maps-ban-flex')
            }
            notbanned = chosen
            generateBanMaps()
            setTimeout(function(){
                stage1.style.display = 'none'
                stage1.style.marginLeft = "0vw"
            }, 500)
        }
    }
    else if(stage == 2){
        let result = document.querySelector('.result')
        stage2.style.marginLeft = "-100vw"
        result.style.backgroundImage = `url('img/${notbanned[0].img}')`
        result.style.display = 'block'
        document.querySelector('.result-container').innerHTML = `CHOSEN MAP IS ${notbanned[0].title}!`
        setTimeout(function(){
            stage2.style.display = 'none'
            stage2.style.marginLeft = "0vw"
        }, 500)
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