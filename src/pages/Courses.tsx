import webDevImg from "../assets/web-dev.jpeg";
import mobileAppImg from "../assets/mobile-app.jpeg";
import uxImg from "../assets/ux.avif";
import digitalLiteracyImg from "../assets/digital-literacy.jpeg";

function Courses() {
  return (
    <section className="services" id="services">
      <h2>Courses</h2>
      <div className="card-container">
        <div className="card">
          <img src={webDevImg} alt="Web Development" />
          <h4>Web Development</h4>
          <p>
            C-Tech offers beginner to advanced training in web development.
            Students learn how to build responsive and dynamic websites using HTML, CSS, JavaScript, and modern frameworks like React.
            The course emphasizes hands-on projects to ensure practical understanding.
          </p>
        </div>
        <div className="card">
          <img src={mobileAppImg} alt="Software Development" />
          <h4>Software Development</h4>
          <p>
            C-Tech provides comprehensive training in software development, covering both front-end and back-end technologies.
            Students learn to create robust applications using languages like Java, and JavaScript.
            The course includes real-world projects to build a strong portfolio.
          </p>
        </div>
        <div className="card">
          <img src={uxImg} alt="UI/UX Design" />
          <h4>UI/UX Design</h4>
          <p>
            C-Tech's UI/UX Design course focuses on creating user-centered designs through a blend of theoretical knowledge and practical application.
            Students learn design thinking, prototyping, and user testing to build intuitive and engaging digital experiences.
          </p>
        </div>
        <div className="card">
          <img src={digitalLiteracyImg} alt="Digital Literacy" />
          <h4>Digital Literacy Programs</h4>
          <p>
            C-Tech offers digital literacy programs aimed at equipping individuals with essential tech skills.
            The curriculum covers basic computer skills, internet navigation, and online safety, ensuring participants are confident in the digital world.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Courses;