// Create continuously floating hearts and flowers
function createFloatingElements() {
    setInterval(() => {
        const element = document.createElement('div');
        element.classList.add(Math.random() > 0.5 ? 'heart' : 'flower');
        element.innerHTML = Math.random() > 0.5 ? '❤️' : '🌸';
        element.style.left = Math.random() * 100 + "vw";
        element.style.bottom = "-10vh";
        element.style.fontSize = Math.random() * 20 + 20 + "px";
        element.style.animationDuration = Math.random() * 4 + 3 + "s";
        document.querySelector('.background').appendChild(element);

        // Remove element after animation to prevent memory buildup
        setTimeout(() => element.remove(), 6000);
    }, 500);
}
createFloatingElements();

let questionIndex = 0;
const questions = [
    { text: "How much do you love me? ❤️", options: ["More than the stars ✨", "Infinity and beyond 🚀"] },
    { text: "What’s your favorite thing about me? 💕", options: ["Your kindness 😊", "Your smile 😍"] },
    { text: "If we could travel anywhere, where would we go? ✈️", options: ["Paris 🇫🇷", "Japan 🇯🇵"] },
    { text: "What’s the best thing about our love? 💖", options: ["We never give up 💪", "We're always happy together 😊"] },
    { text: "What’s your favorite moment with me? 😍", options: ["Our late-night talks 🌙", "Every time you smile at me 😊"] },
    { text: "What’s one promise you’ll always keep for me? 💍", options: ["I’ll always love you ❤️", "I’ll always be by your side 🤝"] }
];

function nextQuestion(index) {
    if (index >= questions.length) {
        document.getElementById("questionBox").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("questionBox").style.display = "none";
            document.getElementById("envelope").style.display = "block";
        }, 500);
    } else {
        const questionBox = document.getElementById("questionBox");
        questionBox.style.opacity = "0";
        
        setTimeout(() => {
            document.getElementById("questionText").innerText = questions[index].text;
            const buttons = questionBox.getElementsByTagName("button");
            buttons[0].innerText = questions[index].options[0];
            buttons[1].innerText = questions[index].options[1];
            buttons[0].setAttribute("onclick", `nextQuestion(${index + 1})`);
            buttons[1].setAttribute("onclick", `nextQuestion(${index + 1})`);
            
            questionBox.style.opacity = "1";
        }, 500);
    }
}

function openEnvelope() {
    document.getElementById("envelope").style.display = "none";

    // Create animated flower element
    const flower = document.createElement("div");
    flower.innerHTML = "🌸";
    flower.style.fontSize = "80px";
    flower.style.position = "fixed";
    flower.style.top = "50%";
    flower.style.left = "50%";
    flower.style.transform = "translate(-50%, -50%) scale(0.5)";
    flower.style.opacity = "0";
    flower.style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out";

    document.body.appendChild(flower);

    // Show the flower with animation
    setTimeout(() => {
        flower.style.opacity = "1";
        flower.style.transform = "translate(-50%, -50%) scale(1)";
    }, 100);

    // Fade out flower before showing message
    setTimeout(() => {
        flower.style.opacity = "0";
        flower.style.transform = "translate(-50%, -50%) scale(1.5)";
    }, 2000);

    // After 3 seconds, remove the flower and fade in the message
    setTimeout(() => {
        flower.remove();
        const message = document.getElementById("message");
        message.style.display = "block";
        message.style.opacity = "0";
        setTimeout(() => message.style.opacity = "1", 100);
    }, 3000);
}

// Delay question box appearance for smoother transition
window.onload = function() {
    setTimeout(() => {
        document.getElementById("questionBox").style.display = "block";
    }, 1000);
};
