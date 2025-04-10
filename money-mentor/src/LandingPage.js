"use client"
import React, { useEffect } from "react";
import "./LandingPage.css";
// Make sure your logo is correctly imported
import logo from "./logo192.png";
import logo1 from "./logo513.png";

function LandingPage({ onGetStarted }) {
  // Set document title when component mounts
  useEffect(() => {
    document.title = "MoneyMentor";
  }, []);

  // This function will handle navigation to the login page
  const handleGetStarted = (e) => {
    e.preventDefault();
    // If the parent component provided a navigation handler, use it
    if (onGetStarted && typeof onGetStarted === 'function') {
      onGetStarted();
    } else {
      // Default fallback - use window location 
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav>
        <div className="content-container nav-container">
          <div className="nav-logo">
            <img 
              src={logo} 
              alt="MoneyMentor Logo" 
              className="h-8 w-8"
            />
            <span>MoneyMentor</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a href="#" onClick={handleGetStarted} className="btn-primary">Get Started</a>
          </div>
          
          {/* Mobile menu button (needs JS implementation) */}
          <button className="mobile-menu-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center animate-fade-in">
            <h1 className="heading-primary">
              Your AI-Powered
              <span className="text-blue"> Finance Mentor</span>
            </h1>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Master your finances with personalized AI guidance. Learn, invest, and grow your wealth with confidence.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              {/* Changed to handle navigation via JavaScript */}
              <a href="#" onClick={handleGetStarted} className="btn-primary">
                Start Learning
              </a>
              <a href="https://www.youtube.com/watch?v=h1nKO151gh0" className="btn-secondary">
                Watch Demo
              </a>
            </div>
            
            <div className="animate-fade-in video-container-large mx-auto">
              <iframe
                src="https://www.youtube.com/embed/h1nKO151gh0"
                title="MoneyMentor Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section-padding">
        <div className="section-container">
          <h2 className="heading-secondary">
            Everything you need to master your finances
          </h2>
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="icon-container">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mb-2">Learn Modules</h3>
              <p>Structured financial education with interactive content and quizzes.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="feature-card">
              <div className="icon-container">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="mb-2">Investment Simulation</h3>
              <p>Bit-life style interactive experience for managing virtual finances.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="feature-card">
              <div className="icon-container">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="mb-2">AI Financial Advisor</h3>
              <p>24/7 chatbot offering personalized insights and guidance.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="feature-card">
              <div className="icon-container">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="mb-2">Paper Trading</h3>
              <p>Risk-free stock trading simulation for hands-on learning.</p>
            </div>
            
            {/* Feature 5 */}
            <div className="feature-card">
              <div className="icon-container">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-2">Community & Feed</h3>
              <p>Connect with experts and peers for market insights.</p>
            </div>
            
            {/* Feature 6 */}
            <div className="feature-card">
              <div className="icon-container">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="mb-2">Dark Mode & Languages</h3>
              <p>Comfortable viewing with multi-language support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-light">
        <div className="section-container">
          <h2 className="heading-secondary">About MoneyMentor</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-body mb-6">
                MoneyMentor was created with a simple mission: to make financial education accessible to everyone. We believe that financial literacy is a fundamental skill that everyone deserves to master, regardless of their background or starting point. It should not be a subject that people find boring or complex.
              </p>
              <p className="text-body mb-6">
                Our platform combines cutting-edge AI technology with expert financial knowledge to create a personalized learning experience that adapts to your goals, knowledge level, and learning style. Gamification and simulations allow users to gain experience in an engaging and interactive way.
              </p>
              <p className="text-body">
                Whether you're just starting your financial journey or looking to refine your investment strategy, MoneyMentor provides the tools, knowledge, and support you need to make confident financial and investment related decisions.
              </p>
            </div>
            <div>
              <div className="about-stats">
                <div className="about-stat-item">
                  <h3 className="stat-number">Risk Free</h3>
                  <p className="stat-label">Simulated Markets</p>
                </div>
                <div className="about-stat-item">
                  <h3 className="stat-number">Relevant</h3>
                  <p className="stat-label">Learning Modules</p>
                </div>
                <div className="about-stat-item">
                  <h3 className="stat-number">High</h3>
                  <p className="stat-label">User Engagement</p>
                </div>
                <div className="about-stat-item">
                  <h3 className="stat-number">24/7</h3>
                  <p className="stat-label">AI Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="section-container grid lg:grid-cols-2">
          <div>
            <h2 className="heading-secondary text-left mb-6">
              Bridge the financial literacy gap with AI-powered guidance
            </h2>
            <div className="space-y-4">
              <div className="benefit-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Personalized learning paths based on your goals</span>
              </div>
              <div className="benefit-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Real-time market insights and analysis</span>
              </div>
              <div className="benefit-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Risk-free practice with virtual portfolio</span>
              </div>
              <div className="benefit-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Expert-curated educational content</span>
              </div>
              <div className="benefit-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>24/7 AI assistance for your questions</span>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://t4.ftcdn.net/jpg/02/95/53/29/360_F_295532927_AWtp3ZPLcUCEcRv2dOqVWtsBFCTExs3y.jpg"
              alt="Financial Analysis"
              className="img-rounded"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient section-padding" id="contact">
        <div className="section-container text-center">
          <h2 className="heading-secondary text-white">
            Ready to start your financial journey?
          </h2>
          <p className="text-body mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            This is the MVP of team T.A.S.S for GDG Solution Track 2025. This MVP lacks a complex database backend, so personalized upgrades is not yet functional. However, the concepts for all the features is portrayed properly.
          </p>
          {/* Changed to handle navigation via JavaScript */}
          <a 
            href="#"
            onClick={handleGetStarted}
            className="btn-secondary"
          >
            Get Started Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="content-container">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            <div>
              <div className="flex items-center text-white mb-4">
                <img 
                  src={logo1} 
                  alt="MoneyMentor Logo" 
                  className="h-6 w-6"
                />
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Features</a></li>
                <li><a href="#" className="footer-link">Pricing</a></li>
                <li><a href="#" className="footer-link">Learn</a></li>
                <li><a href="#" className="footer-link">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="footer-list">
                <li><a href="#about" className="footer-link">About</a></li>
                <li><a href="#" className="footer-link">Blog</a></li>
                <li><a href="#" className="footer-link">Careers</a></li>
                <li><a href="#contact" className="footer-link">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Privacy</a></li>
                <li><a href="#" className="footer-link">Terms</a></li>
                <li><a href="#" className="footer-link">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} MoneyMentor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
