export default class ThreeDLogo {
    constructor(logoElem) {
        this.logoElem = logoElem;

        this.maxRotation = 90;
        this.current = {
            x: -this.maxRotation / 2,
            y: -this.maxRotation / 2
        };

        this.target = {
            x: -this.maxRotation / 2,
            y: -this.maxRotation / 2
        };
    }

    setUp() {
        var threeDLogo = this;

        window.addEventListener("mousemove", function (event) {
            threeDLogo.target = {
                x: -(threeDLogo.maxRotation / 2) + event.clientX / window.innerWidth * threeDLogo.maxRotation,
                y: -(threeDLogo.maxRotation / 2) + event.clientY / window.innerHeight * threeDLogo.maxRotation
            }

            // console.log(this.target, this.current);
        });

        requestAnimationFrame(function () {
            threeDLogo.tilt();
        });
    }

    tilt() {
        var threeDLogo = this;

        this.current.x = this.lerp(this.current.x, this.target.x, 0.04);
        this.current.y = this.lerp(this.current.y, this.target.y, 0.04);

        var newTransform = "rotateY(" + this.current.x + "deg)";
        newTransform += " rotateX(" + -this.current.y + "deg)";

        newTransform += " translateX(" + -this.current.x + "px)";
        newTransform += " translateY(" + -this.current.y + "px)";

        this.logoElem.style.transform = newTransform;

        requestAnimationFrame(function () {
            threeDLogo.tilt()
        });
    }

    lerp(start, end, amount) {
        return (1 - amount) * start + amount * end;
    }
}