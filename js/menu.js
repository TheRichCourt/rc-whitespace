jQuery(document).ready(function(){
    jQuery('<span class="expandbutton" tabindex="0"><span class="expandbuttoninner"></span></span>').prependTo('.deeper');
    jQuery('.expandbutton').on('click', function(){
        expand(this, false);
    });
//    jQuery('#menu .expandbutton').on('focusout', function(){
//        expand(this, true);
//    });
    
    jQuery('#overlay').on('click', function(){
        closeDrawer();
    });
    jQuery('#menu li').each(function (i) {
        jQuery(this).attr('tabindex', i + 1);
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
}

function closeDrawer() {
	jQuery('#menu').removeClass('open');
	jQuery('#overlay').fadeOut(300);
}

