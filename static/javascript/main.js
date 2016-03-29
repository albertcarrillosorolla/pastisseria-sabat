$(function () {
function getPageName() {
    var pathName = window.location.pathname;
    var pageName = "";
    if (pathName.indexOf("/") != -1) {
        pageName = pathName.split("/").pop();
    } else {
        pageName = pathName;
    }
    return pageName;
}
function navigateToPage() {
   var pageName = getPageName();
   $("#contentloader").removeClass('contentvisible');
   $.get(pageName, function (response) {
        var markup = $("<div>" + response + "</div>");
      	var fragment = markup.find("#contentloader").html();
				$("#contentloader").html(fragment).addClass('contentvisible');
   });
	 //alert(pageName);
	 if(pageName!=""){
		 	goDown();
	 }
}
$("a[data-role='ajax']").click(function (e) {
    if (Modernizr.history) {
        e.preventDefault();
        var pageName = $(this).attr("href");
        window.history.pushState(null, "", pageName);
        navigateToPage();
    }
});
var _popStateEventCount = 0;
$(window).on('popstate', function (e) {
    this._popStateEventCount++;
    //if ($.browser.webkit && this._popStateEventCount == 1) {
    //    return;
    //}
    navigateToPage();
});
$( document ).ready(function() {
  $('#menudiv').animate({ 'opacity': "1.0" });
  var pageName = window.location.pathname;
	if(pageName!="/"){
		goDown();
 }
});
});
var CONTENT_STATE = false;
var noticiaLoaded = true;
var lastScrollTop = 0;
$(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
  event.preventDefault();
  var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
  if(CONTENT_STATE && delta>0 && window.location.pathname.indexOf("/noticies")==-1) {
      goUp();
  }
  return;
});
$("#menu-logo").click(function(e){
	goUp();
});
function goDown(){
	$("body").css("overflow", "auto");
	CONTENT_STATE = true;
  $("#contentloader").addClass('contentvisible');
	$("html, body").animate({ scrollTop: $(".menu-div").offset().top }, 1000, 'easeInOutQuart',  function(){
	$(".menu-div ul").animate({ 'margin-left': "0" }, 400, function(){
	$("#menu-logo").animate({ opacity: 1.0 });});});
}
function goUp(){
  window.history.pushState(null, "", "/");
	$("body").css("overflow", "hidden");
	CONTENT_STATE = false;
	$("html, body").animate({ scrollTop: 0 }, 1000,'easeInOutQuart', function(){
  $("#contentloader").removeClass('contentvisible');
	$("#menu-logo").animate({ opacity: 0 }, 400, function(){
	$(".menu-div ul").animate({ 'margin-left': "-80px" });});});

}
