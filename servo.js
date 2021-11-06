var piblaster = require('pi-blaster.js');

function runAnimation () {
    const anim = animation()
    setTimeout(() => {
        clearInterval(anim)
        piblaster.setPwm(17, 0.15);
    }, 5000)
}


function animation () {
    let curAngle = 0.1;
    let right = true
    let step = 0.001
    let speed = 5
    return setInterval(() => {
        curAngle = parseFloat(curAngle.toFixed(3))
        piblaster.setPwm(17, curAngle);
        if (right) {
            curAngle += step
        }
        if (!right) {
            curAngle -= step
        }

        if (curAngle > 0.2) {
            right = false
        }
        if (curAngle <= 0.09) {
            right = true
        }
    }, speed);
}

module.exports = {runAnimation}
