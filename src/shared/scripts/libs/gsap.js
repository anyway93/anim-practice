import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function gsapInit() {
  console.log("GSAP init");
  gsap.registerPlugin(ScrollTrigger);


  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".container",
      pin: true,
      start: "top top",
      end: "+=800",
      scrub: 1,
    },
  });

  tl.to(".box", {
    rotate: 360,
    scale: 2,
    backgroundColor: "#f59e0b",
    duration: 2,
  }).to(".box", {
    duration: 2,
  });

  gsap.to(".rotate-box", {
    scrollTrigger: {
      trigger: ".rotate-box",
      start: "top 80%",
    },
    rotate: 720,
    scale: 1.5,
    duration: 2,
    ease: "power2.inOut",
  });




  gsap.to(".line-expand", {
    scrollTrigger: {
      trigger: ".line-expand",
      start: "top 70%",
    },
    width: "80%",
    duration: 1,
    ease: "power1.inOut",
  });


  gsap.utils.toArray(".item").forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
      },
      y: 100,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: "back.out(1.7)",
    });
  });
}
