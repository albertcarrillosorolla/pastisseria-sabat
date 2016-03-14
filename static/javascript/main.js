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
   $.get(pageName, function (response) {
        var markup = $("<div>" + response + "</div>");
      	var fragment = markup.find("#contentloader").html();
				$("#contentloader").fadeOut('fast',function(){$("#contentloader").html(fragment).fadeIn();});

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
  var pageName = window.location.pathname;
	if(pageName!="/"){
		goDown();
 }
});

});


var CONTENT_STATE = false;
var lastScrollTop = 0;
$(window).on('scroll', function() {
    st = $(this).scrollTop();
    if(CONTENT_STATE && st < lastScrollTop) {
        goUp();
    }
    lastScrollTop = st;
    return;
});

$("#menu-logo").click(function(e){
	goUp();
});

function goDown(){
	$("body").css("overflow", "auto");
	CONTENT_STATE = true;
	$("html, body").animate({ scrollTop: $(".menu-div").offset().top }, 1000, 'easeInOutQuart',  function(){
	$(".menu-div ul").animate({ 'margin-left': "0" }, 400, function(){
	$("#menu-logo").animate({ opacity: 1.0 });});});
}
function goUp(){
	$("body").css("overflow", "hidden");
	CONTENT_STATE = false;
	$("html, body").animate({ scrollTop: 0 }, 1000,'easeInOutQuart', function(){
	$("#menu-logo").animate({ opacity: 0 }, 400, function(){
	$(".menu-div ul").animate({ 'margin-left': "-80px" });});});
	$("#contentloader").fadeOut();
}
