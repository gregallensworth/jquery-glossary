# jquery-glossary
A "glossary" plugin forJQuery.

- Supply a associative object of keyword -> definition.
- Call $(selector).glossary({ terms:word_definitions} )
- The selected element will be scanned for those keywords, and marked up with class="glossary" tags (for styling) and those elements will have their "title" attribute set so they have a tooltip, of the definition

Example with a static mapping of keyword -> definition:

    var keywords = {
        "human" :"an ape-like species noted for its intelligence and adaptability",
        "cat" :"the genus 'felis', itself a subset of quadruped mammals",
        "shark" :"a subset of fish, distinguished by having a cartilaginous skeleton rather than a bony skeleton"
    };
    var options = { terms:terms_and_definitions_mapping, cssClass:'glossary' };
    $('description p').glossary(options);

Example loading the term->keyword mapping via AJAX:

    $.get("glossary.json", {}, function (terms_and_definitions_mapping) {
        var options = { terms:terms_and_definitions_mapping, cssClass:'glossary' };
        $('description p').glossary(options);
    },'json');
