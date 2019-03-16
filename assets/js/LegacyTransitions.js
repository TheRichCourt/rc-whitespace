export default class LegacyTransitions {
    constructor() {
        this.currentSection = 1;

        // Set up the jQuery plugin
        jQuery.fn.visible = function(partial) {
            var $t = jQuery(this),
            $w = jQuery(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
        };
    }

    watch() {
        var legacyTransitions = this;

        jQuery(document).scroll(function() {
            jQuery('.rc_onepage_slider, body.home #header').each(function() {
                legacyTransitions.switchIfVisible(jQuery(this));
            });

            jQuery('.rc_slidein_right').each(function() {
                legacyTransitions.switchIfVisible(jQuery(this));
            });
        });
    }

    switchIfVisible(elem) {
        if (elem.visible(true)) {
            elem.addClass('rc_onepage_slider_in');
        } else {
            elem.removeClass('rc_onepage_slider_in');
        }
    }

    // function SectionsExist() {
    //     return jQuery('.rc_onepage_section, .extendedheader').length > 1;
    // }
}