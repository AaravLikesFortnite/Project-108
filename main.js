prediction="";
Webcam.set({
width: 350,
height: 300,
image_format:'png',
png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach(camera);


function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src="+data_uri+">";
    });
}

console.log("ml5 version:",ml5.version);

var classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/l8eNhfOAd/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!!!");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data="The prediction is "+prediction;
    var utter_this=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        prediction=result[0].label;
        speak();
        if(result[0].label=="Thumbs Up"){
           document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(result[0].label=="Victory"){
            document.getElementById("update_emoji").innerHTML="&#x270c;";
        }
        if(result[0].label=="Okay"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
    }
}