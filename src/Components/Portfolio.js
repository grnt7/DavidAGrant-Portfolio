import React, { useState } from 'react';
import "./Portfolio.css"; // Create this CSS file to style the layout

const Portfolio = ({ data }) => {

const [showQR, setShowQR] = useState(false);
  

  if (!data || !data.projects) return null;

  


   

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
    <h3> Overview</h3>
    {/* 1. RENDER SUMMARY/OVERVIEW */}
    {project.summary && <p>{project.summary}</p>}
     <div className="tech-stack-text">
    <h3>Tech Stack</h3>
    <p>{project["tech used"]}</p>
</div>

    {/* 2. RENDER KEY FEATURES (ACHIEVEMENTS) */}
    {project.achievements && (
        <>
            {/* The Subtitle */}
            <h3> Key Features</h3> 
            <ul>
                {project.achievements.map((item, idx) => (
                    // Use dangerouslySetInnerHTML for the bullet points if they contain bold tags (like **React Native**)
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item }} /> 
                ))}
            </ul>
        </>
    )}
    
    {/* 3. RENDER TOOLING/DEPLOYMENT */}
    {project.tools_and_testing && (
        <>
            {/* The Subtitle */}
            <h3> Deployment</h3>
            <ul>
                {project.tools_and_testing.map((item, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
            </ul>
        </>
    )}
<div className="tech-stack">
 
  {project.icons &&
    project.icons.map((icon, idx) => {
      // 1. Initialize variables for icon props
      let iconClass = '';
      let iconStyle = {};
      
      // 2. CHECK THE DATA TYPE
      if (typeof icon === 'string') {
        // Handle Devicon (string format)
        // Note: You must ensure 'colored' is only added if needed, 
        // but since your JSON doesn't include it on every Devicon, 
        // we'll stick to your current approach of always adding 'colored'.
        iconClass = `${icon} colored`;
        
      } else if (typeof icon === 'object' && icon !== null) {
        // Handle Simple Icons / Custom (object format)
        iconClass = icon.iconClass;
        iconStyle = { color: icon.color };
      }

      // 3. Render the tech item using the prepared variables
      return (
        <div key={idx} className="tech-item">
          {/* Note the use of the dynamic iconClass and the style prop */}
          <i className={iconClass} style={iconStyle}></i> 
          <span>{project.tech[idx]}</span>
        </div>
      );
    })}
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
          <>
           <button
    onClick={() => setShowQR(true)}
    className="btn"
    style={{ cursor: "pointer" }}
    >
    QrCode
  </button>
        

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
    </>
        )}
                    </div>
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


