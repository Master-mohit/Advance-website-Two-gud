function locomotice(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotice()

gsap.to("#nav-part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: 1.5,
    },
  });
  gsap.to("#nav-part3 a", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: 1.5,
    },
  });

  gsap.to("#emoji2 svg",{
      y:-70,
     duration: 0.7,
     delay: 1,
    scrollTrigger: {
        trigger: "#page7",
        scroller: "#main",
        // markers: true,
        start: "top 70%",
        end : "top -5%",
        scrup: 1.5,
        stagger: 2,
    }
  })

function video(){
    var video = document.querySelector("#video")
var play = document.querySelector("#play")
video.addEventListener("mouseenter", function(){
    gsap.to(play,{
        opacity: 1,
        scale: 1,
    })
}) 
video.addEventListener("mouseleave", function(){
    gsap.to(play,{
        opacity: 0,
        scale: 0,
    })
})
video.addEventListener("mousemove", function(dets){
      gsap.to(play, {
        left:dets.x-80,
        top:dets.y-80
      })
})
}
video()
function textanimation(){
    gsap.from("#page1 #video", {
        opacity: 0,
        duration: 0.9,
        delay: 1.5,
        scale: 0.8,
    })
    gsap.from("#page1 h1", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 1,
        stagger: 0.2
    })
}
textanimation()

function cursoranimation(){
    document.querySelectorAll(".box").forEach(function(elem){
        elem.addEventListener("mouseenter", function(){
            gsap.to("#cursor", {
                scale: 1,
            })
     })
    
        elem.addEventListener("mouseleave", function(){
            gsap.to("#cursor", {
                scale: 0,
            })
        })
    })
    
    document.addEventListener("mousemove", function(dets){
        gsap.to("#cursor",{
            left:dets.x,
            top:dets.y
        })
    })
}
cursoranimation()