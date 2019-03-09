export default class Menu {
    openDrawer() {
        jQuery('#menu').addClass('open');
        jQuery('#overlay').fadeIn(300);

        jQuery('#menu .changeable_icon')
        document.querySelector('#menubutton .changeable_icon').classList.add('changeable_close_icon');
        document.querySelector('#menubutton .changeable_icon').classList.remove('changeable_menu_icon');
    }

    closeDrawer() {
        jQuery('#menu').removeClass('open');
        jQuery('#overlay').fadeOut(300);
        document.querySelector('#menubutton .changeable_icon').classList.remove('changeable_close_icon');
        document.querySelector('#menubutton .changeable_icon').classList.add('changeable_menu_icon');
    }
}
