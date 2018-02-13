let image = document.getElementById('image');
let imageForm = document.getElementById('imageForm');
let anger = document.getElementById('anger');
let contempt = document.getElementById('contempt');
let disgust = document.getElementById('disgust');
let fear = document.getElementById('fear');
let happiness = document.getElementById('happiness');
let neutral = document.getElementById('neutral');
let sadness = document.getElementById('sadness');
let surprise = document.getElementById('surprise');
let imageContainer = document.getElementsByClassName('image-container')[0];

let findMax = data => {
    let max = 0;
    let genre = "happiness";
    let list = data[0].faceAttributes.emotion;
    for (let emotion in list) {
        if(list[emotion] > max) {
            max = list[emotion];
            genre = emotion;
        }
    };
    console.log(genre);
}

imageForm.addEventListener('submit', e => {
    
    e.preventDefault();

    let query = image.value;
    let key = '458012e763f04e389f276918ec9d707b';
    let uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';
    imageContainer.style.backgroundImage = "url(" + query + ")"

    let params = {
        'returnFaceAttributes': 'gender,emotion'
    };

    $.ajax({
        
        url: uriBase + '?' + $.param(params),
        
        // Request headers
        beforeSend: xhrObj => {
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", key);
        },

        type: 'POST',

        // Request body
        data: '{"url": ' + '"' + query + '"}'

    })
    .done(data => {
        let emotion = data[0].faceAttributes.emotion;
        anger.innerHTML = data[0].faceAttributes.emotion.anger;
        contempt.innerHTML = data[0].faceAttributes.emotion.contempt;
        disgust.innerHTML = data[0].faceAttributes.emotion.disgust;
        fear.innerHTML = data[0].faceAttributes.emotion.fear;
        happiness.innerHTML = data[0].faceAttributes.emotion.happiness;
        neutral.innerHTML = data[0].faceAttributes.emotion.neutral;
        sadness.innerHTML = data[0].faceAttributes.emotion.sadness;
        surprise.innerHTML = data[0].faceAttributes.emotion.surprise;
        findMax(data);
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR);
    });

});