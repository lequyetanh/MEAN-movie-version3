$(document).ready(function () {
  // ==========================================================================
  $(window).scroll(function () {
    var _scrollTop = $(window).scrollTop();
    if (_scrollTop > 59) {
      // console.log("fixed");
      $(".menu").addClass("fixed");
      // $(".header").addClass("fixed");
    } else {
      $(".menu").removeClass("fixed");
      // $(".header").removeClass("fixed");
    }
  });

  $(window).scroll(function () {
    var _scrollTop = $(window).scrollTop();
    if (_scrollTop > 59) {
      $(".adver1").addClass("fixed");
      $(".adver2").addClass("fixed");
    } else {
      $(".adver1").removeClass("fixed");
      $(".adver2").removeClass("fixed");
    }
  });
});
