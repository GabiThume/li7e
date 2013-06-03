$(function () {
  var delay;
  // some editor settings using codemirror
  var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
//    mode: "htmlmixed",
    mode: "javascript",
    tabMode: "indent",
    value: " ",
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

  // Selecting with library use
  var foo = document.getElementById("lib");
  foo.onchange = function(){
      var option = this.options[this.selectedIndex].value;
      if (option == "processingjs"){
          editor.setValue("<script src=\"http://processingjs.org/js/processing.min.js\"></script>\n"+
                           "<canvas id=\"processing-canvas\"> </canvas>\n"+
                           "<script type=\"text/processing\" data-processing-target=\"processing-canvas\">\n" +
                           "\nvoid setup(){\n\n} \n\nvoid draw(){\n\n}\n\n"+
                           "</script>");
      }
  }

  // Selecting examples
  var ex = document.getElementById("examples");
  ex.onchange = function(){
      var option = this.options[this.selectedIndex].value;
      if (option == "clocks"){
          editor.setValue("<script src=\"http://processingjs.org/js/processing.min.js\"></script>\n"+
                           "<canvas id=\"processing-canvas\"> </canvas>\n"+
                           "<script type=\"text/processing\" data-processing-target=\"processing-canvas\">\n" +
                           "\nvoid setup(){\n\n} \n\nvoid draw(){\n\n}\n\n"+
                           "</script>");
      }
  }

   // Drag and drop functionality 

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