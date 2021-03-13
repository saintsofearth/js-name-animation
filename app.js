let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


let verticesJ = [];
let verticesS = [];
let pointsOfJ;
let pointsOfS;
let t1 = 1;
let t2 = 1;

function draw() {

    if (canvas.getContext) {
        ctx.clearRect(0, 0, 960, 540);
        ctx.save();
        // ctx.scale(0.55, 0.65)
        // ctx.scale(1.2, 1.0);
        ctx.strokeStyle = "black";
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        createAlphabetJ(ctx);
        createAlphabetS(ctx);
        // window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, 960, 540);
        console.log('end of draw function');
    }
}

function createAlphabetJ(ctx) {

    // These vertices draw alphabet J
    verticesJ.push({
        from: { x: 50, y: 30 },
        to: { x: 150, y: 30 },
        curve: 'line'
    });
    verticesJ.push({
        from: { x: 150, y: 30 },
        to: { x: 150, y: 50 },
        curve: 'line'
    });
    verticesJ.push({
        from: { x: 150, y: 50 },
        to: { x: 110, y: 50 },
        curve: 'line'
    });
    verticesJ.push({
        from: { x: 110, y: 50 },
        to: { x: 110, y: 110 },
        curve: 'line'
    });
    verticesJ.push({
        from: { x: 110, y: 110 },
        to: { x: 50, y: 110 },
        cp1: { x: 110, y: 150 },
        cp2: { x: 50, y: 150 },
        curve: 'bezier'
    });
    verticesJ.push({
        from: { x: 50, y: 110 },
        to: { x: 70, y: 110 },
        curve: 'line'
    });
    verticesJ.push({
        from: { x: 70, y: 110 },
        to: { x: 90, y: 110 },
        cp1: { x: 70, y: 130 },
        cp2: { x: 90, y: 130 },
        curve: 'bezier'
    });
    verticesJ.push({
        from: { x: 90, y: 110 },
        to: { x: 90, y: 50 },
        curve: 'line'
    });
    verticesJ.push({
        from: { x: 90, y: 50 },
        to: { x: 50, y: 50 },
        curve: 'line'
    });
    verticesJ.push({
        from: { x: 50, y: 50 },
        to: { x: 50, y: 30 },
        curve: 'line'
    });

    pointsOfJ = calcWayPoints(verticesJ);
    t1 = 1;
    animateJ();
}

function createAlphabetS(ctx) {
    // These vertices draw alphabet S
    verticesS.push({
        from: { x: 230, y: 25 },
        to: { x: 210, y: 25 },
        curve: 'line'
    });
    verticesS.push({
        from: { x: 210, y: 25 },
        to: { x: 190, y: 75 },
        cp1: { x: 160, y: 25 },
        cp2: { x: 160, y: 75 },
        curve: 'bezier'
    });
    verticesS.push({
        from: { x: 190, y: 75 },
        to: { x: 170, y: 125 },
        cp1: { x: 230, y: 75 },
        cp2: { x: 240, y: 135 },
        curve: 'bezier'
    });
    verticesS.push({
        from: { x: 170, y: 125 },
        to: { x: 170, y: 140 },
        curve: 'line'
    });
    verticesS.push({
        from: { x: 170, y: 140 },
        to: { x: 210, y: 65 },
        cp1: { x: 257, y: 152 },
        cp2: { x: 245, y: 70 },
        curve: 'bezier'
    });
    verticesS.push({
        from: { x: 210, y: 65 },
        to: { x: 230, y: 39 },
        cp1: { x: 175, y: 64 },
        cp2: { x: 175, y: 30 },
        curve: 'bezier'
    });
    verticesS.push({
        from: { x: 230, y: 39 },
        to: { x: 230, y: 25 },
        curve: 'line'
    });
    pointsOfS = calcWayPoints(verticesS);
    t2 = 1;
    animateS();
}

function calcWayPoints(vertices) {
    var wayPoints = [];
    for (let i = 0; i < vertices.length; i++) {
        var start = vertices[i].from;
        var dest = vertices[i].to;

        var distX = dest.x - start.x;
        var distY = dest.y - start.y;
        if (vertices[i].curve === 'line') {
            for (let j = 0; j < 100; j++) {
                var x = start.x + distX * j / 100;
                var y = start.y + distY * j / 100;
                wayPoints.push({ x: x, y: y });
            }
        } else {
            var cp1 = vertices[i].cp1;
            var cp2 = vertices[i].cp2;
            for (let t = 0; t <= 1; t = t + 0.05) {
                var x = Math.pow((1 - t), 3) * start.x + 3 * Math.pow((1 - t), 2) * t * cp1.x + 3 * (1 - t) * t ** 2 * cp2.x + Math.pow(t, 3) * dest.x;
                var y = Math.pow((1 - t), 3) * start.y + 3 * Math.pow((1 - t), 2) * t * cp1.y + 3 * (1 - t) * t ** 2 * cp2.y + Math.pow(t, 3) * dest.y;
                wayPoints.push({ x: x, y: y });
            }
        }
    }
    return wayPoints;
}

function animateJ() {
    if (t1 < pointsOfJ.length - 1) {
        window.requestAnimationFrame(animateJ);
    }
    ctx.beginPath();
    ctx.moveTo(pointsOfJ[t1 - 1].x, pointsOfJ[t1 - 1].y);
    ctx.lineTo(pointsOfJ[t1].x, pointsOfJ[t1].y);
    ctx.stroke();
    t1++;
}

function animateS() {
    if (t2 < pointsOfS.length - 1) {
        window.requestAnimationFrame(animateS);
    }
    ctx.beginPath();
    ctx.moveTo(pointsOfS[t2 - 1].x, pointsOfS[t2 - 1].y);
    ctx.lineTo(pointsOfS[t2].x, pointsOfS[t2].y);
    ctx.stroke();
    t2++;
}
