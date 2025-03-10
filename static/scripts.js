document.addEventListener('DOMContentLoaded', () => {
    const canvas3 = document.getElementById('third-canvas');
    if (!canvas3) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx3 = canvas3.getContext('2d');

    canvas3.width = 1160;
    canvas3.height = 750;

    function getScreenedValues() {
        const cWidth = window.innerWidth;
        let value = {};
        if (cWidth < 560) {
            value = {
                curtainWidth: 380, // Reduce curtain width
                startX: 590,  // Adjust the wave start position
                waveAmplitude: 17,
                waveFrequency: 0.07,
                cx: 210,  // Move curtain slightly to the left
                cy: 160,
            };
        }else if (cWidth < 630) {
             value = {
                curtainWidth: 460, // Reduce curtain width
                startX: 640,  // Adjust the wave start position
                waveAmplitude: 17,
                waveFrequency: 0.07,
                cx: 180,  // Move curtain slightly to the left
                cy: 160,
            };
        }else if (cWidth < 930) {
            value = {
                curtainWidth: 670, // Reduce curtain width
                startX: 870,  // Adjust the wave start position
                waveAmplitude: 17,
                waveFrequency: 0.07,
                cx: 200,  // Move curtain slightly to the left
                cy: 160,
            };
        }else if (cWidth < 1200) {
            value = {
                curtainWidth: 720, // Reduce curtain width
                startX: 970,  // Adjust the wave start position
                waveAmplitude: 17,
                waveFrequency: 0.07,
                cx: 250,  // Move curtain slightly to the left
                cy: 160,
            };
        } else {
            value = {
                curtainWidth: 870,
                startX: 1110,
                waveAmplitude: 20,
                waveFrequency: 0.05,
                cx: 240,
                cy: 160,
            };
        }
        return value;  // Return the value object
    }

    const curtain = {
        cx: 240,
        cy: 160,
        color3: "#BF0000",  // Curtain color (red)
        borderColor: "#FFD700",
        startX: 1110, // Gold color for the border
        waveYStart: 720,
        color4: "#F2F2F2",

        drawCurtain() {
            ctx3.clearRect(0, 0, canvas3.width, canvas3.height);  // Clear canvas before drawing curtain

            ctx3.resetTransform();
            const scaleFactorX3 = canvas3.width / 1300;
            const scaleFactorY3 = canvas3.height / 900;
            ctx3.scale(scaleFactorX3, scaleFactorY3);

            const screenValues = getScreenedValues();  // Correct function call

            this.curtainWidth = screenValues.curtainWidth;
            this.startX = screenValues.startX;
            this.waveAmplitude = screenValues.waveAmplitude;
            this.waveFrequency = screenValues.waveFrequency;
            this.cx = screenValues.cx;
            this.cy = screenValues.cy;

            ctx3.beginPath();
            ctx3.moveTo(this.cx, this.cy - 20);
            ctx3.lineTo(this.cx + this.curtainWidth, this.cy - 20);
            ctx3.lineTo(this.cx + this.curtainWidth, this.cy + 620);

            const endX = this.cx;

            ctx3.lineWidth = 10;

            for (let x = this.startX; x >= endX; x -= 1) {
                let y = this.waveYStart + Math.sin((x - this.startX) * this.waveFrequency) * this.waveAmplitude;
                ctx3.lineTo(x, y);
            }

            ctx3.lineTo(this.cx, this.waveYStart + 50);
            ctx3.closePath();
            ctx3.fillStyle = this.color3;
            ctx3.fill();

            ctx3.beginPath();
            ctx3.lineWidth = 5;

            for (let x = this.startX; x >= endX; x -= 1) {
                let y = this.waveYStart + Math.sin((x - this.startX) * this.waveFrequency) * this.waveAmplitude;
                ctx3.lineTo(x, y);
            }

            ctx3.strokeStyle = this.borderColor;
            ctx3.stroke();
            ctx3.closePath();
        },
    };



    const stickMan4 = {
        x3: 110,
        y3: 460,
        radius3: 60,
        armAngle3: 10,
        rotation3: 0,

        rightArm3: {
            raStartX3: 110,
            raStartY3: 527,
            raCurveX3: 28,
            raCurveY3: 100,
            raEndX3:125,
            raEndY3: -20,
        },
        leftArm3: {
            laStartX3: 3,
            laStartY3: 71,
            laCurveX3: 50,
            laCurveY3: 140,
            laEndX3: 90,
            laEndY3: 20,
        },
        rightLeg3: {
            rlStartX3: 10,
            rlStartY3: 180,
            rlCurveX3:8,
            rlCurveY3: 210,
            rlEndX3: -25,
            rlEndY3: 310,
        },
        bodyLine3: {
            bStartX3: 1,
            bStartY3: 60,
            bCurveX3: 15,
            bCurveY3: 120,
            bEndX3: 120,
            bEndY3: 180,
        },
        leftLeg3: {
            llStartX3: 10,
            llStartY3: 180,
            llCurveX3: 30,
            llCurveY3: 200,
            llEndX3: 40,
            llEndY3: 310,
        },

        color3: "#222222",
        isClipping: true,

        draw4() {
            ctx3.save();
            const scaleFactorX3 = canvas3.width / 1160;
            const scaleFactorY3 = canvas3.height / 750;
            ctx3.scale(scaleFactorX3, scaleFactorY3);

            // Face circle
            ctx3.beginPath();
            ctx3.arc(this.x3, this.y3, this.radius3, 0, Math.PI * 2, true);
            ctx3.lineWidth = 2;
            ctx3.strokeStyle = this.color3;
            ctx3.stroke();
            ctx3.closePath();

            // Right eye
            ctx3.beginPath();
            ctx3.arc(this.x3 - 21, this.y3 - 12, this.radius3 / 7, 0, Math.PI * 2, true);
            ctx3.fillStyle = this.color3;
            ctx3.fill();
            ctx3.closePath();

            // Left eye
            ctx3.beginPath();
            ctx3.arc(this.x3 + 25, this.y3 - 12, this.radius3 / 7, 0, Math.PI * 2, true);
            ctx3.fillStyle = this.color3;
            ctx3.fill();
            ctx3.closePath();

            // Smile
            ctx3.beginPath();
            ctx3.arc(this.x3 + 1, this.y3 + 17, this.radius3 / 4, 0, Math.PI, false);
            ctx3.strokeStyle = this.color3;
            ctx3.stroke();
            ctx3.closePath();
            ctx3.restore();

            // Body line
            ctx3.beginPath();
            ctx3.moveTo(this.x3 + this.bodyLine3.bStartX3, this.y3 + this.bodyLine3.bStartY3);
            ctx3.quadraticCurveTo(
                this.x3 + this.bodyLine3.bCurveX3,
                this.y3 + this.bodyLine3.bCurveY3,
                this.bodyLine3.bEndX3,
                this.y3 + this.bodyLine3.bEndY3);
            ctx3.lineWidth = 2;
            ctx3.strokeStyle = this.color3;
            ctx3.stroke();
            ctx3.closePath();

            // Right arm (animated)
            ctx3.beginPath();
            ctx3.moveTo(this.rightArm3.raStartX3, this.rightArm3.raStartY3);
            ctx3.quadraticCurveTo(
                this.x3 + this.rightArm3.raCurveX3,
                this.y3 + this.rightArm3.raCurveY3,
                this.x3 + this.rightArm3.raEndX3 + Math.sin(this.armAngle3) * 60,
                this.y3 + this.rightArm3.raEndY3
            );
            ctx3.lineWidth = 2;
            ctx3.strokeStyle = this.color3;
            ctx3.stroke();
            ctx3.closePath();

            // Left arm
            ctx3.beginPath();
            ctx3.moveTo(this.x3 + this.leftArm3.laStartX3, this.y3 + this.leftArm3.laStartY3);
            ctx3.quadraticCurveTo(
                this.x3 + this.leftArm3.laCurveX3,
                this.y3 + this.leftArm3.laCurveY3,
                this.x3 + this.leftArm3.laEndX3,
                this.y3 + this.leftArm3.laEndY3
            );
            ctx3.lineWidth = 2;
            ctx3.strokeStyle = this.color3;
            ctx3.stroke();
            ctx3.closePath();

            // Right leg
            ctx3.beginPath();
            ctx3.moveTo(this.x3 + this.rightLeg3.rlStartX3, this.y3 + this.rightLeg3.rlStartY3);
            ctx3.quadraticCurveTo(
                this.x3 + this.rightLeg3.rlCurveX3,
                this.y3 + this.rightLeg3.rlCurveY3,
                this.x3 + this.rightLeg3.rlEndX3,
                this.y3 + this.rightLeg3.rlEndY3
            );
            ctx3.lineWidth = 2;
            ctx3.strokeStyle = this.color3;
            ctx3.stroke();
            ctx3.closePath();

            // Left leg
            ctx3.beginPath();
            ctx3.moveTo(this.x3 + this.leftLeg3.llStartX3, this.y3 + this.leftLeg3.llStartY3);
            ctx3.quadraticCurveTo(
                this.x3 + this.leftLeg3.llCurveX3,
                this.y3 + this.leftLeg3.llCurveY3,
                this.x3 + this.leftLeg3.llEndX3,
                this.y3 + this.leftLeg3.llEndY3
            );
            ctx3.lineWidth = 2;
            ctx3.strokeStyle = this.color3;
            ctx3.stroke();
            ctx3.closePath();

            ctx3.restore();
        }
    };

     curtain.drawCurtain();
     stickMan4.draw4();

     window.addEventListener('resize', () => {
        curtain.drawCurtain();
        stickMan4.draw4();
     });

    const timeline = gsap.timeline();

    setTimeout(() => {timeline.to(curtain, {
        waveYStart: 190,
        duration: 2.5,
        onUpdate: () => {
            curtain.drawCurtain();
            stickMan4.draw4();
        },
    });

    timeline.to(stickMan4.rightArm3, {
        raEndY3: 90,
        raCurveX3:77,
        raCurveY3:105,// Animate arm angle from 0 to Math.PI (waving)
        duration: 2.5,
        onUpdate: () => {
            curtain.drawCurtain();
            stickMan4.draw4();
        },
    }, "<");
    timeline.to(stickMan4.leftArm3, {
        laEndY3: 155,
        laCurveY3:145,// Animate arm angle from 0 to Math.PI (waving)
        duration: 2.5,
        onUpdate: () => {
            curtain.drawCurtain();
            stickMan4.draw4();
        },
    }, "<");},1000);


    setTimeout(() => {
        gsap.to(".string", {
            height: "400px", // New height value
            duration: 2,     // Duration of the animation in seconds
        });
    }, 1000);
});
const hamburgerMenu = document.getElementById('hamburger-menu');
const menuLinks = document.getElementById('menu-links');

hamburgerMenu.addEventListener('click', () => {
    // Toggle the active state for animation
  hamburgerMenu.classList.toggle('hamburger-active');
    // Show or hide the menu
  menuLinks.classList.toggle('show');
});

// Show the custom modal if the success parameter exists
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('success')) {
    document.getElementById('popup-modal').classList.remove('hidden'); // Show modal
}

// Close modal logic
document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('popup-modal').classList.add('hidden'); // Hide modal

    // Remove the success parameter from the URL to avoid showing the popup again
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState(null, null, cleanUrl);
});
