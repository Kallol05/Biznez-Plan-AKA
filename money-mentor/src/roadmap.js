"use client"

import React, { useState, useEffect, useContext, useCallback } from "react"
// Import necessary icons, including Play for video overlay
import { FaFileAlt, FaVideo, FaQuestionCircle, FaMapPin, FaCheckCircle, FaArrowRight, FaSpinner, FaPlay, FaExternalLinkAlt } from 'react-icons/fa';
import "./roadmap.css"
import Navbar from "./Navbar" // Assuming Navbar exists
import { LanguageContext } from "./LanguageContext" // Assuming LanguageContext exists
import LoadingScreen from "./components/common/LoadingScreen"; // Assuming LoadingScreen exists

// --- Static Data with Demo Content ---
const roadmapData = [
    {
      id: 1,
      title: "Financial Foundations",
      description: "Learn the basics of personal finance and why investing is important",
      steps: [
        {
            id: "1.1", title: "Understanding Money", type: "article", completed: false,
            content: "Money is more than just currency; it's a tool. Explore concepts like value, exchange, budgeting, and the importance of financial literacy.",
            duration: "5 min read",
            url: "https://www.investopedia.com/terms/f/financial-literacy.asp", // Example URL
            thumbnailUrl: "https://via.placeholder.com/150/771796", // Placeholder image
        },
        {
            id: "1.2", title: "Budgeting Basics", type: "video", completed: false,
            content: "Learn how to create and stick to a budget. This video covers tracking expenses, setting goals, and choosing the right budgeting method.",
            duration: "8 min video",
            url: "https://www.youtube.com/watch?v=sVKQn2I4rsY", // Example: Khan Academy Budgeting
            thumbnailUrl: "https://img.youtube.com/vi/sVKQn2I4rsY/hqdefault.jpg",
        },
        { id: "1.3", title: "Financial Goals Quiz", type: "quiz", completed: false, content: "Test your understanding of setting SMART financial goals.", duration: "5 questions" },
      ],
    },
    {
      id: 2,
      title: "Investment Fundamentals",
      description: "Understand different investment options and how they work",
      steps: [
          {
              id: "2.1", title: "Types of Investments", type: "article", completed: false,
              content: "Explore various investment vehicles including stocks, bonds, mutual funds, ETFs, real estate, and more. Understand their characteristics.",
              duration: "7 min read",
              url: "https://www.investopedia.com/articles/basics/06/investingglossary.asp",
              thumbnailUrl: "https://via.placeholder.com/150/d32776",
          },
          {
              id: "2.2", title: "Risk vs. Return", type: "video", completed: false,
              content: "Understand the fundamental relationship between risk and potential returns in investing. Learn about risk tolerance and diversification.",
              duration: "10 min video",
              url: "https://www.youtube.com/watch?v=1n_4-ubi2i0", // Example: Finance Explained Risk/Return
              thumbnailUrl: "https://img.youtube.com/vi/1n_4-ubi2i0/hqdefault.jpg",
          },
          { id: "2.3", title: "Investment Basics Quiz", type: "quiz", completed: false, content: "Test your knowledge of basic investment concepts.", duration: "8 questions" },
      ],
    },
    {
      id: 3,
      title: "Stock Market Basics",
      description: "Learn how the stock market works and how to analyze stocks",
      steps: [
          {
              id: "3.1", title: "Stock Market 101", type: "article", completed: false,
              content: "Learn the fundamentals of how stock markets function, including exchanges, brokers, supply/demand, and why companies issue stock.",
              duration: "8 min read",
              url: "https://www.investopedia.com/articles/basics/04/092404.asp",
              thumbnailUrl: "https://via.placeholder.com/150/24f355",
          },
          {
              id: "3.2", title: "Reading Stock Charts", type: "video", completed: false,
              content: "Understand how to interpret basic stock charts, including price trends, volume, and common indicators like moving averages.",
              duration: "12 min video",
              url: "https://www.youtube.com/watch?v=5pvBoPhz_tE", // Example: Technical Analysis Basics
              thumbnailUrl: "https://img.youtube.com/vi/5pvBoPhz_tE/hqdefault.jpg",
          },
          {
              id: "3.3", title: "Company Valuation Basics", type: "article", completed: false,
              content: "Learn about P/E ratios, EPS, market capitalization, and other fundamental metrics used for evaluating a stock's potential value.",
              duration: "10 min read",
              url: "https://www.investopedia.com/articles/fundamental-analysis/08/core-metrics.asp",
              thumbnailUrl: "https://via.placeholder.com/150/f66b97",
          },
          { id: "3.4", title: "Stock Analysis Quiz", type: "quiz", completed: false, content: "Test your ability to analyze stocks using fundamental indicators.", duration: "10 questions" },
      ],
    },
    // Add URLs/Thumbnails for modules 4 & 5 similarly...
    {
        id: 4,
        title: "Building Your Portfolio",
        description: "Learn how to create a diversified investment portfolio",
        steps: [
            {
                id: "4.1", title: "Asset Allocation", type: "article", completed: false,
                content: "Understand how to distribute your investments across different asset classes (stocks, bonds, cash) based on goals and risk tolerance.",
                duration: "6 min read",
                url: "https://www.investopedia.com/terms/a/assetallocation.asp",
                thumbnailUrl: "https://via.placeholder.com/150/56a8c2",
            },
            {
                id: "4.2", title: "Diversification Strategies", type: "video", completed: false,
                content: "Learn techniques to reduce investment risk through proper diversification across different industries, geographies, and asset types.",
                duration: "9 min video",
                url: "https://www.youtube.com/watch?v= diversification-explained", // Placeholder link, find a real one
                thumbnailUrl: "https://via.placeholder.com/320x180/92c952?text=Diversification+Video", // Placeholder thumbnail
            },
            { id: "4.3", title: "Portfolio Building Exercise", type: "quiz", completed: false, content: "Practice creating a balanced portfolio based on different scenarios.", duration: "Interactive exercise" },
        ],
    },
    {
        id: 5,
        title: "Advanced Investment Strategies",
        description: "Explore more sophisticated investment approaches",
        steps: [
            {
                id: "5.1", title: "Value Investing", type: "article", completed: false,
                content: "Learn about the strategy of finding companies trading below their intrinsic value, popularized by Benjamin Graham and Warren Buffett.",
                duration: "12 min read",
                url: "https://www.investopedia.com/terms/v/valueinvesting.asp",
                thumbnailUrl: "https://via.placeholder.com/150/b0f7cc",
            },
            {
                id: "5.2", title: "Growth Investing", type: "video", completed: false,
                content: "Understand the strategy focused on identifying companies with high growth potential, often prioritizing revenue growth over current profitability.",
                duration: "11 min video",
                url: "https://www.youtube.com/watch?v=growth-investing-explained", // Placeholder link
                thumbnailUrl: "https://via.placeholder.com/320x180/f66b97?text=Growth+Investing", // Placeholder thumbnail
            },
            { id: "5.3", title: "Investment Strategies Quiz", type: "quiz", completed: false, content: "Test your understanding of different investment approaches.", duration: "8 questions" },
        ],
    },
];

