console.log("test ....");

// Importing Elements from DOM & Setting APIs
let myJoke = "";
const URL = "https://v2.jokeapi.dev/joke/dark";
const jokeText = document.getElementById("joketext");
const loadJoke = document.getElementById("loadjoke");
const loadTTS = document.getElementById("loadtts");
const loaderBox = document.getElementById("loader");
const ttsdata = document.getElementById("ttsdata");

function loading() {
  loaderBox.style.display = "block";
  jokeText.style.display = "none";
}

// Hide Loading
function complete() {
  loaderBox.style.display = "none";
  jokeText.style.display = "block";
}

// Function to get Joke
async function getJoke() {
  try {
    loading();
    const response = await fetch(URL);
    const jokeData = await response.json();
    jokeData.type === "single"
      ? (myJoke = jokeData.joke)
      : (myJoke = jokeData.setup + "\n" + jokeData.delivery);
    jokeText.textContent = myJoke;
    complete();
  } catch (error) {
    console.log("Error with Jokes API", error);
  }
}

// Function to get TTS of Joke
async function getSpeech() {
  const text = myJoke;
  const url = `https://text-to-speech27.p.rapidapi.com/speech?text=${text}&lang=en-us`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "950a381ac9msh261428ef97b1b72p11c7e1jsn022e6861c4c9",
      "X-RapidAPI-Host": "text-to-speech27.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const audioBlob = await response.blob();

    const audioUrl = window.URL.createObjectURL(audioBlob); // Use Blob constructor

    ttsdata.src = audioUrl;
    ttsdata.play();
  } catch (error) {
    console.error(error);
  }
}

//getSpeech("This is test message");

// Add event listener to "Read it Loud Button"
loadTTS.addEventListener("click", getSpeech);

// Add event listener to "Tell me a Joke Button"
loadJoke.addEventListener("click", getJoke);
getJoke();
