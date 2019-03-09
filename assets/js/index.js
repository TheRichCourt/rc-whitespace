require('./parallax.min');
require('./jquery.scrollify _UNCOMPRESSED');
require('./template');
import Menu from './Menu';
import ThreeDLogo from './ThreeDLogo';
import Transitions from './Transitions';
import Overrides from './Overrides';

jQuery().ready(function () {
    "use strict";
    var overrides = new Overrides();
    overrides.override();

    // 3D logo thingy
    var logoElem = document.querySelector(".anim svg");

    if (logoElem) {
        var threeDLogo = new ThreeDLogo(document.querySelector(".anim svg"));
        threeDLogo.setUp();
    }

    // The menu
    var menuOpen = false;
    var menu = new Menu();

    document.getElementById('menubutton').addEventListener('click', function () {
        if (menuOpen) {
            menu.closeDrawer();
            menuOpen = false;
        } else {
            menu.openDrawer();
            menuOpen = true;
        }
    });

    // Transitions
    var transitions = new Transitions();
    transitions.setUp();
});

// Load the SASS
require('../sass/template.scss');
