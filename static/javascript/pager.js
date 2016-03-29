  function getPageName() {
      var pathName = window.location.pathname;
      var pageName = "";
      if (pathName.indexOf("/") != -1) {
          pageName = pathName.split("/").pop();
          pageName =pathName;
      } else {
          pageName = pathName;
      }
      return pageName;
  }
  function navigateToPage(page) {
     var pageName = page;
     $.get(pageName, function (response) {
          var markup = $("<div>" + response + "</div>");
        	var fragment = markup.find("#contentloader").html();
  				$("#contentloader").fadeOut('fast',function(){$("#contentloader").html(fragment).fadeIn();});
     });
  	 if(pageName!=""){
  		 	goDown();
  	 }
  }
$("a[data-role='ajax']").click(function (e) {
    if (Modernizr.history) {
        e.preventDefault();
        var pageName = $(this).attr("href");
        window.history.pushState(null, "", pageName);
        navigateToPage(pageName);
    }
});


$(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
  event.preventDefault();
  if(window.location.pathname.indexOf("/noticies")!=-1 && noticiaLoaded)
  {
    noticiaLoaded = false;
    setTimeout(function(){noticiaLoaded = true;}, 2000);
    var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
    if(delta<0) {
      var numPage = 1;
      if(window.location.href.indexOf("page-")!=-1)
      {
        numPage = parseInt(window.location.href.split("page-")[1].split("/")[0]);
      }
      if ($(".next-page")[0]){
        var pageName = "/noticies/page-"+(numPage+1);
        window.history.pushState(null, "", pageName);
        navigateToPage(pageName);
      }
  }else {
    var numPage = 1;
    if(window.location.href.indexOf("page-")!=-1)
    {
      numPage = parseInt(window.location.href.split("page-")[1].split("/")[0]);
    }
    if ($(".back-page")[0]){
      var pageName = "/noticies/page-"+(numPage-1);
      if(numPage-1 == 1)
        pageName = "/noticies";
      window.history.pushState(null, "", pageName);
      navigateToPage(pageName);
    }else {
      goUp();
    }
  }
  return;
}});
