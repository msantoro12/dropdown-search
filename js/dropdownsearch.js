javascript:void(function(){
 var s=document.createElement('script');
 s.src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
 document.getElementsByTagName('head')[0].appendChild(s);
}());
$.getScript('//dropdown-search.googlecode.com/svn/js/jquery.autocomplete.js', function(){
 $("head").append('<link rel="stylesheet" type="text/css" href="http://dropdown-search.googlecode.com/svn/styles/dropdown.css">');
 $('select:visible').each(function(e){
  var $obj = $(this),
      selectName = $obj.attr("name"),
      searchTerms = $obj.children().map(function() {return $(this).html();}).get(),
      selectedIndex = $('option[selected="selected"]', this).index(),
      selectedIndex = selectedIndex != -1 ? selectedIndex : 0,
      qfTextField = "qfTextField" + selectName,
      $qfTextField;
  if($obj.children().length > 13 && !$obj.attr("multiple")){
   $obj
    .addClass("ac_select")
    .hide();
   $('<span class="ac_span"><input class="ac_input" name="' + qfTextField + '" id="' + qfTextField + '" type="text" value="' + searchTerms[selectedIndex] + '" data-searchterms="' + searchTerms + '" /><img src="http://dropdown-search.googlecode.com/svn/images/arrow_down_left_sm.png" /></span>').insertAfter(this);
   $qfTextField = $("#" + qfTextField);
   $qfTextField
   .next("img")
    .css({height: $obj.outerHeight(),
          position: "relative",
          "vertical-align": "middle"})
   .end()
   .parent()
    .css({"white-space": "nowrap"})
   .end()
   .css({width: $obj.width() - $qfTextField.next("img").height(),
         height: $obj.height()});
  }
 });
 acBindings();
 $("body").ajaxComplete(function(){
   acBindings();
 });
});
function acBindings(){
 $('input.ac_input').each(function(e){
   var $obj = $(this),
       $selObj = $obj.parent().prev("select.ac_select:first"),
       isBound = $obj.data("events") || 0;
  if(!isBound){
   $obj
    .on("click", function(){
     $(this)
      .data("prevValue", $(this).val() || $(this).data("prevValue"))
      .val("");
    })
    .focusout(function(){
     $(this).val($(this).val() || $(this).data("prevValue") || "");
    })
    .next("img")
     .bind("click", function(){
      $obj
       .data("prevValue", $obj.val() || $obj.data("prevValue"))
       .focus()
       .val('')
       .click();
      setTimeout(function(){
       $obj.click();
      }, 100);
     })
   .end()
   .querycomplete($obj.data("searchterms").split(","),
                  {matchCase: false,
                   matchContains: true,
                   width: $selObj.width() + 2,
                   max: 10000,
                   selectFirst: false,
                   scroll: true,
                   minChars: 0})
   .result(function(event, data, formatted){
    if(data){
     $selObj.val($selObj.find("option:contains(" + data + ")").val());
     $selObj.trigger("change");
    }
   });
  }
 });
}
