import { Link } from "react-router-dom";
import "./About.scss";

const About = () => {
  return (
    <div className="about">
      <div className="main">
        <div className="logo">
          <Link to={"/"}  >
            <div className="homeLogo">
              <img src="/logo.svg" alt="" />
            </div>
          </Link>
        </div>
        <div className="abody">
          <div className="item1">
            <div className="aboutUs">About Us</div>
            <ul>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Our Story</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Mission & Vision</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Core Values</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Our Team</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Why Choose Us</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Customer Testimonials</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Partners</li>
              </a>
            </ul>
          </div>
          <div className="item1">
            <div className="aboutUs">Policies</div>
            <ul>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Terms of Service</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Privacy Policy</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Refund & Cancellation Policy</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Travel Insurance Policy</li>
              </a>
            </ul>
          </div>
          <div className="item1">
            <div className="aboutUs">Navigation Links</div>
            <ul>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Home</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Destination</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Hotels</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Blog</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Contact Us</li>
              </a>
            </ul>
          </div>
          <div className="item1">
            <div className="aboutUs">Help Center</div>
            <ul>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>FAQs</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Customer Support</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Booking Assistance</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Account Management</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Payment Issues</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Technical Support</li>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <li>Travel Tips</li>
              </a>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <div>©2026 TRAVEL.COM</div>
          <div>
            <a href="https://www.youtube.com/" className="icon11" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2247"><path d="M426.666667 682.666667V384l256 149.845333L426.666667 682.666667z m587.093333-355.541334s-10.026667-71.04-40.704-102.357333c-38.954667-41.088-82.602667-41.258667-102.613333-43.648C727.168 170.666667 512.213333 170.666667 512.213333 170.666667h-0.426666s-214.954667 0-358.229334 10.453333c-20.053333 2.389333-63.658667 2.56-102.656 43.648-30.677333 31.317333-40.661333 102.4-40.661333 102.4S0 410.538667 0 493.952v78.293333c0 83.456 10.24 166.912 10.24 166.912s9.984 71.04 40.661333 102.357334c38.997333 41.088 90.154667 39.765333 112.938667 44.074666C245.76 893.568 512 896 512 896s215.168-0.341333 358.442667-10.752c20.053333-2.432 63.658667-2.602667 102.613333-43.690667 30.72-31.317333 40.704-102.4 40.704-102.4s10.24-83.413333 10.24-166.869333v-78.250667c0-83.456-10.24-166.912-10.24-166.912z" p-id="2248"></path></svg>
            </a>
            <a href="https://www.facebook.com/" className="icon12" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4871"><path d="M849.92 51.2H174.08c-67.8656 0-122.88 55.0144-122.88 122.88v675.84c0 67.8656 55.0144 122.88 122.88 122.88h265.1904v-347.56608h-119.552v-127.0272h119.552V413.70112c0-139.9296 68.17792-201.344 184.47872-201.344 55.69536 0 85.17632 4.1216 99.10784 6.00576V329.216H643.5328c-49.36192 0-66.60096 46.79168-66.60096 99.56352v69.43232h144.70656l-19.6352 127.0272h-125.04576V972.8H849.92c67.8656 0 122.88-55.0144 122.88-122.88V174.08c0-67.8656-55.0144-122.88-122.88-122.88z" p-id="4872"></path></svg>
            </a>
            <a href="https://x.com/" className="icon13" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6742"><path d="M761.759375 122h132.320625L605 452.4003125 945.08 902H678.8L470.24 629.3196875 231.599375 902H99.2l309.1996875-353.4L82.16 122h273.0403125l188.52 249.24z m-46.4390625 700.8h73.32L315.359375 197.0403125h-78.680625z" p-id="6743"></path></svg>
            </a>
            <a href="https://www.instagram.com/" className="icon14" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8806"><path d="M511.972 298.682c-117.701 0-212.695 94.994-212.695 212.698 0 117.701 94.994 212.695 212.695 212.695 117.705 0 212.695-94.994 212.695-212.695 0-117.704-94.991-212.698-212.695-212.698z m0 350.931c-76.118 0-138.237-62.117-138.237-138.232 0-76.119 62.118-138.237 138.237-138.237s138.237 62.118 138.237 138.237c0 76.115-62.119 138.232-138.237 138.232z m221.404-409.212c-27.478 0-49.672 22.194-49.672 49.677 0 27.48 22.194 49.672 49.672 49.672 27.484 0 49.677-22.087 49.677-49.672a49.628 49.628 0 0 0-14.532-35.144 49.636 49.636 0 0 0-35.145-14.533z m193.2 270.98c0-57.243 0.518-113.97-2.694-171.112-3.217-66.367-18.356-125.272-66.889-173.806-48.636-48.636-107.435-63.674-173.807-66.886-57.244-3.217-113.97-2.698-171.107-2.698-57.245 0-113.971-0.518-171.113 2.698-66.366 3.212-125.272 18.352-173.806 66.886-48.636 48.636-63.673 107.439-66.886 173.806-3.217 57.245-2.698 113.97-2.698 171.112 0 57.138-0.518 113.966 2.698 171.109 3.212 66.371 18.352 125.272 66.886 173.806 48.636 48.636 107.44 63.673 173.806 66.89 57.245 3.212 113.971 2.694 171.113 2.694 57.245 0 113.965 0.518 171.107-2.694 66.372-3.217 125.274-18.357 173.807-66.89 48.635-48.636 63.672-107.435 66.889-173.806 3.319-57.143 2.694-113.865 2.694-171.109z m-91.259 244.528c-7.568 18.875-16.695 32.978-31.315 47.497-14.626 14.622-28.623 23.749-47.497 31.321-54.551 21.67-184.072 16.796-244.533 16.796-60.457 0-190.085 4.874-244.635-16.695-18.874-7.571-32.977-16.694-47.497-31.32-14.621-14.621-23.748-28.617-31.316-47.492-21.573-54.653-16.7-184.179-16.7-244.635 0-60.46-4.874-190.088 16.7-244.634 7.568-18.875 16.695-32.978 31.316-47.497 14.626-14.519 28.623-23.749 47.497-31.321 54.551-21.568 184.179-16.694 244.635-16.694 60.461 0 190.089-4.874 244.635 16.694 18.874 7.572 32.977 16.695 47.497 31.321 14.621 14.621 23.748 28.622 31.32 47.497 21.569 54.546 16.695 184.174 16.695 244.634 0 60.456 4.874 189.982-16.802 244.528z m0 0" p-id="8807"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div >
  )
}

export default About