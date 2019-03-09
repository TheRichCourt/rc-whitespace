export default class Overrides {
    /**
     * Create the jQuery plugins
     */
    constructor() {
        jQuery.extend({
            replaceTag: function (currentElem, newTagObj, keepProps) {
                var $currentElem = jQuery(currentElem);
                var i, $newTag = jQuery(newTagObj).clone();

                if (keepProps) {
                    newTag = $newTag[0];
                    newTag.className = currentElem.className;
                    jQuery.extend(newTag.classList, currentElem.classList);
                    jQuery.extend(newTag.attributes, currentElem.attributes);
                }

                $currentElem.wrapAll($newTag);
                $currentElem.parent().html($currentElem.attr('value'));

                return this;
            }
        });

        jQuery.fn.extend({
            replaceTag: function (newTagObj, keepProps) {
                return this.each(function() {
                    jQuery.replaceTag(this, newTagObj, keepProps);
                });
            }
        });

        jQuery.extend({
            nestTags: function (currentElems, newTagObj, keepProps) {
                var $currentElems = jQuery(currentElems);
                var $newTag = jQuery(newTagObj).clone();

                if (keepProps) {
                    newTag = $newTag[0];
                }

                $currentElems.wrapAll($newTag);

                return this;
            }
        });

        jQuery.fn.extend({
            nestTags: function (newTagObj, keepProps) {
                jQuery.nestTags(this, newTagObj, keepProps);
            }
        });
    }

    /**
     * Call the functions to override the current layout
     */
    override() {
        jQuery('input.mshop_button').replaceTag('<button class="mshop_button" type="submit">');
        jQuery('input#fcp_send_button').replaceTag('<button id="fcp_send_button" type="submit">');
        jQuery('div.msgroup_intro').nestTags('<div class="msgroup_intro_wrapper">');
    }
}