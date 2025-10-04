const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let dots = [];
const numDots = 200;

function init() {
    handleResize();
    dots = [];

    for (let i = 0; i < numDots; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
        });
    }
    document.getElementById('terminalInput').focus();
    animate();
    setTimeout(() => {
        showHelp();
    }, 1);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > canvas.width) {
            dot.vx = -dot.vx;
        }

        if (dot.y < 0 || dot.y > canvas.height) {
            dot.vy = -dot.vy;
        }

        drawDot(dot.x, dot.y, 2, '#151515');
    }

    connectDots();

    requestAnimationFrame(animate);
}

function drawDot(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function connectDots() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const distance = Math.sqrt((dots[i].x - dots[j].x) ** 2 + (dots[i].y - dots[j].y) ** 2);
            if (distance < 90) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = 'rgba(15, 15, 15, 0.2)';
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function handleResize() {
    const infoBox = document.getElementById('infoBox');
    
    if (infoBox.offsetTop < document.querySelector('.navbar').offsetHeight) {
        infoBox.style.top = document.querySelector('.navbar').offsetHeight + 'px';
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    dots.forEach((dot) => {
        dot.x = Math.random() * canvas.width;
        dot.y = Math.random() * canvas.height;
    });
}

window.addEventListener('resize', handleResize);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
init();


let isDragging = false;
let offsetX, offsetY;

document.getElementById('handle').addEventListener('mousedown', startDrag);
document.addEventListener('mouseup', stopDrag);
document.addEventListener('mousemove', drag);

function startDrag(e) {
    isDragging = true;
    const infoBox = document.getElementById('infoBox');
    offsetX = e.clientX - infoBox.getBoundingClientRect().left;
    offsetY = e.clientY - infoBox.getBoundingClientRect().top;
    infoBox.style.transition = 'none';
}

function stopDrag() {
    isDragging = false;
    const infoBox = document.getElementById('infoBox');
    infoBox.style.transition = '';
}

function drag(e) {
    if (isDragging) {
        const infoBox = document.getElementById('infoBox');

        let left = e.clientX - offsetX;
        let top = e.clientY - offsetY;

        left = Math.max(0, Math.min(window.innerWidth - infoBox.offsetWidth, left));
        top = Math.max(0, Math.min(window.innerHeight - infoBox.offsetHeight, top));

        top = Math.max(document.querySelector('.navbar').offsetHeight, top);

        infoBox.style.left = left + 'px';
        infoBox.style.top = top + 'px';
    }
}

document.getElementById('socialsBox').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        window.open(event.target.href, '_blank');
    }
});

document.getElementById('socialsBox').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        window.open(event.target.href, '_blank');
    }
});

let isSocialsDragging = false;
let socialsOffsetX, socialsOffsetY;

document.getElementById('socialsHandle').addEventListener('mousedown', startSocialsDrag);
document.addEventListener('mouseup', stopSocialsDrag);
document.addEventListener('mousemove', socialsDrag);

function startSocialsDrag(e) {
    isSocialsDragging = true;
    const socialsBox = document.getElementById('socialsBox');
    socialsOffsetX = e.clientX - socialsBox.getBoundingClientRect().left;
    socialsOffsetY = e.clientY - socialsBox.getBoundingClientRect().top;
    socialsBox.style.transition = 'none';
}

function stopSocialsDrag() {
    isSocialsDragging = false;
    const socialsBox = document.getElementById('socialsBox');
    socialsBox.style.transition = '';
}

function socialsDrag(e) {
    if (isSocialsDragging) {
        const socialsBox = document.getElementById('socialsBox');

        let left = e.clientX - socialsOffsetX;
        let top = e.clientY - socialsOffsetY;

        left = Math.max(0, Math.min(window.innerWidth - socialsBox.offsetWidth, left));
        top = Math.max(0, Math.min(window.innerHeight - socialsBox.offsetHeight, top));

        top = Math.max(document.querySelector('.navbar').offsetHeight, top);

        socialsBox.style.left = left + 'px';
        socialsBox.style.top = top + 'px';
    }
}


let isYouTubeDragging = false;
let youtubeOffsetX, youtubeOffsetY;

document.getElementById('youtubeHandle').addEventListener('mousedown', startYouTubeDrag);
document.addEventListener('mouseup', stopYouTubeDrag);
document.addEventListener('mousemove', youTubeDrag);

function startYouTubeDrag(e) {
    isYouTubeDragging = true;
    const youtubeBox = document.getElementById('youtubeBox');
    youtubeOffsetX = e.clientX - youtubeBox.getBoundingClientRect().left;
    youtubeOffsetY = e.clientY - youtubeBox.getBoundingClientRect().top;
    youtubeBox.style.transition = 'none';
}


function stopYouTubeDrag() {
    isYouTubeDragging = false;
    const youtubeBox = document.getElementById('youtubeBox');
    youtubeBox.style.transition = '';
}

function youTubeDrag(e) {
    if (isYouTubeDragging) {
        const youtubeBox = document.getElementById('youtubeBox');

        let left = e.clientX - youtubeOffsetX;
        let top = e.clientY - youtubeOffsetY;

        left = Math.max(0, Math.min(window.innerWidth - youtubeBox.offsetWidth, left));
        top = Math.max(0, Math.min(window.innerHeight - youtubeBox.offsetHeight, top));

        top = Math.max(document.querySelector('.navbar').offsetHeight, top);

        youtubeBox.style.left = left + 'px';
        youtubeBox.style.top = top + 'px';
    }
}

