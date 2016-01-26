/**
 * Created by marieschmidt on 1/25/16.
 */
$(document).ready(function() {
    $('.roaster-results').addClass("inactive");

    $('#individualResult').click(function() {
        $('.roaster-results').addClass("inactive");
        $('.individual-results').removeClass("inactive");
    });

    $('#roasterResult').click(function() {
        $('.individual-results').addClass("inactive");
        $('.roaster-results').removeClass("inactive");
    });

    $('#individualResult').hover(
        function() {
            $(this).css('opacity',0.8)
        },
        function() {
            $(this).css('opacity',1)
    });

    $('#roasterResult').hover(
        function() {
            $(this).css('opacity',0.8);
        },
        function() {
            $(this).css('opacity', 1);
        });

});