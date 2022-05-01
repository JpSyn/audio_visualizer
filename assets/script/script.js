const numeroBarras = 300;

const audio = document.querySelector("audio");

// Create an audio context
const ctx = new AudioContext();

// Create an audio source
const audioSource = ctx.createMediaElementSource(audio);

// Create an audio analyzer
const analyzer = ctx.createAnalyser();

// Connect the source, to the analyzer, and then back the contet's destinantion
audioSource.connect(analyzer);
audioSource.connect(ctx.destination);

// Print the analyze frequencies
const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
analyzer.getByteFrequencyData(frequencyData);
console.log(frequencyData);

// Get the visualizer container

const visualizerContainer = document.querySelector(".visualizer__container");

// Create a set of pre-defined bars

for(let i = 0; i < numeroBarras; i++) {

    const bar = document.createElement("DIV");
    bar.setAttribute("id", "bar" + i);
    bar.setAttribute("class", "visualizer__bar");
    visualizerContainer.appendChild(bar);
}

// This function has the task to adjust the bar heights according to the frequency data

function renderFrame() {

    // Update out frequency data array with the lastest frequency data
    analyzer.getByteFrequencyData(frequencyData);

    for(let i = 0; i < numeroBarras; i++){

        const index = (i+5)*2;
        const fd = frequencyData[index];

        // Fetch the bar DIV element
        const bar = document.querySelector("#bar" + i);
        if( !bar ) {
            continue;
        }

        const barHeight = Math.max(4, fd || 0);
        bar.style.height = barHeight + "px";

    }
    // At the nest animation frame, call ourselves
    window.requestAnimationFrame(renderFrame);
}

renderFrame();

audio.volume = 0.25;
audio.play();
