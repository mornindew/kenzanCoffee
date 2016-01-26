/**
 * Created by marieschmidt on 1/25/16.
 */
$(document).ready( function(){
    $('.truncate td').each( function() {
        var comment = $(this);
        var textComment = comment.text();
        var chars = textComment.length;

        if (chars > 20) {
            var newComment = textComment.substring(0,20) + "...";
            comment.text(newComment);
            comment.addClass('masterTooltip');
            comment.attr('title',textComment);
        }
    });

});