// --- Helper Function for Icons (no change needed) ---
const getStepIcon = (type) => {
  switch (type) {
    case "article": return <FaFileAlt />;
    case "video":   return <FaVideo />;
    case "quiz":    return <FaQuestionCircle />;
    default:        return <FaMapPin />;
  }
};

// --- Sub-Components (Only StepDetailsDisplay needs significant changes) ---

// RoadmapModuleItem (No changes needed)
const RoadmapModuleItem = React.memo(({ module, isActive, onClick }) => {
  const totalSteps = module.steps.length;
  const completedSteps = module.steps.filter((step) => step.completed).length;
  const moduleProgress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <div
      className={`roadmap-module ${isActive ? "active" : ""}`}
      onClick={() => onClick(module.id)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(module.id)}
      aria-current={isActive ? "true" : "false"}
    >
      <div className="module-header">
        <div className="module-number">{module.id}</div>
        <div className="module-title">{module.title}</div>
        <div className="module-progress">{moduleProgress}%</div>
      </div>
      <div className="module-description">{module.description}</div>
      <div className="module-progress-bar">
        <div className="module-progress-fill" style={{ width: `${moduleProgress}%` }}></div>
      </div>
    </div>
  );
});

// RoadmapStepItem (No changes needed)
const RoadmapStepItem = React.memo(({ step, isActive, onClick }) => {
  return (
    <div
      className={`step-item ${step.completed ? "completed" : ""} ${isActive ? "active" : ""}`}
      onClick={() => onClick(step)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(step)}
      aria-current={isActive ? "true" : "false"}
    >
      <div className="step-icon">{getStepIcon(step.type)}</div>
      <div className="step-content">
        <div className="step-title" title={step.title}>{step.title}</div>
        <div className="step-info">
          <span className="step-type">{step.type}</span>
          <span className="step-duration">{step.duration}</span>
        </div>
      </div>
      <div className="step-status">
        {step.completed ? (
          <span className="status-completed" aria-label="Completed"><FaCheckCircle /></span>
        ) : (
          <span className="status-pending" aria-label="Pending"><FaArrowRight /></span>
        )}
      </div>
    </div>
  );
});

