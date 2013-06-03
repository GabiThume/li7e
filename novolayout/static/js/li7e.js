$(function () {
  var delay;
  // some editor settings using codemirror
  var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
//    mode: "htmlmixed",
    mode: "javascript",
    tabMode: "indent",
    electricChars: true,
    indentWithTabs: false,
    indentUnit: 2,
    tabSize: 2,
    smartIndent: true,
    lineNumbers: true,
    gutter: true,
    matchBrackets: true,
    theme: "lesser-dark",
  });

  editor.on("change", function() {
        clearTimeout(delay);
        delay = setTimeout(updatePreview, 300);
  });
      
  function updatePreview() {
        var previewFrame = document.getElementById('preview_iframe');
        var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
        preview.open();
        preview.write(editor.getValue());
        preview.close();
      }
  setTimeout(updatePreview, 300);



/*
    var clicking = false;
    $('#drag-handle').mousedown( function() {
        clicking = true;
        $(this).addClass('dragging')
    });
    $(window).mouseup(function(){
        $('#drag-handle').removeClass('dragging')
        $('body').removeClass('resizing');
        clicking = false;
    });
    $(window).mousemove(function(e){
        if (clicking === true) {
            editor.resize();
            $('body').addClass('resizing')
            $('#preview').css('right', '0px')
            $('#preview').css('width', window.innerWidth - e.pageX)
            $('#preview').css('left', e.pageX + 'px')
            $('#drag-handle').css('left', (e.pageX - 5) + 'px')
            $('#commandbar, #editor, #footer').css('right', window.innerWidth - e.pageX)
        }
    }); 
*/
});