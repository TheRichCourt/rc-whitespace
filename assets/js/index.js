// require('./parallax');
// require('./jquery.scrollify_UNCOMPRESSED');
require('jquery-scrollify');
require('jquery-parallax.js');
import Menu from './Menu';
import ThreeDLogo from './ThreeDLogo';
import Transitions from './Transitions';
import Overrides from './Overrides';
import SmoothScrollAnchors from './SmoothScrollAnchors';
import LegacyTransitions from './LegacyTransitions';

// Override some layout form TP extensions that can't be changed at source
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

// Homepage scrolling
jQuery.scrollify({
    section : ".rc_onepage_section, .extendedheader",
    updateHash: false
});

jQuery(window).resize(function() {
    jQuery.scrollify.update();
});

// Homepage legacy transitions
var legacyTransitions = new LegacyTransitions();
legacyTransitions.watch();

// Smooth scrolling to anchors
var smoothScrollAnchors = new SmoothScrollAnchors();
smoothScrollAnchors.setUp();

// Load the SASS
require('../sass/template.scss');
