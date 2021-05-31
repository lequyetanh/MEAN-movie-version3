// // const { $ } = require("protractor");

// $(document).ready(function(){
//   setTimeout(function () {
//     // var auto = setInterval(function(){
//     //   $('#btn-next').trigger('click');
//     // },3000);
//     console.log("ahihi");

//     $('#btn-next').click(function(event) {
//       console.log("next")
//       var slide_sau = $('.slide-active').next();
//       var nut_sau = $('.active_nut').next();
//       if(slide_sau.length!=0){
//         $('.slide-active').addClass('bienmatbentrai').one('webkitAnimationEnd',function(event){
//           $('.bienmatbentrai').removeClass('bienmatbentrai').removeClass('slide-active');
//         });
//         slide_sau.addClass('slide-active').addClass('divaobenphai').one('webkitAnimationEnd',function(event){
//           $('.divaobenphai').removeClass('divaobenphai');
//         });
//         $('ul li').removeClass('active_nut');
//         nut_sau.addClass('active_nut');
//       }
//       else{
//         $('.slide-active').addClass('bienmatbentrai').one('webkitAnimationEnd',function(event){
//           $('.bienmatbentrai').removeClass('bienmatbentrai').removeClass('slide-active');
//         });
//         $('.slide:first-child').addClass('slide-active').addClass('divaobenphai').one('webkitAnimationEnd',function(event){
//           $('.divaobenphai').removeClass('divaobenphai');
//         });
//         $('ul li').removeClass('active_nut');
//         $('ul li:first-child').addClass('active_nut');
//       }
//     });

//     $('#btn-prev').click(function(event) {
//       console.log("previous")
//       var slide_truoc = $('.slide-active').prev();
//       var nut_truoc = $('.active_nut').prev();
//       if(slide_truoc.length!=0){
//         $('.slide-active').addClass('bienmatbenphai').one('webkitAnimationEnd',function(event){
//           $('.bienmatbenphai').removeClass('bienmatbenphai').removeClass('slide-active');
//         });
//         slide_truoc.addClass('slide-active').addClass('divaobentrai').one('webkitAnimationEnd',function(event){
//           $('.divaobentrai').removeClass('divaobentrai');
//         });
//         $('ul li').removeClass('active_nut');
//         nut_truoc.addClass('active_nut');
//       }
//       else{
//         $('.slide-active').addClass('bienmatbenphai').one('webkitAnimationEnd',function(event){
//           $('.bienmatbenphai').removeClass('bienmatbenphai').removeClass('slide-active');
//         });
//         $('.slide:last-child').addClass('slide-active').addClass('divaobentrai').one('webkitAnimationEnd',function(event){
//           $('.divaobentrai').removeClass('divaobentrai');
//         });
//         $('ul li').removeClass('active_nut');
//         $('ul li:last-child').addClass('active_nut');
//       }
//     });

//     $('ul li').click(function(event){
//       console.log("12");
//       var current_nut = $('.active_nut').index()+1;
//       var click_nut = $(this).index()+1;
//       $('ul li').removeClass('active_nut');
//       $(this).addClass('active_nut');
//       if(click_nut>current_nut){
//         $('.slide-active').addClass('bienmatbentrai').one('webkitAnimationEnd',function(event){
//           $('.bienmatbentrai').removeClass('bienmatbentrai').removeClass('slide-active');
//         });
//         $('.slide:nth-child('+click_nut+')').addClass('slide-active').addClass('divaobenphai').one('webkitAnimationEnd',function(event){
//           $('.divaobenphai').removeClass('divaobenphai');
//         });
//       }
//       if(click_nut<current_nut){
//         $('.slide-active').addClass('bienmatbenphai').one('webkitAnimationEnd',function(event){
//           $('.bienmatbenphai').removeClass('bienmatbenphai').removeClass('slide-active');
//         });
//         $('.slide:nth-child('+click_nut+')').addClass('slide-active').addClass('divaobentrai').one('webkitAnimationEnd',function(event){
//           $('.divaobentrai').removeClass('divaobentrai');
//         });
//       }
//     });

//   },2000);
// });
// =====================================================================snow===============================================================
$(document).ready(function () {
  $("canvas.flare").let_it_snow({
    windPower: 0,
    speed: 0,
    color: "#392F52",
    size: 120,
    opacity: 0.00000001,
    count: 40,
    interaction: false
  });

  $("canvas.snow").let_it_snow({
    windPower: 4,
    speed: 1,
    count: 250,
    size: 0
  });

  $(".snowWindPower").on("change", function () {
    $("canvas.snow").trigger("letItSnow", ["windPower", parseInt($(this).val())]);
  });
});
// ======================================================================santa==============================================================
var textSpeed = 2;
var contentWidth;
var contentHeight;
var xMax;
var yMax;
var xPos = 0;
var yPos = 0;
var xDir = 'right';
var yDir = 'down';

function initializeText() {
  if (typeof window.innerWidth != 'undefined') {
    xMax = window.innerWidth;
    yMax = window.innerHeight;
  } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !=
    'undefined' && document.documentElement.clientWidth != 0) {
    xMax = document.documentElement.clientWidth;
    yMax = document.documentElement.clientHeight;
  } else {
    xMax = document.getElementsByTagName('body')[0].clientWidth;
    yMax = document.getElementsByTagName('body')[0].clientHeight;
  }
  var supertext = document.getElementById('supertext');
  contentWidth = supertext.offsetWidth;
  contentHeight = supertext.offsetHeight;
  setTimeout('moveText()', 400);
}

function moveText() {
  var supertext = document.getElementById('supertext');
  calculatePosition();
  supertext.style.left = xPos + document.body.scrollLeft + "px";
  supertext.style.top = yPos + document.body.scrollTop + "px";
  animatetext = setTimeout('moveText()', 20);
}

function calculatePosition() {
  if (xDir == "right") {
    if (xPos > (xMax - contentWidth - textSpeed)) {
      xDir = "left";
    }
  } else if (xDir == "left") {
    if (xPos < (0 + textSpeed)) {
      xDir = "right";
    }
  }
  if (yDir == "down") {
    if (yPos > (yMax - contentHeight - textSpeed)) {
      yDir = "up";
    }
  } else if (yDir == "up") {
    if (yPos < (0 + textSpeed)) {
      yDir = "down";
    }
  }
  if (xDir == "right") {
    xPos = xPos + textSpeed;
  } else if (xDir == "left") {
    xPos = xPos - textSpeed;
  } else {
    xPos = xPos;
  }
  if (yDir == "down") {
    yPos = yPos + textSpeed;
  } else if (yDir == "up") {
    yPos = yPos - textSpeed;
  } else {
    yPos = yPos;
  }
}
setTimeout('initializeText()', 700);

function closebandera() {
  div = document.getElementById('closeit');
  div.style.display = 'none';
}
setTimeout(closebandera, 900000);
