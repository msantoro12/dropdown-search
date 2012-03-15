$.getScript('http://dropdown-search.googlecode.com/svn/js/jquery.autocomplete.js', function(){
 $("head").append('<link rel="stylesheet" type="text/css" href="http://dropdown-search.googlecode.com/svn/styles/dropdown.css">');
 $('select:visible').each(function(e){
  var $obj = $(this),
      selectName = $obj.attr("name"),
      searchTerms = $obj.children().map(function() {return $(this).html();}).get(),
      selectedIndex = $('option[selected="selected"]', this).index(),
      selectedIndex = selectedIndex != -1 ? selectedIndex : 0,
      qfTextField = "qfTextField" + selectName,
      $qfTextField;
   console.log(selectedIndex);
  if($obj.children().length > 13 && !$obj.attr("multiple")){
   $obj.hide();
   $('<span><input name="' + qfTextField + '" id="' + qfTextField + '" type="text" value="' + searchTerms[selectedIndex] + '" /><img src="http://dropdown-search.googlecode.com/svn/images/arrow_down_left_sm.png" /></span>').insertAfter(this);
   $qfTextField = $("#" + qfTextField);
   $qfTextField
   .bind("click", function(){
    $(this)
     .data("prevValue", $(this).val() || $(this).data("prevValue"))
     .val("");
   })
   .focusout(function(){
    $(this).val($(this).val() || $(this).data("prevValue") || "");
   })
   .next("img")
    .css({height: $obj.outerHeight(),
          position: "relative",
          "vertical-align": "middle"})
    .bind("click", function(){
     $qfTextField
      .data("prevValue", $qfTextField.val() || $qfTextField.data("prevValue"))
      .focus()
      .val('')
      .click();
     setTimeout(function(){
      $qfTextField.click();
     }, 100);
    })
   .end()
   .parent()
    .css({"white-space": "nowrap"})
   .end()
   .css({width: $obj.width() - $qfTextField.next("img").height(),
         height: $obj.height()})
    .querycomplete(searchTerms,
                   {matchCase: false,
                    matchContains: true,
                    width: $obj.width() + 2,
                    max: 10000,
                    selectFirst: false,
                    scroll: true,
                    minChars: 0})
    .result(function(event, data, formatted){
    if(data){
     $obj.val($obj.find("option:contains(" + data + ")").val());
     $obj.trigger("change");
    }
   });
  }
 });
});