// StepDetailsDisplay (UPDATED for Demo Content)
const StepDetailsDisplay = React.memo(({ step, moduleId, onCompleteStep, onStartQuiz, isLoading }) => {
    if (!step) return null;

    const handleCompleteClick = () => {
        if (!step.completed) {
            onCompleteStep(moduleId, step.id);
        }
    };

    const handleQuizClick = () => {
        if (!step.completed && !isLoading) {
            onStartQuiz(moduleId, step.id);
        }
    };

    return (
        <div className="step-details card">
            <div className="card-header">
                <h2>{step.title}</h2>
                <div className="step-type-badge">{step.type}</div>
            </div>
            <div className="card-content">
                <p className="step-content-text">{step.content}</p>

                {/* --- ARTICLE PREVIEW --- */}
                {step.type === "article" && step.url && (
                    <div className="step-preview article-preview">
                         {step.thumbnailUrl && (
                            <img
                                src={step.thumbnailUrl}
                                alt="" // Decorative image
                                className="article-thumbnail"
                                loading="lazy"
                             />
                         )}
                        <p>Read the full article to dive deeper into {step.title.toLowerCase()}.</p>
                        <a
                            href={step.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary" // Style as a button
                        >
                            <FaExternalLinkAlt /> Read Article
                        </a>
                    </div>
                )}

                {/* --- VIDEO PREVIEW --- */}
                {step.type === "video" && step.url && (
                    <a
                       href={step.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="step-preview video-placeholder"
                       aria-label={`Watch video: ${step.title}`}
                     >
                        <div
                            className="video-thumbnail"
                            style={{ backgroundImage: `url(${step.thumbnailUrl || ''})` }}
                        >
                             {/* Background image is set via style */}
                        </div>
                        <div className="video-info-overlay">
                            <div className="video-title">{step.title}</div>
                            <div className="video-duration">{step.duration}</div>
                        </div>
                        <div className="video-play-icon-overlay">
                           <FaPlay />
                        </div>
                    </a>
                )}

                {/* --- QUIZ PREVIEW --- */}
                {step.type === "quiz" && (
                    <div className="step-preview quiz-preview">
                        <p>Ready to test your knowledge on {step.title.toLowerCase()}?</p>
                        <p>This involves: {step.duration}.</p>
                    </div>
                )}

                {/* --- COMPLETION SECTION --- */}
                <div className="completion-section">
                    {step.completed ? (
                        <div className="completion-status completed">
                            <FaCheckCircle className="status-icon" />
                            <span className="status-text">Completed</span>
                        </div>
                    ) : (
                        <div className="completion-actions">
                            {step.type === 'quiz' ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleQuizClick}
                                    disabled={isLoading}
                                    aria-live="polite" // Announce changes for screen readers
                                >
                                    {isLoading ? <FaSpinner className="spinner" /> : <FaQuestionCircle />}
                                    {isLoading ? " Starting Quiz..." : ` Take Quiz`}
                                </button>
                            ) : (
                                // Provide completion button for non-quiz items if desired
                                <button className="btn btn-secondary" onClick={handleCompleteClick}>
                                    <FaCheckCircle /> Mark as Completed
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});


// --- Main Roadmap Component (No significant changes needed from previous version) ---
function Roadmap({ onLogout, onPageChange, currentPage }) {
  const [initialLoading, setInitialLoading] = useState(true);
  const { translate } = useContext(LanguageContext);
  const [roadmap, setRoadmap] = useState(roadmapData);
  const [activeModuleId, setActiveModuleId] = useState(roadmapData[0]?.id || 1);
  const [activeStep, setActiveStep] = useState(null);
  const [overallProgress, setOverallProgress] = useState(0);
  const [loadingStepId, setLoadingStepId] = useState(null);


  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 300); // Shorter delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let completedSteps = 0;
    let totalSteps = 0;
    roadmap.forEach(module => {
      module.steps.forEach(step => {
        totalSteps++;
        if (step.completed) completedSteps++;
      });
    });
    const newProgress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
    setOverallProgress(newProgress);
  }, [roadmap]);

  const completeStep = useCallback((moduleId, stepId) => {
    setRoadmap(prevRoadmap =>
      prevRoadmap.map(module =>
        module.id === moduleId
          ? { ...module, steps: module.steps.map(step => (step.id === stepId ? { ...step, completed: true } : step)) }
          : module
      )
    );
     // Update activeStep if it's the one being completed, to refresh its state
     setActiveStep(prev => (prev && prev.id === stepId ? { ...prev, completed: true } : prev));
  }, []);

  const handleModuleClick = useCallback((moduleId) => {
    setActiveModuleId(moduleId);
    setActiveStep(null);
  }, []);

   const handleStepClick = useCallback((step) => {
       setActiveStep(step);
   }, []);

   const handleStartQuiz = useCallback((moduleId, stepId) => {
       setLoadingStepId(stepId);
       setTimeout(() => {
           completeStep(moduleId, stepId);
           setLoadingStepId(null);
           console.log(`Quiz ${stepId} completed!`);
       }, 1500);
   }, [completeStep]);


  const activeModule = roadmap.find(m => m.id === activeModuleId);

  if (initialLoading) {
      return <LoadingScreen />;
  }

  return (
    <div className="page-wrapper">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} currentPage={currentPage} />

      <div className="content-container">
        <div className="roadmap-header">
          <h1>{translate("roadmap")}</h1>
          <p>Your step-by-step guide to becoming a confident investor</p>
          <div className="roadmap-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${overallProgress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="roadmap-container">
          {/* Column 1: Modules */}
          <div className="roadmap-modules">
            {roadmap.map((module) => (
              <RoadmapModuleItem
                key={module.id}
                module={module}
                isActive={activeModuleId === module.id}
                onClick={handleModuleClick}
              />
            ))}
          </div>

          {/* Column 2: Steps & Details */}
          <div className="roadmap-steps-details-container">
             {/* Steps List */}
             {activeModule && (
                <div className="roadmap-steps card">
                    <div className="steps-header">
                        <h2>{activeModule.title}</h2>
                        <p>{activeModule.description}</p>
                    </div>
                    <div className="steps-list">
                        {activeModule.steps.map((step) => (
                            <RoadmapStepItem
                            key={step.id}
                            step={step}
                            isActive={activeStep?.id === step.id}
                            onClick={handleStepClick}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Step Details */}
            <StepDetailsDisplay
                step={activeStep}
                moduleId={activeModuleId}
                onCompleteStep={completeStep}
                onStartQuiz={handleStartQuiz}
                isLoading={loadingStepId === activeStep?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;