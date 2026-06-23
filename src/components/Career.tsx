import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My Journey <span>&</span>
          <br /> Education
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          {/* Current Status */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Aspiring Game Developer</h4>
                <h5>Looking for Opportunities</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Actively diving deeper into Unreal Engine, mastering game logic, and optimization. 
              Open for Junior Game Developer roles, testing, or internships where I can contribute 
              to real-time 3D projects and grow as a professional.
            </p>
          </div>

          {/* Unreal Engine Project Milestone */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Independent Game Dev</h4>
                <h5>Endless Runner Project (Unreal Engine)</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Built and developed a complete 3D Endless Runner game. Learned core concepts 
              through tutorials and successfully customized the project by implementing a 
              custom 3D character mesh, re-structuring character logic, and designing a brand new 
              User Interface (UI/HUD) inside Unreal Engine.
            </p>
          </div>

          {/* BCA Education */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BCA (Bachelor of Computer Applications)</h4>
                <h5>JS University, Shikohabad (U.P.)</h5>
              </div>
              <h3>2023–26</h3>
            </div>
            <p>
              Completed final semester exams. Developed a strong foundation in programming concepts, 
              logic building, and software fundamentals. Utilized academic duration to self-learn 
              real-time 3D environments and interactive technologies.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;