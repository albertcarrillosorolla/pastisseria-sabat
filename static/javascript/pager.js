$(function () {
  $("a[data-role='ajax']").click(function (e) {
    alert("pager caught!");
    if (Modernizr.history) {
        e.preventDefault();
        var pageName = $(this).attr("href");
        $.get(pageName, function (response) {
          page++;
          var markup = $("<div>" + response + "</div>");
          var fragment = markup.find("#contentloader").html();
          $("contentloader").append(fragment);
        }
        window.history.pushState(null, "", pageName);
        //navigateToPage();
    }
});});
