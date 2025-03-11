import React, { useEffect, useState, useRef } from 'react';
import background from './photos/brad-neathery-nPy0X4xew60-unsplash.jpg';
import image1 from './photos/carl-heyerdahl-KE0nC8-58MQ-unsplash.jpg';
import image2 from './photos/simon-abrams-k_T9Zj3SE8k-unsplash.jpg';
import image3 from './photos/ian-schneider-TamMbr4okv4-unsplash.jpg';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Homepage() {
  const [activeSection, setActiveSection] = useState('#home');
  const sections = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const sectionKeys = Object.keys(sections.current);
      const currentSection = sectionKeys.find((key) => {
        const section = sections.current[key];
        const { top, bottom } = section.getBoundingClientRect();
        return top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2;
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        window.history.replaceState(null, '', currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return (

    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            weSkill
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a
                className={activeSection === '#home' ? 'nav-link active' : 'nav-link'}
                href="#home"
              >
                Home
              </a>
              <a
                className={activeSection === '#features' ? 'nav-link active' : 'nav-link'}
                href="#features"
              >
                Features
              </a>
              <a
                className={activeSection === '#about-us' ? 'nav-link active' : 'nav-link'}
                href="#about-us"
              >
                About Us
              </a>
            </div>
            <div className="ms-auto">
              <button type="button" className="btn btn-light mx-2">
                <Link to="/registerpage" style={{ textDecoration: 'none', color: 'black' }}>
                  Register
                </Link>
              </button>
              <button type="button" className="btn btn-dark">
              <Link to="/loginpage" style={{ textDecoration: 'none', color: 'white' }}>
              Login &rarr;
                </Link>
               
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section
          ref={(el) => (sections.current['#home'] = el)}
          id="home"
          className="min-vh-100 bg-light"
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            height: '100vh',
            margin: '0.5rem',
            borderRadius: '1rem',
          
          }}
        >
          <h1
            style={{
              fontFamily: 'BankGothic Lt BT',
              fontSize: '3rem',
              paddingTop: '10rem',
            }}
            className="text-center text-white"
          >
            Welcome to We Skill
          </h1>
          <div
            style={{
              height: '18rem',
              width: '30rem',
              marginLeft: '50%',
              transform: 'translateX(-50%)',
              fontSize: '1.2rem',
            }}
          >
            <div className="card-body">
              <p
                className="card-text"
                style={{
                  fontFamily: 'Swis721 Ex BT',
                }}
              >
                An innovative platform designed to bridge the gap between service seekers and
                talented individuals offering professional skills. Whether you're a creative
                professional, a tech enthusiast, or someone with a unique talent, SkillConnect
                empowers you to monetize your skills by connecting you with those who need your
                services.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sections.current['#features'] = el)}
          id="features"
          className="min-vh-100 bg-white d-flex flex-column justify-content-center align-items-center text-center"
        >
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ width: '100%' }}
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={image1}
                  className="d-block w-100"
                  alt="..."
                  style={{ opacity: '0.5' }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src={image2}
                  className="d-block w-100"
                  alt="..."
                  style={{ opacity: '0.5' }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Some representative placeholder content for the second slide.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src={image3}
                  className="d-block w-100"
                  alt="..."
                  style={{ opacity: '0.5' }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>Some representative placeholder content for the third slide.</p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        <section
          ref={(el) => (sections.current['#about-us'] = el)}
          id="about-us"
          className="min-vh-100 bg-light d-flex flex-column justify-content-center align-items-center text-center"
        >
          <h2 className="display-4">About Us</h2>
          <p className="lead">Learn more about us and what we do.</p>
        </section>

        <section
          id="contact"
          className="min-vh-100 bg-white d-flex flex-column justify-content-center align-items-center text-center"
        >
          <h2 className="display-4">Contact Us</h2>
          <p className="lead">Get in touch with us!</p>
        </section>
      </main>

      <footer className="bg-dark text-white py-4 text-center">
        <p>&copy; 2025 SkillConnect. All rights reserved.</p>
      </footer>
    </div>
   
  );
}
