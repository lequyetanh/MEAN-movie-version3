 $(function(){
    $('html').append('<img id="halo" title="Happy Noel" style="cursor:pointer;position:fixed;z-index:99999" height="120" src="noel/ghost.gif"/>')
    setInterval(function(){
       var $X=Math.ceil(Math.random()*$(window).width())
       var $Y=Math.ceil(Math.random()*$(window).height())
       $('img#halo').animate({'left':$X,'top':$Y},5000)
    },5000)
    $('img#halo').click(function(){
        window.open('noel/noel.gif','')
    })
 })