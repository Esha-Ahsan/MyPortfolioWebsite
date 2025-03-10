const canvas = document.getElementById("my_canvas");
const ctx = canvas.getContext('2d');

canvas.height = 1300;
canvas.width = 900;

const ball = {
    x: 670,
    y: 130,
    radius: 60,
    armAngle: 10,
    rotation:0,

    rightArm: {
        raStartX:673,
        raStartY: 205,
        raCurveX: 10,
        raCurveY: 110,
        raEndX: -40,
        raEndY: 210,
    },
    leftArm: {
        laStartX: 2,
        laStartY: 75,
        laCurveX: 50,
        laCurveY: 140,
        laEndX: 45,
        laEndY: 220,
    },
    rightLeg: {
        rlStartX: 20,
        rlStartY: 190,
        rlCurveX: -30,
        rlCurveY: 210,
        rlEndX: -60,
        rlEndY: 320,
    },
    bodyLine: {
        bStartX: -3,
        bStartY: 60,
        bCurveX: 25,
        bCurveY: 120,
        bEndX: 670,
        bEndY: 180,
    },
    leftLeg: {
        llStartX: 20,
        llStartY: 190,
        llCurveX:30,
        llCurveY:200,
        llEndX:40,
        llEndY:210,
    },


    color: "#222222",
    isClipping:true,

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        const scaleFactorX = canvas.width / 1300;  // original width
        const scaleFactorY = canvas.height / 900;  // original height
        ctx.scale(scaleFactorX, scaleFactorY);

        const profileCircleX = 670; // Fixed position X for the profile circle
        const profileCircleY = 130;

        if (this.flipX) {
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2, 0);
        }

        //Profile circle
        ctx.beginPath();
        ctx.arc(profileCircleX,profileCircleY, 125, 0, Math.PI * 2, true);
        ctx.closePath();
        if (this.isClipping) {
            ctx.clip();
        }
        ctx.save();
        ctx.translate(this.x, this.y);  // Move to the ball's center
        ctx.rotate(this.rotation);  // Apply rotation
        ctx.translate(-this.x, -this.y);
        // Face circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();

        // Right eye
        ctx.beginPath();
        ctx.arc(this.x - 31, this.y - 12, this.radius / 7, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        // Left eye
        ctx.beginPath();
        ctx.arc(this.x + 15, this.y - 12, this.radius / 7, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        // Smile
        ctx.beginPath();
        ctx.arc(this.x - 7, this.y + 15, this.radius / 4, 0, Math.PI, false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        // Body line
        ctx.beginPath();
        ctx.moveTo(this.x + this.bodyLine.bStartX, this.y + this.bodyLine.bStartY);
        ctx.quadraticCurveTo(
            this.x + this.bodyLine.bCurveX,
            this.y + this.bodyLine.bCurveY,
            this.bodyLine.bEndX,
            this.y +  this.bodyLine.bEndY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();

        // Right arm (animated)
        ctx.beginPath();
        ctx.moveTo(this.rightArm.raStartX,this.rightArm.raStartY);
        ctx.quadraticCurveTo(
            this.x + this.rightArm.raCurveX,
            this.y + this.rightArm.raCurveY,
            this.x + this.rightArm.raEndX + Math.sin(this.armAngle) * 60,
            this.y + this.rightArm.raEndY
        );
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();

        // Left arm
        ctx.beginPath();
        ctx.moveTo(this.x + this.leftArm.laStartX , this.y + this.leftArm.laStartY);
        ctx.quadraticCurveTo(
            this.x + this.leftArm.laCurveX,
            this.y + this.leftArm.laCurveY,
            this.x + this.leftArm.laEndX,
            this.y + this.leftArm.laEndY
        );
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();

        // Right leg
        ctx.beginPath();
        ctx.moveTo(this.x+this.rightLeg.rlStartX, this.y+this.rightLeg.rlStartY);
        ctx.quadraticCurveTo(
            this.x + this.rightLeg.rlCurveX,
            this.y + this.rightLeg.rlCurveY,
            this.x + this.rightLeg.rlEndX,
            this.y + this.rightLeg.rlEndY,
        );
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();

        // Left leg
        ctx.beginPath();
        ctx.moveTo(this.x + this.leftLeg.llStartX, this.y+this.leftLeg.llStartY);
        ctx.quadraticCurveTo(
            this.x + this.leftLeg.llCurveX,
            this.y + this.leftLeg.llCurveY,
            this.x + this.leftLeg.llEndX,
            this.y + this.leftLeg.llEndY,
        );
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }
};

function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ball.draw();
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

function getScreenValues() {
    const sWidth= window.innerWidth;
    let values= {};
    if (sWidth < 590 ) {
        values = {
            xn: 543,
            yn: 320,
            raStartXn:530,
            raStartYn: 380,
            raCurveXn: -17,
            raCurveYn: 114,
            raEndXn:-80,
            raEndYn: 30,
            laEndXn: 95,
            laEndYn: 19,
            laCurveXn: 37,
            laCurveYn:97,
            laStartXn:-17,
            laStartYn:73,
            rlEndXn: -127,
            rlEndYn: 284,
            rlCurveXn: -90,
            rlCurveYn:197,
            rlStartXn:-50,
            rlStartYn:169,
            llEndXn: -74,
            llEndYn: 288,
            llCurveXn:-55,
            llCurveYn:197,
            llStartXn:-50,
            llStartYn:169,
            bStartXn: -13,
            bStartYn: 60,
            bCurveXn: -23,
            bCurveYn: 140,
            bEndXn:492,
            bEndYn: 170,

            raStartXo: 528,
            raStartYo: 389,
            raCurveXo: -70,
            raCurveYo: 140,
            raEndXo: -35,
            raEndYo: 180,
            laStartXo: -14,
            laStartYo: 70,
            laCurveXo: 5,
            laCurveYo: 137,
            laEndXo: 0,
            laEndYo: 200,
            rlStartXo: -30,
            rlStartYo: 167,
            rlCurveXo: -48,
            rlCurveYo: 197,
            rlEndXo: -81,
            rlEndYo: 284,
            llStartXo: -30,
            llStartYo: 167,
            llCurveXo: -25,
            llCurveYo: 197,
            llEndXo: -35,
            llEndYo: 288,

            bCurveXo: -27,
            bEndXo:512,

            bEndYp: 175,
            bCurveXp: -17,
            bEndXp: 533,
            raStartXp: 530,
            raStartYp: 390,
            raEndYp: 153,
            raEndXp: -29,
            raCurveXp:-10,
            laEndXp: -40,
            laCurveXp: 15,
            laCurveYp: 167,
            laEndYp: 110,
            rlStartXp: -10,
            rlStartYp: 169,
            rlCurveXp: -9,
            rlCurveYp: 197,
            rlEndXp: 10,
            rlEndYp: 284,
            llStartXp: -10,
            llStartYp: 169,
            llCurveXp: -35,
            llCurveYp: 197,
            llEndXp: -45,
            llEndYp: 288,
        }
    } else {
        values= {
            xn:280,
            yn:420,
            raStartXn: 268,
            raStartYn: 478,
            raCurveXn: -27,
            raCurveYn: 114,
            raEndXn:-80,
            raEndYn: -20,
            laEndXn: 95,
            laEndYn: 19,
            laCurveXn: 37,
            laCurveYn:97,
            laStartXn:-17,
            laStartYn:73,
            rlEndXn: -127,
            rlEndYn: 284,
            rlCurveXn: -90,
            rlCurveYn:197,
            rlStartXn:-50,
            rlStartYn:169,
            llEndXn: -74,
            llEndYn: 288,
            llCurveXn:-55,
            llCurveYn:197,
            llStartXn:-50,
            llStartYn:169,
            bStartXn: -13,
            bStartYn: 60,
            bCurveXn: -48,
            bCurveYn: 140,
            bEndXn:230,
            bEndYn: 170,

            raStartXo: 268,
            raStartYo: 484,
            raCurveXo: -70,
            raCurveYo: 140,
            raEndXo: -55,
            raEndYo: 180,
            laStartXo: -14,
            laStartYo: 70,
            laCurveXo: 5,
            laCurveYo: 147,
            laEndXo: 0,
            laEndYo: 200,
            rlStartXo: -30,
            rlStartYo: 167,
            rlCurveXo: -48,
            rlCurveYo: 197,
            rlEndXo: -81,
            rlEndYo: 284,
            llStartXo: -30,
            llStartYo: 167,
            llCurveXo: -25,
            llCurveYo: 197,
            llEndXo: -35,
            llEndYo: 288,

            bCurveXo: -27,
            bEndXo:249,

            bEndYp: 175,
            bCurveXp: -17,
            bEndXp: 270,
            raStartXp: 268,
            raStartYp: 484,
            raEndYp: 180,
            raEndXp: 35,
            raCurveXp: 8,
            laEndXp: -55,
            laCurveXp: -25,
            laCurveYp: 147,
            laEndYp: 190,
            rlStartXp: -10,
            rlStartYp: 169,
            rlCurveXp: -9,
            rlCurveYp: 197,
            rlEndXp: 10,
            rlEndYp: 284,
            llStartXp: -10,
            llStartYp: 169,
            llCurveXp: -35,
            llCurveYp: 197,
            llEndXp: -45,
            llEndYp: 288

        }
    }
    return values;
}
function startAnimation() {

    const screenValues=getScreenValues();
    gsap.to(ball.rightArm, {
        duration: 0.45,
        raEndX: -60,
        raEndY: -10,
        yoyo:true,
        repeat: 2,
        onUpdate: () => {
            ball.draw();
        },
        onComplete: () => {
            gsap.to(ball.rightArm, {
                duration: 1,
                raEndX: -42,
                raEndY: 94,
                raCurveX:-15,
                raCurveY:170,
                onUpdate: () => {
                    ball.draw();
                },onComplete: () => {
                    gsap.to(ball.rightArm, {
                        duration: 1,
                        raEndX: -40,
                        raEndY: 95,
                        raCurveX:-35,
                        raCurveY:50,
                        onUpdate: () => {
                            ball.draw();
                        }
                    });
                    gsap.to(ball.leftArm, {
                        duration: 1,
                        laEndX: 40,
                        laEndY: 114,
                        laCurveX: 95,
                        laCurveY:40,
                        onUpdate: () => {
                            console.log(ball.leftArm);
                            ball.draw();
                        }
                    });
                    gsap.to(ball.rightLeg, {
                        duration: 1,
                        rlEndX: -40,
                        rlEndY: 120,
                        rlCurveX:-12,
                        rlCurveY:60,
                        onUpdate: () => {
                            ball.draw();
                        },onComplete: ()=> {
                            gsap.to(ball, {
                                x:630,
                                y:90,
                                rotation: -Math.PI /20,
                                duration:0.5,
                                isClipping:false,
                                onUpdate: () => {

                                    ball.draw();
                                }
                            });
                            gsap.to(ball.rightArm, {
                                duration: 0.5,
                                raStartX:642,
                                raStartY:165,
                                raEndX: -45,
                                raEndY:82,
                                raCurveX:-35,
                                raCurveY:55,
                                onUpdate: () => {
                                    ball.draw();
                                }
                            });
                            gsap.to(ball.bodyLine, {
                                duration:0.5,
                                bStartX: 5,
                                bStartY: 60,
                                bCurveX: 25,
                                bCurveY: 110,
                                bEndX:640,
                                bEndY: 153,
                                onUpdate: () => {
                                    ball.draw();
                                }
                            });
                            gsap.to(ball.leftArm, {
                                duration: 0.5,
                                laEndX: 45,
                                laEndY: 163,
                                laCurveX: 37,
                                laCurveY:97,
                                laStartX:10,
                                laStartY:75,
                                onUpdate: () => {
                                    console.log(ball.leftArm);
                                    ball.draw();
                                }
                            });
                            gsap.to(ball.rightLeg, {
                                duration: 0.5,
                                rlEndX: -40,
                                rlEndY: 135,
                                rlCurveX: -30,
                                rlCurveY:30,
                                rlStartX:10,
                                rlStartY:152,
                                onUpdate: () => {
                                    console.log(ball.rightLeg);
                                    ball.draw();
                                }
                            });
                            gsap.to(ball.leftLeg, {
                                duration:0.5,
                                llEndX: -50,
                                llEndY: 200,
                                llCurveX:-6,
                                llCurveY:90,
                                llStartX:10,
                                llStartY:150,
                                onUpdate: () => {
                                    ball.draw();
                                },onComplete: ()=> {
                                        gsap.to(ball, {
                                        x:screenValues.xn,
                                        y:screenValues.yn,
                                        duration:1,
                                        isClipping:false,
                                        onUpdate: () => {
                                            ball.rotation = 0;
                                            ball.draw();
                                        }
                                    });
                                    gsap.to(ball, {
                                        rotation: Math.PI/40,
                                        duration:1,
                                        onUpdate: ()=> {
                                            ball.draw();
                                        }
                                    });
                                     gsap.to(ball.bodyLine, {
                                        duration:1,
                                        bStartX: screenValues.bStartXn,
                                        bStartY: screenValues.bStartYn,
                                        bCurveX: screenValues.bCurveXn,
                                        bCurveY: screenValues.bCurveYn,
                                        bEndX: screenValues.bEndXn,
                                        bEndY: screenValues.bEndYn,
                                        onUpdate: () => {
                                            ball.draw();
                                        }
                                    });
                                    gsap.to(ball.rightArm, {
                                        duration:1,
                                        raStartX: screenValues.raStartXn,
                                        raStartY: screenValues.raStartYn,
                                        raCurveX: screenValues.raCurveXn,
                                        raCurveY: screenValues.raCurveYn,
                                        raEndX:screenValues.raEndXn,
                                        raEndY: screenValues.raEndYn,
                                        onUpdate: () => {
                                            ball.draw();
                                        }
                                    });
                                    gsap.to(ball.leftArm, {
                                        duration: 1,
                                        laEndX: screenValues.laEndXn,
                                        laEndY: screenValues.laEndYn,
                                        laCurveX: screenValues.laCurveXn,
                                        laCurveY:screenValues.laCurveYn,
                                        laStartX:screenValues.laStartXn,
                                        laStartY:screenValues.laStartYn,
                                        onUpdate: () => {
                                            console.log(ball.leftArm);
                                            ball.draw();
                                        }
                                    });
                                    gsap.to(ball.rightLeg, {
                                        duration:1,
                                        rlEndX: screenValues.rlEndXn,
                                        rlEndY: screenValues.rlEndYn,
                                        rlCurveX: screenValues.rlCurveXn,
                                        rlCurveY:screenValues.rlCurveYn,
                                        rlStartX:screenValues.rlStartXn,
                                        rlStartY:screenValues.rlStartYn,
                                        onUpdate: () => {
                                            console.log(ball.rightLeg);
                                            ball.draw();
                                        }
                                    });
                                    gsap.to(ball.leftLeg, {
                                        duration:1,
                                        llEndX: screenValues.llEndXn,
                                        llEndY: screenValues.llEndYn,
                                        llCurveX:screenValues.llCurveXn,
                                        llCurveY:screenValues.llCurveYn,
                                        llStartX:screenValues.llStartXn,
                                        llStartY:screenValues.llStartYn,
                                        onUpdate: () => {
                                            ball.rotation = 0;
                                            ball.draw();
                                        },onComplete: () =>{
                                            gsap.to(ball, {
                                                onUpdate: ()=> {
                                                    ball.draw();
                                                }
                                            });
                                            gsap.to(ball.bodyLine,{
                                                bEndX:screenValues.bEndXo,
                                                duration:.5,
                                                bCurveX:screenValues.bCurveXo,
                                                onUpdate: ()=> {
                                                    ball.draw();
                                                }
                                            });
                                            gsap.to(ball.rightArm,{
                                                raStartY:screenValues.raStartYo,
                                                raStartX:screenValues.raStartXo,
                                                duration:.5,
                                                raEndX:screenValues.raEndXo,
                                                raEndY:screenValues.raEndYo,
                                                raCurveX:screenValues.raCurveXo,
                                                raCurveY:screenValues.raCurveYo,
                                                onUpdate: ()=>{
                                                    ball.draw();
                                                }
                                            });
                                            gsap.to(ball.leftArm,{
                                                laStartX:screenValues.laStartXo,
                                                duration:.5,
                                                laStartY:screenValues.laStartYo,
                                                laEndX:screenValues.laEndXo,
                                                laEndY:screenValues.laEndYo,
                                                laCurveX:screenValues.laCurveXo,
                                                laCurveY:screenValues.laCurveYo,
                                            });
                                            gsap.to(ball.rightLeg, {
                                                rlStartX:screenValues.rlStartXo,
                                                duration:.5,
                                                rlStartY:screenValues.rlStartYo,
                                                rlCurveX:screenValues.rlCurveXo,
                                                rlCurveY:screenValues.rlCurveYo,
                                                rlEndX:screenValues.rlEndXo,
                                                rlEndY:screenValues.rlEndYo,
                                                onUpdate: ()=> {
                                                    ball.draw();
                                                }
                                            });
                                            gsap.to(ball.leftLeg, {
                                                duration:0.5,
                                                llStartX:screenValues.llStartXo,
                                                llStartY:screenValues.llStartYo,
                                                llCurveX:screenValues.llCurveXo,
                                                llCurveY:screenValues.llCurveYo,
                                                llEndX:screenValues.llEndXo,
                                                llEndY:screenValues.llEndYo,
                                                onUpdate: ()=> {
                                                    ball.draw();
                                                },onComplete: ()=> {
                                                    gsap.to(ball,{
                                                        duration:.5,
                                                        flipX:false,
                                                        onUpdate: ()=> {
                                                            ball.draw();
                                                        }
                                                    });
                                                    gsap.to(ball.bodyLine,{
                                                        duration:.5,
                                                        bEndY:screenValues.bEndYp,
                                                        bCurveX:screenValues.bCurveXp,
                                                        bEndX:screenValues.bEndXp,
                                                        onUpdate: ()=> {
                                                            ball.draw();
                                                        }
                                                    });gsap.to(ball.rightArm, {
                                                        duration:.5,
                                                        raStartX:screenValues.raStartXp,
                                                        raStartY:screenValues.raStartYp,
                                                        raEndY:screenValues.raEndYp,
                                                        raEndX:screenValues.raEndXp,
                                                        raCurveX:screenValues.raCurveXp,
                                                        onUpdate: ()=> {
                                                            ball.draw();
                                                        }
                                                    });gsap.to(ball.leftArm, {
                                                        duration:.5,
                                                        laEndX:screenValues.laEndXp,
                                                        laCurveX:screenValues.laCurveXp,
                                                        laCurveY:screenValues.laCurveYp,
                                                        laEndY:screenValues.laEndYp,
                                                        onUpdate: ()=> {
                                                            ball.draw();
                                                        }
                                                    });
                                                    gsap.to(ball.rightLeg, {
                                                        rlStartX:screenValues.rlStartXp,
                                                        duration:.5,
                                                        rlStartY:screenValues.rlStartYp,
                                                        rlCurveX:screenValues.rlCurveXp,
                                                        rlCurveY:screenValues.rlCurveYp,
                                                        rlEndX:screenValues.rlEndXp,
                                                        rlEndY:screenValues.rlEndYp,
                                                        onUpdate: ()=> {
                                                            ball.draw();
                                                        }
                                                    });
                                                    gsap.to(ball.leftLeg, {
                                                        duration:0.5,
                                                        llStartX:screenValues.llStartXp,
                                                        llStartY:screenValues.llStartYp,
                                                        llCurveX:screenValues.llCurveXp,
                                                        llCurveY:screenValues.llCurveYp,
                                                        llEndX:screenValues.llEndXp,
                                                        llEndY:screenValues.llEndYp,
                                                        onUpdate: ()=> {
                                                            ball.draw();
                                                        },onComplete: ()=> {
                                                            gsap.to(ball.rightArm, {
                                                                duration:.5,
                                                                raStartX:268,
                                                                raStartY:484,
                                                                raEndY:140,
                                                                raEndX:-15,
                                                                raCurveX:-10,
                                                                onUpdate: ()=> {
                                                                    ball.draw();
                                                                },onComplete: ()=> {

                                                                    gsap.to(ball.rightArm, {
                                                                       duration:0.5,
                                                                       raEndY:134,
                                                                       raEndX:-12,
                                                                       onUpdate: ()=> {
                                                                           ball.draw();
                                                                       }
                                                                    });
                                                                    gsap.to(ball.leftArm, {
                                                                        laEndX:-46,
                                                                        laEndY:193,
                                                                        onUpdate: ()=> {
                                                                            ball.draw();
                                                                        }

                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });

                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

setTimeout(startAnimation, 1000);

setTimeout(() => {
    const container = document.querySelector('.first-container');
    container.classList.add('straighten');
}, 7000);



/*button functions*/

/*scroll function*/
const scrollButton=document.getElementById("arrow");

scrollButton.addEventListener("click",function() {
    const target=document.getElementById("second-container");

    window.scrollTo({
        top:target.offsetTop,
        behavior:"smooth"

    });

});


const hamburgerMenu = document.getElementById('hamburger-menu');
const menuLinks = document.getElementById('menu-links');

hamburgerMenu.addEventListener('click', () => {
    // Toggle the active state for animation
  hamburgerMenu.classList.toggle('hamburger-active');
    // Show or hide the menu
  menuLinks.classList.toggle('show');
});

