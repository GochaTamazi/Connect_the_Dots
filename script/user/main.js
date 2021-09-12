function HTMLAllLoad() {
    try {
        new Game();
    } catch (error) {
        alert(error.name + '\n\n' + error.message + '\n\n' + error.stack);
    }
}

function makeICON() {
    let canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    let ctx = canvas.getContext('2d');

    ctx.lineWidth = 0;

    ctx.beginPath();
    ctx.strokeStyle = ctx.fillStyle = `#82e08a`;
    ctx.arc(8, 8, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = ctx.fillStyle = `#8e5dab`;
    ctx.arc(24, 24, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = ctx.fillStyle = `#81b2fe`;
    ctx.arc(24, 8, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = ctx.fillStyle = `#e65d42`;
    ctx.arc(8, 24, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    let link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL("image/x-icon");
    document.getElementsByTagName('head')[0].appendChild(link);
}

makeICON();