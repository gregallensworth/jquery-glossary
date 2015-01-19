/**
 * jQuery Glossary plugin
 * https://github.com/gregallensworth/jquery-glossary/
 * Greg Allensworth @ GreenInfo Network
 *
 * Example with a static mapping of keyword -> definition:
 * var keywords = {
 *      "human" :"an ape-like species noted for its intelligence and adaptability",
 *      "cat"   :"the genus 'felis', itself a subset of quadruped mammals",
 *      "shark" :"a subset of fish, distinguished by having a cartilaginous skeleton rather than a bony skeleton"
 * };
 * var options = { terms:terms_and_definitions_mapping, cssClass:'glossary' };
 * $('description p').glossary(options);
 *
 * Example loading the term->keyword mapping via AJAX:
 * $.get("glossary.json", {}, function (terms_and_definitions_mapping) {
 *     var options = { terms:terms_and_definitions_mapping, cssClass:'glossary' };
 *     $('description p').glossary(options);
 * },'json');
 *
 * Supported options:
 * terms        Required. An associative object of keyword->definition.
 * cssClass     Optional; defaults to 'glossary' A CSS class to apply to the matching words. Useful to style them to stand out, e.g. underlines or boldfacing.
 */

(function($){
    $.extend($.fn, {
        glossary: function(options) {
            options = $.extend({
                cssClass:'glossary',
                terms:{}
            }, options);

            //remap options.terms to be all lowercase, for string matching at runtime
            var t = {};
            for (var term in options.terms) t[ term.toLowerCase() ] = options.terms[term];
            options.terms = t;

            // iterate over the matching page elements, and over the words, and apply the HTML markup
            // this replaces each word with <span class="glossary">word</span> so it can be styled, then applies the "title" property to the element
            // by staggering them out with 100ms timeouts, we prevent this thread from totally freezing the browser for several seconds, albeit causing the definitions to fill in over the course of a few seconds
            var interval = 1;
            this.each(function () {
                var $element = $(this);
                setTimeout(function () {
                    for (term in options.terms) {
                        var regex = term.replace('-','\\').replace('(','\\(').replace(')','\\)').replace('*','\\*').replace('.','\\.').replace('+','\\+');
                            regex = new RegExp('([^\"\>])(' + regex + ')([^\<\"])', 'gi');

                            var newhtml  = $element.html().replace(regex,function(match, $1, $2, $3, offset, original) { return $1 + '<span class="glossary">' + $2 + '</span>' + $3; });
                            $element.html(newhtml);
                    }

                    $element.find('span.glossary').each(function () {
                        var term = $(this).text().toLowerCase();
                        var defn = options.terms[ term ];
                        $(this).prop('title',defn);
                    });
                },100 * interval++);
            });

            // return ourselves so we enable chaining
            return this;
        }
    });
})(jQuery);
