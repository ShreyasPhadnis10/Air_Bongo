const modelParams = {
    flipHorizontal: true,
    imageScaleFactor: 0.7,
    maxNumBoxes: 1,
    iouThreshold:0.5,
    scoreThreshold: 0.79,
}

// getting various webcams for different browsers 
//not important as such 

navigator.getUserMedia = navigator.getUserMedia || 
navigator.webkitGetUserMedia || navigator.mozGetUserMedia  || navigator.msGetUserMedia

const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
let model;

//starting webcam

handTrack.startVideo(video).then(status => {

    if(status){
        navigator.getUserMedia({video: {} } , stream => {
            video.srcObject = stream;
          
            setInterval(detect, 100)
        },
        err => console.log(err) )
    }
    
})

function detect () {
  model.detect(video).then(predictions => {
    if(predictions.length !== 0){
        let hand1 = predictions[0].bbox;
        let x = hand1[0];
        let y = hand1[1];
        console.log(x)

    if(y > 500){
       if(x < 200){
           audio.src = "bongo1.wav"
       }

       else if(x > 400){
           audio.src = "bongo2.wav"
       }

       else if (x > 300){
           audio.src = "bongo3.wav"
       }

       else if (x > 200){
           audio.src = "single_bonga.wav"
       }

       
    }
    audio.play();
    }
  })
}

handTrack.load(modelParams).then(Lmodel => {
    model = Lmodel;
})