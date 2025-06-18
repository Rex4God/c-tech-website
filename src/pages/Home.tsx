import banner from "../assets/home-banner.png";

function Home() {
  return (
    <section className="home" id="home">
      <h1>Welcome to C-Tech</h1>
      <p>A place where learning is made easy through tech-driven education</p>
      <img src={banner} alt="C-Tech Banner" className="home-banner" />
      <div className="infographic">
        <div>
          <h3>50+</h3>
          <p>Students Trained</p>
        </div>
        <div>
          <h3>20+</h3>
          <p>Courses Offered</p>
        </div>
        <div>
          <h3>15+</h3>
          <p>Expert Instructors</p>
        </div>
      </div>
    </section>
  );
}

export default Home;