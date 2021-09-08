import Chromata from './chromata';

// const imageUrl = 'assets/images/face.jpg';
let chromata, assetIndex = 0, allAssets

function doit() {
    let picker = randomIntFromInterval(0, 2)

    var image = document.querySelector('#image'),
        // chromata;


        chromata = new Chromata(image, {
            pathFinderCount: randomIntFromInterval(1, 300), //300,
            speed: randomIntFromInterval(1, 10), //10,
            turningAngle: 0.5 + Math.PI,
            colorMode: randomIntFromInterval(0, 1) == 0 ? 'color' : 'greyscale', //'color',
            lineWidth: randomIntFromInterval(1, 5),
            lineMode: picker == 0 ? 'smooth' : picker == 1 ? 'point' : 'square',
            compositeOperation: 'lighten',
            origin: ["50% 0%", "50% 99%"],
            outputSize: 'container', // original, container
            key: randomIntFromInterval(0, 1) == 0 ? 'low' : 'high', // 'low',
            backgroundColor: 'hsla(34, 70%, 70%, 0)'
        });
        
    chromata.start();
}


document.querySelector('#image2').addEventListener('click', e => {
    restart()
});

// document.querySelector('#reset').addEventListener('click', e => {
//     chromata.reset();
// });

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

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

function restart() {
    if (assetIndex == 0) {
        assetIndex = assetIndex + 1
        return setTimeout(function () {restart()}, 1000)
    }
    $("#image").attr('src', allAssets[assetIndex].image_url || allAssets[assetIndex].collection.featured_image_url)
    $("#image2").attr('src', allAssets[assetIndex].image_url || allAssets[assetIndex].collection.featured_image_url)
    assetIndex = assetIndex + 1
    setTimeout(() => {
        $("#chromataCanvas").remove()
        setTimeout(() => {
            doit()
        }, 1000);
    }, 1000);
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

getAssets(assets => {
    allAssets = assets.assets
    console.log("--------------------------------", assets)
    restart()
})
// setInterval(() => {
//     restart()
// }, 150000)



