import React, { useEffect, useState, useRef } from 'react';
import background from './photos/weskillbg.jpg';
import image1 from './photos/image1.jpg';
import image2 from './photos/FeatureNetworking.jpg';
import image3 from './photos/FeatureNotify.jpg';
import image4 from './photos/FeatureLeaderboard.jpg';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import weskill from './photos/weskillremovedbg.png'
import img from './photos/img.jpg'

export default function Homepage() {
  const [activeSection, setActiveSection] = useState('#home');
  const sections = useRef({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


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
    <>
    {isMobile ?(
      <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={weskill} style={{ maxHeight: '3rem' }} alt="Logo" />
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
              <a className={`nav-link ${activeSection === '#home' ? 'active' : ''}`} href="#home">Home</a>
              <a className={`nav-link ${activeSection === '#features' ? 'active' : ''}`} href="#features">Features</a>
              <a className={`nav-link ${activeSection === '#about-us' ? 'active' : ''}`} href="#about-us">About Us</a>
            </div>
            <div className="ms-auto d-flex">
              <Link to="/registerpage" className="btn btn-light mx-2">Register</Link>
              <Link to="/loginpage" className="btn btn-dark text-white">Login &rarr;</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={(el) => (sections.current['#home'] = el)}
        id="home"
        className="d-flex align-items-center min-vh-100 text-white"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderRadius: '0.5rem',
          padding: '2rem',
      
        }}
      >
        <div className="container">
          <h1 style={{ fontFamily: 'Peralta', fontSize: '3rem' }}>Welcome to</h1>
          <h1 style={{ fontFamily: 'Peralta', fontSize: '4rem', color: '#03C03C' }}>weSkill</h1>
          <h3 className="my-3" style={{ fontFamily: 'BankGothic Lt BT', color: 'whitesmoke' }}>
            Turning hobbies into Hustles
          </h3>
          <div className="card bg-transparent border-0" style={{ maxWidth: '100%' }}>
            <div className="card-body p-0">
              <p
                className="card-text"
                style={{
                  fontFamily: 'Swis721 Ex BT',
                  color: 'whitesmoke',
                  fontSize: '1.1rem',
                }}
              >
                Bridging the gap between talent and opportunity. Whether you're a freelancer ready to showcase your
                skills or a job provider seeking the best, WeSkill makes connections effortless and efficient. Because
                great work deserves to be found – and paid for!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={(el) => (sections.current['#features'] = el)}
        id="features"
        className="container py-5"
      >
        <h2 className="text-center mb-5">Features</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {[
  {
    img: image1,
    title: 'Explore Projects',
    desc: 'A vibrant explore page where users can discover new opportunities, similar to Instagram\'s explore feed. Find projects that suit your interests and skills.',
  },
  {
    img: image2,
    title: 'Networking & Collaboration',
    desc: 'Connect and collaborate with other skilled individuals. WeSkill helps you grow your network, form teams, and enhance your capabilities.',
  },
  {
    img: image3,
    title: 'Smart Notifications',
    desc: 'Get real-time alerts for project updates, invitations, messages, and reviews. Stay updated with everything that matters to you.',
  },
  {
    img: image4,
    title: 'Gamified Leaderboard',
    desc: 'See how you rank! Our AI assigns scores based on work quality, experience, and efficiency. Compete and climb the leaderboard!',
  },
  {
    img: image2,
    title: 'Skill Posting with Pricing',
    desc: 'Job seekers can list their skills with descriptions and preferred pricing, making it easy for recruiters to find and hire talent.',
  },
  {
    img: image3,
    title: 'AI-Powered Evaluation',
    desc: 'Our AI evaluates submissions based on quality, ensuring fair opportunities for both beginners and pros. Experience or efficiency—you decide.',
  }
].map((feature, index) => (
  <div className="col" key={index}>
    <div className="card h-100 shadow-sm border-0">
      <img src={feature.img} className="card-img-top" alt={`Feature ${index + 1}`} />
      <div className="card-body">
        <h5 className="card-title">{feature.title}</h5>
        <p className="card-text">{feature.desc}</p>
      </div>
    </div>
  </div>
))}
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
      
        <footer className="bg-dark text-white py-4 text-center">
        <p>&copy; 2025 weSkill. All rights reserved.</p>
      </footer>
    </div>
     ):(
     <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
          <img src={weskill} style={{maxHeight:"3rem",maxWidth:"3rem"}}></img>
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
            borderRadius: '0.5rem',
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            textAlign:"left"
          }}
        >
          <h1
            style={{
              fontFamily: 'Peralta',
              fontSize: '3rem',
              paddingTop: '3rem',
          
            }}
            className="m-3 text-white"
          >
            Welcome to <h1
            style={{
              fontFamily: 'Peralta',
              fontSize: '4rem',
              color:"#03C03C"
            }}
            className="m-3"
          >weSkill</h1>
          </h1>
          <h3 className="m-4"style={{fontFamily:"BankGothic Lt BT",color:"whitesmoke"}}>Turning hobbies into Hustles</h3>
          <div
            style={{
              height: '18rem',
              width: '30rem',
               
              fontSize: '1.2rem',
            }}
          >
            <div className="card-body m-3" >
              <p
                className="card-text"
                style={{
                  fontFamily: 'Swis721 Ex BT',
                  color:"whitesmoke",
                  fontSize:"1.3rem"
                }}
              >
              Bridging the gap between talent and opportunity. Whether you're a freelancer ready to showcase your skills or a job provider seeking the best, WeSkill makes connections effortless and efficient. Because great work deserves to be found – and paid for!
              </p>
            </div>
            <img src={weskill} style={{maxHeight:"10rem",maxWidth:"10rem"}}></img>
            
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
              <div className="carousel-item active" style={{backgroundColor:"black"}}>
                <img
                  src={image1}
                  className="d-block w-100"
                  alt="..."
                  style={{ opacity: '0.5', maxHeight:"80rem",maxWidth:"100rem"}}
                  
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>AI-Powered Recommendations</h1>
                  <p style={{fontSize:"1.2rem"}}>Smart matching of freelancers and job providers based based on skills, project needs, and sentiment analysis from reviews.</p>
                </div>
              </div>
              <div className="carousel-item" style={{backgroundColor:"black"}}>
                <img
                  src={image2}
                  className="d-block w-100"
                  alt="..."
                  style={{ opacity: '0.5',maxHeight:"80rem",maxWidth:"100rem" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>Sentiment-Based Badges</h1>
                  <p  style={{fontSize:"1.2rem"}}>Freelancers earn badges like "Highly Reliable" or "Consistent Performer," making it easier for job providers to identify top talent.</p>
                </div>
              </div>
               <div className="carousel-item" style={{backgroundColor:"black"}}>
                <img
                  src={image3}
                  className="d-block w-100"
                  alt="..."
                  style={{ opacity: '0.5',maxHeight:"80rem",maxWidth:"100rem" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>Real-Time Communication & Notifications</h1>
                  <p  style={{fontSize:"1.2rem"}}>In-app chat, file sharing, and instant alerts for bids, messages, and project updates to keep the workflow smooth.
</p>
                </div>
              </div>
              <div className="carousel-item" style={{backgroundColor:"black"}}>
                <img
                  src={image4}
                  className="d-block w-100"
                  alt="..."
                  style={{ opacity: '0.5',maxHeight:"80rem",maxWidth:"100rem" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>Verified Profiles & Leaderboards</h1>
                  <p  style={{fontSize:"1.2rem"}}>ID verification for authenticity and leaderboards showcasing top-rated freelancers and active job providers for added trust and visibility.
</p>
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
        <p>&copy; 2025 weSkill. All rights reserved.</p>
      </footer>
    </div>
   
 )}</>);
}
