import Chromata from './chromata';

const imageUrl = 'assets/images/face.jpg';
let chromata

function doit(){
    let picker = randomIntFromInterval(0,2)
 
    var image = document.querySelector('#image'),
    // chromata;

    
    chromata = new Chromata(image, {
        pathFinderCount: randomIntFromInterval(1,300), //300,
        speed: randomIntFromInterval(1,10), //10,
        turningAngle: 0.5+Math.PI,
        colorMode: randomIntFromInterval(0, 1) == 0 ? 'color': 'greyscale', //'color',
        lineWidth: randomIntFromInterval(1, 5),
        lineMode: picker == 0 ? 'smooth': picker == 1 ? 'point' : 'square',
        compositeOperation: 'lighten',
        origin: ["50% 0%","50% 99%"],
        outputSize: 'container', // original, container
        key: randomIntFromInterval(0, 1) == 0 ? 'low': 'high', // 'low',
        backgroundColor: 'hsla(34, 70%, 70%, 0)'
    });
    chromata.start();
}


document.querySelector('#toggle').addEventListener('click', e => {
    restart()
});

// document.querySelector('#reset').addEventListener('click', e => {
//     chromata.reset();
// });

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function restart(){
    $("#image").attr('src', 'https://lh3.googleusercontent.com/ZcpT03zYd2bVTHi4ZECb5qRC06rtUg-L5q3Ee0B8ge7CLOy5_6y82vaVzkycu8nteqlOMx9wyj3zw_ypb2UT9p5LBXR717BskiTrDjs=w600')
    setTimeout(() =>{
        $("#chromataCanvas").remove()
        setTimeout(() =>{
            doit()
        }, 1000);
    }, 1000);
  }

window.doit = doit
doit()
setInterval(() => {
    restart()    
}, 150000)



