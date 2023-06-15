import React, { useState, useRef, useEffect } from "react";
import "./footer.css";

function Footer() {
  const [showAlternateFooter, setShowAlternateFooter] = useState(false);
  const [buttonText, setButtonText] = useState("Support ▲");
  const footerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const toggleFooter = () => {
    setShowAlternateFooter(!showAlternateFooter);
    if (showAlternateFooter) {
      setButtonText("Support ▲");
      scrollToTop();
    } else {
      setButtonText("Support ▼");
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    scrollContainerRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (showAlternateFooter && footerRef.current) {
      footerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [showAlternateFooter]);

  const renderFooterContent = () => {
    if (showAlternateFooter) {
      return (
        <>
          <ul className="displayedListFooter">
            <li className="displayedListFooterItem">
              Support
              <ul className="displayedSubListFooter">
                <li>
                  <a href="">Help Center</a>
                </li>
                <li>
                  <a href="">Help with a safety issue</a>
                </li>
                <li>
                  <a href="">Cancellation options</a>
                </li>
              </ul>
            </li>
            <li className="displayedListFooterItem">
              Community
              <ul className="displayedSubListFooter">
                <li>
                  <a href="">Combating discrimination</a>
                </li>
                <li>
                  <a href="">Visit our community forum</a>
                </li>
              </ul>
            </li>
            <li className="displayedListFooterItem">
              Hosting
              <ul className="displayedSubListFooter">
                <li>
                  <a href="">Airbngig your home</a>
                </li>
                <li>
                  <a href="">Cover for Hosts</a>
                </li>
                <li>
                  <a href="">Explore hosting resources</a>
                </li>
                <li>
                  <a href="">How to host responsibly</a>
                </li>
                <li>
                  <a href="">Airbngig-friendly apartments</a>
                </li>
              </ul>
            </li>
            <li className="displayedListFooterItem">
              Airbngig
              <ul className="displayedSubListFooter">
                <li>
                  <a href="">Newsroom</a>
                </li>
                <li>
                  <a href="">Letter from our founders</a>
                </li>
                <li>
                  <a href="">Careers</a>
                </li>
                <li>
                  <a href="">Investors</a>
                </li>
                <li>
                  <a href="">Gift cards</a>
                </li>
              </ul>
            </li>
          </ul>
        </>
      );
    } else {
      return (
        <ul className="undisplayedListFooter">
          <div className="iconItems">
            <li className="icon">
              <a href="https://www.facebook.com/">
                <img
                  style={{
                    height: "30px",
                    backgroundColor: "white",
                    padding: "2px",
                    borderRadius: "50%",
                  }}
                  src="..//icons/icons8-facebook.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="icon">
              <a href="https://twitter.com/">
                <img
                  style={{
                    height: "30px",
                    backgroundColor: "white",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                  src="..//icons/icons8-twitter.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="icon">
              <a href="https://www.instagram.com/">
                <img
                  style={{
                    height: "30px",
                    backgroundColor: "white",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                  src="..//icons/icons8-instagram.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="icon">
              <a href="https://github.com/">
                <img
                  style={{
                    height: "30px",
                    backgroundColor: "white",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                  src="..//icons/icons8-github.svg"
                  alt=""
                />
              </a>
            </li>
          </div>
          <div className="noIconItems">
            <li>
              · <a href="">Terms</a>
            </li>
            <li>
              · <a href="">Sitemap</a>
            </li>
            <li>
              · <a href="">Privacy</a>
            </li>
            <li>
              · <a href="">Your Privacy Choices</a>
            </li>
          </div>
        </ul>
      );
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="megaContainer">
      <div
        className={`footer ${showAlternateFooter ? "expanded" : ""}`}
        ref={footerRef}
      >
        <p
          className={showAlternateFooter ? "undisplayedText" : "displayedText"}
        >
          ©{currentYear} Airbngig
        </p>
        <div className="footerSecondary" ref={scrollContainerRef}>
          {renderFooterContent()}
        </div>
        <div>
          <button className="buttonNegative" onClick={toggleFooter}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
