var menuOpen = false;

jQuery(document).ready(function(){
    document.getElementById('menubutton').addEventListener('click', function () {
        if (menuOpen) {
            closeDrawer();
            menuOpen = false;
        } else {
            openDrawer();
            menuOpen = true;
        }
    });
});

function expand(expButton, closeOnly) {
    if (jQuery(expButton).parent().hasClass('expanded')) {
        jQuery(expButton).parent().removeClass('expanded');
        jQuery(expButton).removeClass('flipped');
    } else {
        if (!closeOnly) {
            jQuery(expButton).parent().addClass('expanded');
            jQuery(expButton).addClass('flipped');
        }
    }
}
function openDrawer() {
	jQuery('#menu').addClass('open');
    jQuery('#overlay').fadeIn(300);

    jQuery('#menu .changeable_icon')
    document.querySelector('#menubutton .changeable_icon').classList.add('changeable_close_icon');
    document.querySelector('#menubutton .changeable_icon').classList.remove('changeable_menu_icon');
}

function closeDrawer() {
	jQuery('#menu').removeClass('open');
    jQuery('#overlay').fadeOut(300);
    document.querySelector('#menubutton .changeable_icon').classList.remove('changeable_close_icon');
    document.querySelector('#menubutton .changeable_icon').classList.add('changeable_menu_icon');
}

