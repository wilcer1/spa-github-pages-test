import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import '../style/Home.css';

function Home() {
  const boxRef = useRef();

  useEffect(() => {
    // gsap.fromTo(
    //   boxRef.current,
    //   { y: 100, autoAlpha: 0 },
    //   {
    //     duration: 2.5,
    //     y: 0,
    //     autoAlpha: 1,
    //     ease: "back",
    //     overwrite: "auto"
    //   }
    // );

    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.revealUp').forEach(function (elem) {
      ScrollTrigger.create({
        trigger: elem,
        start: 'top 70%',
        end: 'bottom 20%',
        onEnter: function () {
          gsap.fromTo(
            elem,
            { y: 100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: 'back',
              overwrite: 'auto',
            },
          );
        },
        onLeave: function () {
          gsap.fromTo(
            elem,
            { autoAlpha: 1 },
            { autoAlpha: 0, overwrite: 'auto' },
          );
        },
        onEnterBack: function () {
          gsap.fromTo(
            elem,
            { y: -100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: 'back',
              overwrite: 'auto',
            },
          );
        },
        onLeaveBack: function () {
          gsap.fromTo(
            elem,
            { autoAlpha: 1 },
            { autoAlpha: 0, overwrite: 'auto' },
          );
        },
      });
    });
  });

  return (
    <>
      <div className="box" ref={boxRef}>
        <h1 className="home">
          <span>
            There are no limits to what you can accomplish, except the limits
            you place on your own thinking.
          </span>
          <a href="/boka">
            <button className="HomeBooking">Boka</button>
          </a>
        </h1>
      </div>
      <div className="placeholder">
        <div className="revealUp">Testing</div>
      </div>
      <div className="placeholder2">
        <div className="revealUp">Glazers Out</div>
      </div>
    </>
  );
}

export default Home;
