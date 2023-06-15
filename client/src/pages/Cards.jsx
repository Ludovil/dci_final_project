import "./cards.css";
function Cards() {
  return (
    <div className="card-page">
      <div className="home-card">
        <h2>What is airbngig ?</h2>
        <p>
          AirBnGig is a platform designed to connect amateur musicians with
          accommodations for both sleeping and gear needs.
        </p>
        <div className="home-logo">
          <img
            src="../public/airbngig-low-resolution-logo-black-on-transparent-background.png"
            alt=""
          />
        </div>
      </div>
      <div className="home-card">
        <h2>Why airbngig ?</h2>
        <p>
          One of the biggest challenges for musicians traveling to perform in
          unfamiliar cities is finding affordable and comfortable
          accommodations.
        </p>
        <div className="home-logo">
          <img
            src="../public/airbngig-low-resolution-logo-black-on-transparent-background.png"
            alt=""
          />
        </div>
      </div>
      <div className="home-card">
        <h2>How airbngig works ? </h2>
        <p>
          Simply input the address of your upcomming venue and discover fellow
          musicians in close proximity.
        </p>
        <div className="home-logo">
          <img
            src="../public/airbngig-low-resolution-logo-black-on-transparent-background.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Cards;