let isCDDragging = false;
let cdOffsetX, cdOffsetY;

document.getElementById('cdHandle').addEventListener('mousedown', startCDDrag);
document.addEventListener('mouseup', stopCDDrag);
document.addEventListener('mousemove', CDDrag);

function startCDDrag(e) {
    isCDDragging = true;
    const cdBox = document.getElementById('cdBox');
    cdOffsetX = e.clientX - cdBox.getBoundingClientRect().left;
    cdOffsetY = e.clientY - cdBox.getBoundingClientRect().top;
    cdBox.style.transition = 'none';
}

function stopCDDrag() {
    isCDDragging = false;
    const cdBox = document.getElementById('cdBox');
    cdBox.style.transition = '';
}

function CDDrag(e) {
    if (isCDDragging) {
        const cdBox = document.getElementById('cdBox');

        let left = e.clientX - cdOffsetX;
        let top = e.clientY - cdOffsetY;

        left = Math.max(0, Math.min(window.innerWidth - cdBox.offsetWidth, left));
        top = Math.max(0, Math.min(window.innerHeight - cdBox.offsetHeight, top));

        top = Math.max(document.querySelector('.navbar').offsetHeight, top);

        cdBox.style.left = left + 'px';
        cdBox.style.top = top + 'px';
    }
}

let isTerminalDragging = false;
let terminalOffsetX, terminalOffsetY;

document.getElementById('terminalHandle').addEventListener('mousedown', startTerminalDrag);
document.addEventListener('mouseup', stopTerminalDrag);
document.addEventListener('mousemove', terminalDrag);

function startTerminalDrag(e) {
    isTerminalDragging = true;
    const terminalBox = document.getElementById('terminalBox');
    terminalOffsetX = e.clientX - terminalBox.getBoundingClientRect().left;
    terminalOffsetY = e.clientY - terminalBox.getBoundingClientRect().top;
    terminalBox.style.transition = 'none';
}

function stopTerminalDrag() {
    isTerminalDragging = false;
    const terminalBox = document.getElementById('terminalBox');
    terminalBox.style.transition = '';
}

function terminalDrag(e) {
    if (isTerminalDragging) {
        const terminalBox = document.getElementById('terminalBox');

        let left = e.clientX - terminalOffsetX;
        let top = e.clientY - terminalOffsetY;

        left = Math.max(0, Math.min(window.innerWidth - terminalBox.offsetWidth, left));
        top = Math.max(0, Math.min(window.innerHeight - terminalBox.offsetHeight, top));

        top = Math.max(document.querySelector('.navbar').offsetHeight, top);

        terminalBox.style.left = left + 'px';
        terminalBox.style.top = top + 'px';
    }
}

const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

terminalInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        handleCommand(terminalInput.value.trim());
        terminalInput.value = '';
    }
});

function showHelp() {
    displayOutput('Commands (6):');
    displayOutput('help - Displays this help text');
    displayOutput('cls/clear - Clears the terminal');
    displayOutput('cd - Opens ClassiDash dashboard');
    displayOutput('yt - Opens YouTube');
    displayOutput('spoof (text) - Spoofs inputted text')
    displayOutput('old - Brings you to the old version of the site')
}

function handleCommand(command) {
    switch (command.toLowerCase()) {
        case '?':
        case 'help':
            showHelp();
            break;
        case 'cls':
        case 'clear':
            clearTerminal();
            break;
        case 'cd':
            window.open("https://classidash.com");
            break;
        case 'yt':
            window.open("https://youtube.com");
            break;
        case 'old':
            window.location.href = "/legacy/v1";
            break;
        default:
            if (command.toLowerCase().startsWith('spoof')) {
                const textToSpoof = command.slice(6).trim();
                const spoofedText = spoofText(textToSpoof);
                copyToClipboard(spoofedText);
                displayOutput(`Text spoofed and copied to clipboard: ${spoofedText}`);
            } else {
                displayOutput(`Command not recognized: ${command}`);
            }
    }
}

function spoofText(text) {
    return text.replace(/./g, function (char) {
        return char.replace(/[aceijopsxy]/ig, function (match) {
            const replacements = {
                'a': 'а', 'c': 'с', 'e': 'е', 'i': 'і',
                'j': 'ј', 'o': 'о', 'p': 'р', 's': 'ѕ',
                'x': 'х', 'y': 'у', 'A': 'А', 'B': 'В',
                'C': 'С', 'E': 'Е', 'H': 'Н', 'I': 'І',
                'K': 'Κ', 'M': 'М', 'N': 'Ν', 'O': 'О',
                'P': 'Р', 'S': 'Ѕ', 'T': 'Т', 'X': 'Х',
                'Y': 'Υ', 'Z': 'Ζ'
            };
            return replacements[match] || match;
        });
    });
}

function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

function clearTerminal() {
    terminalOutput.innerHTML = '';
}
function displayOutput(message) {
    const outputLine = document.createElement('div');
    outputLine.textContent = message;
    terminalOutput.appendChild(outputLine);
}


