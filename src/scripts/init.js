import Chromata from './chromata';

// const imageUrl = 'assets/images/face.jpg';
let chromata, allAssets

function doit(cb) {
    let picker = randomIntFromInterval(0, 2)
    let angle = randomIntFromInterval(1, 6)
    let origin = randomIntFromInterval(1, 6)
    let offset = origin == 0 ? ["left"]: 
                 origin == 1? ["right"]: 
                 origin == 2? ["top"]: 
                 origin == 3? ["bottom"]: 
                 origin == 4? [(randomIntFromInterval(0, 100) + "% " + randomIntFromInterval(0, 100) + "%" )]:
                 [(randomIntFromInterval(0, 100) + "% " + randomIntFromInterval(0, 100) + "%" ), (randomIntFromInterval(0, 100) + "% " + randomIntFromInterval(0, 100) + "%" )]
    var image = document.querySelector('#image'),
        // chromata;


        chromata = new Chromata(image, {
            pathFinderCount: randomIntFromInterval(1, 300), //300,
            speed: randomIntFromInterval(1, 10), //10,
            turningAngle: angle == 0 ? 2* Math.PI : 
                          angle == 1 ? 3* Math.PI/2 : 
                          angle == 2 ? Math.PI : 
                          angle == 3 ? Math.PI/2 : 
                          angle == 4 ? Math.PI/4 : 
                          angle == 5 ? Math.PI/8 : 
                          Math.PI/32,
            colorMode: randomIntFromInterval(0, 1) == 0 ? 'color' : 'greyscale', //'color',
            lineWidth: randomIntFromInterval(1, 5),
            lineMode: picker == 0 ? 'smooth' : picker == 1 ? 'point' : 'square',
            compositeOperation: 'lighten',
            origin: offset,
            outputSize: 'container', // original, container
            key: randomIntFromInterval(0, 1) == 0 ? 'low' : 'high', // 'low',
            backgroundColor: 'hsla(34, 70%, 70%, 0)'
        });
        
        chromata.start();
        return cb()
}


document.querySelector('#image2').addEventListener('click', e => {
    restart()
});

function getAssets(cb) {
    var settings = {
        "url": "https://api.opensea.io/api/v1/assets?owner="+(getParameterByName("address") || "0xfa69c694e74d67f41dc41063ad8867d458ea3f1a")+"&order_direction=desc&offset=0&limit=50",
        "method": "GET",
        "timeout": 0
      };
      
      $.ajax(settings).done(function (response) {
        return cb(response)
      });
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function restart() {
    let assetIndex = randomIntFromInterval(0, allAssets.length -1)
    let collectionName = allAssets[assetIndex].asset_contract.name
    let assetName = allAssets[assetIndex].name || collectionName + " #" + allAssets[assetIndex].token_id
    if (allAssets[assetIndex].image_url.includes('.mp4')) {
        assetIndex = assetIndex + 1
        return setTimeout(function () {restart()}, 1000)
    }
    if (!(allAssets[assetIndex].image_url || allAssets[assetIndex].collection.featured_image_url || allAssets[assetIndex].collection.image_url)) {
        return restart()
    }
    $("#image").attr('src', allAssets[assetIndex].image_url || allAssets[assetIndex].collection.featured_image_url || allAssets[assetIndex].collection.image_url )
    $("#image2").attr('src', allAssets[assetIndex].image_url || allAssets[assetIndex].collection.featured_image_url || allAssets[assetIndex].collection.image_url )
    $(".name").text("Name: "+assetName)
    $(".collection").text("Collection: "+collectionName)
    // assetIndex = assetIndex + 1
    setTimeout(() => {
        $("#chromataCanvas").remove()
        if ($("#chromataCanvas")) {
            $("#chromataCanvas").remove()
        }
        setTimeout(() => {
            doit(()=>{
                setTimeout(()=>{
                    resize()
                }, 50)                
            })
        }, 50);
    }, 50);
}

function resize() {
    if (!$("#chromataCanvas").offset()) {
        setTimeout(()=>{resize()}, 500)
    }
    $("#image2").css('max-width','unset')
    $("#image2").width($("#chromataCanvas").width())
    $("#image2").height($("#chromataCanvas").height())
    $("#image2").css('position','absolute')
    $("#image2").css('left',$("#chromataCanvas").offset().left)
    $("#image2").css('top',$("#chromataCanvas").offset().top)
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

window.restart = restart
window.doit = doit
window.randomIntFromInterval = randomIntFromInterval

getAssets(assets => {
    allAssets = assets.assets
    console.log("--------------------------------", assets)
    restart()
})
// setInterval(() => {
//     restart()
// }, 150000)



