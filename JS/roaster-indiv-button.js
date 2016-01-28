/**
 * Created by marieschmidt on 1/25/16.
 */
$(document).ready(function() {
    $('.roaster').addClass("inactive");

    $('#individualResult').click(function() {
        $('.roaster').addClass("inactive");
        $('.individual').removeClass("inactive");
    });

    $('#roasterResult').click(function() {
        $('.individual').addClass("inactive");
        $('.roaster').removeClass("inactive");
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