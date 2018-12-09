/*global window, jQuery, document, setInterval*/
jQuery().ready(function () {
    "use strict";
    var logoElem = document.querySelector(".anim svg");

    if (logoElem) {
        var threeDLogo = new ThreeDLogo(document.querySelector(".anim svg"));
        threeDLogo.setUp();
    }
});

var ThreeDLogo = function (logoElem) {
    "use strict";

    var maxRotation = 90;
    var current = {x: -maxRotation / 2, y: -maxRotation / 2};
    var target = {x: -maxRotation / 2, y: -maxRotation / 2};

    return {
        setUp: function () {
            var threeDLogo = this;

            window.addEventListener("mousemove", function (event) {
                target = {
                    x: -(maxRotation / 2) + event.clientX / window.innerWidth * maxRotation,
                    y: -(maxRotation / 2) + event.clientY / window.innerHeight * maxRotation
                }
            });

            requestAnimationFrame(function () {
                threeDLogo.tilt();
            });
        },

        tilt: function () {
            var threeDLogo = this;

            current.x = this.lerp(current.x, target.x, 0.04);
            current.y = this.lerp(current.y, target.y, 0.04);

            var newTransform = "rotateY(" + current.x + "deg)";
            newTransform += " rotateX(" + -current.y + "deg)";

            newTransform += " translateX(" + -current.x + "px)";
            newTransform += " translateY(" + -current.y + "px)";

            logoElem.style.transform = newTransform;

            requestAnimationFrame(function () {
                threeDLogo.tilt()
            });
        },

        lerp: function (start, end, amount) {
            return (1 - amount) * start + amount * end;
        }
    };
}