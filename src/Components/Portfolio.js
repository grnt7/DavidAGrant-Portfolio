import React, { useState } from 'react';
import "./Portfolio.css"; // Create this CSS file to style the layout

const Portfolio = ({ data }) => {

const [showQR, setShowQR] = useState(false);
  const [currentQR, setCurrentQR] = useState(null);

  if (!data || !data.projects) return null;

  

  const handleQRClick = (qrImage) => {
    setCurrentQR(qrImage);
    setShowQR(true);
  };

  const closeQR = () => {
    setShowQR(false);
    setCurrentQR(null);
  };
   

  return (
    <section id="portfolio">
      <div className="row">
        <div className="twelve columns">
          <h1>Check Out Some of My Works</h1>

          <div className="portfolio-list">
            {data.projects.map((project, i) => {
              const projectImage = `images/portfolio/${project.image}`;

              return (
              <div key={i} className={`project ${i % 2 === 1 ? 'reverse' : ''}`}>
                  <div className="project-image">
                    <img src={projectImage} alt={project.title} />
                  </div>

                  <div className="project-details">
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>

                    <div className="tech-stack">
                      {project.icons &&
                        project.icons.map((icon, idx) => (
                          <div key={idx} className="tech-item">
                            <i className={`${icon} colored`}></i>
                            <span>{project.tech[idx]}</span>
                          </div>
                        ))}
                    </div>

                    <div className="project-buttons">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn"
                        >
                          Link
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn"
                        >
                          GitHub
                        </a>
                      )}
  {/* New button to open the QR code */}
        {project.qrcodeImage && (
          <a
            onClick={() => setShowQR(true)}
            className="btn"
            style={{ cursor: 'pointer' }}
          >
            QR Code
          </a>
        )}
      </div>

      {/* Conditionally render the QR code popup */}
      {showQR && (
        <div className="qr-code-popup">
          <div className="qr-code-content">
            <img src={project.qrcodeImage} alt="QR code"
              style={{ width: '50%', height: 'auto' }}
            />
            <p>Scan with Expo Go</p>
            <button onClick={() => setShowQR(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
                    </div>
                  
                
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;


