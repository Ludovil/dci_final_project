import "./about.css";
function About() {
  return (
    <>
      <div className="page about">
        <h2 className="main-about-title">
          Unleash your Music. Embrace the Community
        </h2>
        <div className="about-container">
          <h2 className="main-about-title-column">
            Unleash your Music. Embrace the Community
          </h2>
          <div className="about-sub-container">
            <div className="imageContainer">
              <img src="../public/about-pic-1.jpg" alt="" />
            </div>
            <div className="textContainer">
              <h3 className="sub-about-title">Comfortable accommodations</h3>
              <p className="text-about">
                One of the biggest challenges for musicians traveling to perform
                in unfamiliar cities is finding affordable and comfortable
                accommodations. 'airbngig' addresses this issue by providing a
                platform for musicians to find suitable places to sleep during
                their trips. Hosts who are also musicians or music enthusiasts
                can offer their spare rooms or couches, creating a welcoming and
                affordable environment for musicians to stay. This not only
                saves costs but also fosters a sense of community among
                musicians.
              </p>
            </div>
          </div>
          <div className="about-sub-container">
            <div className="imageContainer">
              <img src="../public/about-pic-2.jpg" alt="" />
            </div>
            <div className="textContainer">
              <h3 className="sub-about-title">Equipment and instruments</h3>
              <p className="text-about">
                Amateur musicians no longer need to worry about transporting
                their gear to distant locations. The app allows musicians to
                connect with hosts who offer a variety of musical equipment and
                instruments for rent. Whether it's a drum kit, guitar amps, or a
                keyboard, musicians can easily find and rent the gear they need
                to perform, saving them the hassle and expense of transporting
                their own equipment across long distances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;