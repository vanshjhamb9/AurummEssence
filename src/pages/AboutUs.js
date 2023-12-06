import React, { useEffect } from "react"

import FoundingStory from "../assets/Images/4 Things You Need To Know About Vitamin C Serums.jpeg"
import BannerImage1 from "../assets/videos/Skincare but make it ASMR 🔈.mp4"
// import BannerImage2 from "../assets/Images/aboutus2.webp"
// import BannerImage3 from "../assets/Images/aboutus3.webp"
// import Footer from "../components/common/Footer"
import ContactFormSection from "../components/Contactpage/CotactForm"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/Home/HighlightText"
import ReviewSlider from "../components/common/ReviewSlider"
import Footer from "../components/common/Footer"
import Banner from "../assets/videos/Cosmetics Product Video Example  Glossier  Vidico.mp4"
import Banner2 from "../assets/videos/Pre-created footage for beauty and skin care commercials and promo videos.mp4"
import 'intersection-observer';



const About = () => {

    useEffect(() => {
        // Get both video elements
        const video1 = document.getElementById("video1");
        const video2 = document.getElementById("video2");
    
        // Function to play/pause video based on scrolling
        const playPauseVideo = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.paused) {
              entry.target.play();
            } else if (!entry.isIntersecting && !entry.target.paused) {
              entry.target.pause();
            }
          });
        };
    
        // Create an intersection observer for video1
        const observer1 = new IntersectionObserver(playPauseVideo, { threshold: 0.2 });
        observer1.observe(video1);
    
        // Create an intersection observer for video2
        const observer2 = new IntersectionObserver(playPauseVideo, { threshold: 0.2 });
        observer2.observe(video2);
    
        // Clean up the observers when the component unmounts
        return () => {
          observer1.disconnect();
          observer2.disconnect();
        };
      }, []);

  return (
    <div>
      <section className="bg-peach-600 ">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white"
       >
       <video
                loop
                autoPlay
                poster=""
                className='mt-10 p-20'
                controls
                id="video1"
            >
                <source src={Banner} type="video/mp4" />
            </video>
          <header className="mx-auto text-bistre text-4xl xs:text-3xl font-semibold lg:w-[60%] sm:w-[50%] xs:w-[95%]">
          Welcome to Aurumm Essence Naturals: 
            <HighlightText text={"Where Beauty Embraces Nature!"} />
            <p className="mx-auto mt-10 text-center text-base font-inter text-pink-900  lg:w-[90%] sm:w-full xs:w-full">
            Indulge in the purity of natural skincare. Each product is a love letter to your skin, crafted with the finest botanicals to unveil your radiant beauty.
            </p>
          </header>
          <div className="sm:h-[70px] xs:h-[140px] md:h-[130px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid md:w-[100%] sm:w-[50%] xs:w-[90%] translate-x-[-50%] translate-y-[30%] lg:grid-cols-3 md:grid-cols-3 md:grid-rows-1 sm:grid-rows-2 sm:grid-cols-2 xs:grid-rows-2 xs:grid-cols-2  gap-3 lg:gap-5">
            {/* <video src={BannerImage1} alt="" /> */}
            <img src={"BannerImage2"} alt="" />
            <img className="md:ml-0 xs:ml-[50%]  " src={""} alt="" />
          </div>
        </div>
      </section>
      <div>
        <img src="https://image.wconcept.co.kr/images/img/event/20200219_theordinary/pc/section01.jpg" /> 
      </div>

      <section className="border-b border-bistre">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 mt-5 max-w-maxContent flex-col justify-evenly gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row space-x-28   justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              Our journey began with a profound belief that skincare should be a celebration of nature's elegance. Aurumm Essence Naturals emerged as a testament to the synergy between botanical wonders and the quest for radiant beauty.

In the heart of our creation are the stories of herbs and the ancient secrets they hold. Each product is a crafted narrative, a blend of tradition and innovation, resonating with the timeless beauty found in the lap of nature.

At Aurumm Essence, we strive to create more than skincare products; we weave an enchanting tale. A tale where your skin becomes a canvas, painted with the pure goodness of herbs, free from harsh chemicals.

Discover the magic in every drop, the harmony in every bottle, and embark on a skincare journey that is not just a routine but a ritual—a symphony that echoes the rhythm of your skin.
              </p>
            </div>

            <div>
              <img
              width="70%"
                src={FoundingStory}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#bd2fff] to-[#6b19f0] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-bistre lg:w-[95%]">
              In the heart of our vision lies a commitment to redefine skincare, transcending the boundaries between nature and beauty. At Aurumm Essence Naturals, we envisioned more than a skincare line; we saw an opportunity to embrace the purity of nature in every drop.

Our journey began with the passionate belief that skincare is an art, and nature holds the palette. With this guiding light, we embarked on a quest to curate a collection that resonates with the spirit of holistic beauty.

At Aurumm Essence, our vision extends beyond products; it is a celebration of radiant skin, a symphony of botanical wonders. Join us on this journey where skincare becomes an intimate connection with nature.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#611627] via-[#090a4b] to-[#a6fff8] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our Mission
              </h1>
              <p className="text-base font-medium text-bistre lg:w-[95%]">
              Our mission at Aurumm Essence Naturals transcends the conventional boundaries of skincare. Beyond crafting exceptional products, we aspire to cultivate a thriving community of individuals united by the pursuit of radiant, natural beauty.

More than delivering skincare solutions, we are on a quest to foster a vibrant ecosystem of learners and enthusiasts. In this community, connections are forged, collaborations blossom, and the art of skincare becomes a shared dialogue.

At Aurumm Essence Naturals, every product is a testament to our commitment to empower, inspire, and celebrate the essence of beauty.</p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet />
      <section className=" mx-auto my-28  flex w-11/12 max-w-maxContent flex-col justify-between space-y-20 gap-24 text-bistre">
      <div className='mx-36  relative lg:w-[985px] lg:h-[540px] sm:w-[488px] xs-[370px] my-28 mt-9  shadow-[30px_100px_7px_20px_rgb(0,0,0,0.1)] lg:shadow-bistre'>    
  <video
                loop
                autoPlay
                poster=""
                className='mt-14   '
                controls
                muted={false}
                id="video2"
            >
                <source src={Banner2} type="video/mp4" />
            </video>
            </div>
        <ContactFormSection />
      </section>

      <div className="relative mx-auto my-400 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-bistre text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
        <div className="w-full mx-auto"> 
        <ReviewSlider/>
        </div>
      </div>
      {/* <Footer /> */}
      <Footer/>
    </div>
  )
}

export default About