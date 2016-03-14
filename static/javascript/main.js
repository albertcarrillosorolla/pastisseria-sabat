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
       $("#contentloader").html(fragment);
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
	$("html, body").animate({ scrollTop: $(".menu-div").offset().top }, 1000);
	$("#menu-logo").animate({width:'50px'},800, function(){
		$("#menu-logo").fadeIn().css("display","inline-block");
	});
}
function goUp(){
	$("body").css("overflow", "hidden");
	CONTENT_STATE = false;
	$("#menu-logo").fadeOut(800, function(){$("#menu-logo").animate({width:'0px'},1000)});
	$("html, body").animate({ scrollTop: 0 }, 1000);
}

/*


var CONTENT_STATE = false;
$("#tradiciolink").click(function(e){
	$("#contentloader").fadeOut("fast", function(){$("#contentloader").load("tradicioqualitat", function(response, status, xhr) {$(this).fadeIn();});});
	goDown();
});
$("#creacionslink").click(function(e){
	$("#contentloader").fadeOut("fast", function(){$("#contentloader").load("lesnostrescreacions", function(response, status, xhr) {$(this).fadeIn();});});
	goDown();
});
$("#establimentslink").click(function(e){
	$("#contentloader").fadeOut("fast", function(){$("#contentloader").load("establiments", function(response, status, xhr) {$(this).fadeIn();});});
	goDown();
});
$("#noticieslink").click(function(e){
	$("#contentloader").fadeOut("fast", function(){$("#contentloader").load("noticies", function(response, status, xhr) {$(this).fadeIn();});});
	goDown();
});
$("#contactalink").click(function(e){
	$("#contentloader").fadeOut("fast", function(){$("#contentloader").load("contacta", function(response, status, xhr) {$(this).fadeIn();});});
	goDown();
});
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
	$("html, body").animate({ scrollTop: $(".menu-div").offset().top }, 1000);
	$("#menu-logo").animate({width:'50px'},800, function(){
		$("#menu-logo").fadeIn().css("display","inline-block");
	});
}
function goUp(){
	$("body").css("overflow", "hidden");
	CONTENT_STATE = false;
	$("#menu-logo").fadeOut(800, function(){$("#menu-logo").animate({width:'0px'},1000)});
	$("html, body").animate({ scrollTop: 0 }, 1000);
}*/
