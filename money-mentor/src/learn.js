"use client"

import { useContext, useState } from "react"
import "./learn.css"
import Navbar from "./Navbar"
import { LanguageContext } from "./LanguageContext"
import {
  BookOpen,
  Play,
  Clock,
  Filter,
  Search,
  ChevronRight,
  Award,
  TrendingUp,
  FileText,
  CheckCircle,
  BarChart2,
  Bookmark,
  Star,
} from "lucide-react"

function Learn({ onLogout, onPageChange, currentPage }) {
  const { translate } = useContext(LanguageContext)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const videos = [
    {
      id: 1,
      title: "Basics of Stock Market for Beginners",
      url: "https://youtu.be/qIw-yFC-HNU?si=sVgoFi5q-uPHXPlt",
      thumbnail: "",
      duration: "15:24",
      category: "Beginner",
      description: "Learn the fundamentals of stock market investing for beginners.",
      instructor: "Sarah Johnson",
      rating: 4.8,
      views: "245K",
    },
    {
      id: 2,
      title: "How to Invest in Mutual Funds",
      url: "https://youtu.be/p7HKvqRI_Bo?si=G2MDGBBaNL1bm1Bi",
      thumbnail: "",
      duration: "12:45",
      category: "Beginner",
      description: "A comprehensive guide to investing in mutual funds for beginners.",
      instructor: "Michael Chen",
      rating: 4.7,
      views: "189K",
    },
    {
      id: 3,
      title: "Understanding SIP (Systematic Investment Plan)",
      url: "https://youtu.be/tHxwyWnNu0c?si=WvuhXrAZ1b88mAc4",
      thumbnail: "",
      duration: "10:18",
      category: "Intermediate",
      description: "Learn how SIPs work and why they're a great investment strategy.",
      instructor: "Priya Sharma",
      rating: 4.9,
      views: "132K",
    },
    {
      id: 4,
      title: "Tax Saving Investment Options",
      url: "https://youtu.be/HNPbY6fSeo8?si=dlK79EJCYgV7cFVV",
      thumbnail: "",
      duration: "18:32",
      category: "Intermediate",
      description: "Discover the best tax-saving investment options available in India.",
      instructor: "Robert Williams",
      rating: 4.6,
      views: "98K",
    },
  ]

  const articles = [
    {
      id: 1,
      title: "10 Investment Principles for Beginners",
      source: "Financial Express",
      date: "May 15, 2023",
      readTime: "8 min read",
      category: "Beginner",
      link: "#",
      author: "Rajiv Mehta",
      excerpt:
        "Understanding these core principles will help you build a solid foundation for your investment journey.",
    },
    {
      id: 2,
      title: "Understanding P/E Ratio and Other Valuation Metrics",
      source: "Economic Times",
      date: "June 3, 2023",
      readTime: "12 min read",
      category: "Intermediate",
      link: "#",
      author: "Anjali Desai",
      excerpt: "Learn how to evaluate stocks using key metrics like P/E ratio, P/B ratio, and dividend yield.",
    },
    {
      id: 3,
      title: "How to Build a Diversified Portfolio",
      source: "Mint",
      date: "July 22, 2023",
      readTime: "10 min read",
      category: "Beginner",
      link: "#",
      author: "Vikram Singh",
      excerpt:
        "Diversification is key to managing risk. Learn how to spread your investments across different asset classes.",
    },
    {
      id: 4,
      title: "Understanding Debt Funds: Types and Benefits",
      source: "Business Standard",
      date: "August 10, 2023",
      readTime: "15 min read",
      category: "Intermediate",
      link: "#",
      author: "Neha Kapoor",
      excerpt:
        "Debt funds can be a great addition to your portfolio. Learn about different types and when to invest in them.",
    },
  ]

  const courses = [
    {
      id: 1,
      title: "Introduction to Investing",
      lessons: 8,
      duration: "2 hours",
      category: "Beginner",
      completed: true,
      description: "Learn the basics of investing and why it's important for your financial future.",
    },
    {
      id: 2,
      title: "Understanding Risk and Return",
      lessons: 6,
      duration: "1.5 hours",
      category: "Beginner",
      completed: true,
      description: "Learn about different types of risks and how they relate to potential returns.",
    },
    {
      id: 3,
      title: "Asset Allocation",
      lessons: 5,
      duration: "1.2 hours",
      category: "Beginner",
      completed: true,
      description: "Learn how to distribute your investments across different asset classes.",
    },
    {
      id: 4,
      title: "Stock Market Basics",
      lessons: 10,
      duration: "2.5 hours",
      category: "Beginner",
      completed: true,
      description: "Learn how the stock market works and how to invest in stocks.",
    },
    {
      id: 5,
      title: "Mutual Funds",
      lessons: 7,
      duration: "1.8 hours",
      category: "Intermediate",
      completed: false,
      current: true,
      description: "Learn about different types of mutual funds and how to invest in them.",
    },
    {
      id: 6,
      title: "Bonds and Fixed Income",
      lessons: 6,
      duration: "1.5 hours",
      category: "Intermediate",
      completed: false,
      description: "Learn about bonds, fixed deposits, and other debt instruments.",
    },
  ]

  const filteredVideos = videos.filter(
    (video) =>
      (activeFilter === "all" || video.category.toLowerCase() === activeFilter) &&
      (video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredArticles = articles.filter(
    (article) =>
      (activeFilter === "all" || article.category.toLowerCase() === activeFilter) &&
      (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredCourses = courses.filter(
    (course) =>
      (activeFilter === "all" || course.category.toLowerCase() === activeFilter) &&
      (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="page-wrapper">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} currentPage={currentPage} />

      <div className="learn-container">
        <div className="learn-header">
          <div className="learn-header-content">
            <h1>{translate("learn")}</h1>
            <p>Enhance your financial literacy with curated courses, videos, and articles</p>
          </div>

          <div className="search-filter-container">
            <div className="search-container">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search for topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-dropdown">
              <button className="filter-button">
                <Filter size={16} />
                <span>Filter</span>
              </button>
              <div className="filter-menu">
                <button className={activeFilter === "all" ? "active" : ""} onClick={() => setActiveFilter("all")}>
                  All Resources
                </button>
                <button
                  className={activeFilter === "beginner" ? "active" : ""}
                  onClick={() => setActiveFilter("beginner")}
                >
                  Beginner
                </button>
                <button
                  className={activeFilter === "intermediate" ? "active" : ""}
                  onClick={() => setActiveFilter("intermediate")}
                >
                  Intermediate
                </button>
                <button
                  className={activeFilter === "advanced" ? "active" : ""}
                  onClick={() => setActiveFilter("advanced")}
                >
                  Advanced
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="learning-dashboard">
          <div className="dashboard-card progress-card">
            <div className="card-icon">
              <TrendingUp size={24} />
            </div>
            <div className="card-content">
              <h3>Your Progress</h3>
              <div className="progress-bar">
                <div className="progress" style={{ width: "40%" }}></div>
              </div>
              <p>4 of 10 modules completed</p>
            </div>
          </div>

          <div className="dashboard-card streak-card">
            <div className="card-icon">
              <Award size={24} />
            </div>
            <div className="card-content">
              <h3>Learning Streak</h3>
              <p className="streak-count">7 days</p>
              <p>Keep it up!</p>
            </div>
          </div>

          <div className="dashboard-card recommendation-card">
            <div className="card-icon">
              <BarChart2 size={24} />
            </div>
            <div className="card-content">
              <h3>Recommended Next</h3>
              <p>Mutual Funds: Lesson 3</p>
              <button className="continue-button">
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="learning-tabs">
          <button
            className={`tab-button ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Resources
          </button>
          <button
            className={`tab-button ${activeFilter === "beginner" ? "active" : ""}`}
            onClick={() => setActiveFilter("beginner")}
          >
            Beginner
          </button>
          <button
            className={`tab-button ${activeFilter === "intermediate" ? "active" : ""}`}
            onClick={() => setActiveFilter("intermediate")}
          >
            Intermediate
          </button>
          <button
            className={`tab-button ${activeFilter === "advanced" ? "active" : ""}`}
            onClick={() => setActiveFilter("advanced")}
          >
            Advanced
          </button>
        </div>

        <section className="learn-section">
          <div className="section-header">
            <h2>
              <BookOpen size={20} className="section-icon" />
              Your Learning Path
            </h2>
            <a href="#" className="view-all">
              View Curriculum <ChevronRight size={16} />
            </a>
          </div>

          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`course-card ${course.completed ? "completed" : ""} ${course.current ? "current" : ""}`}
              >
                <div className="course-status">
                  {course.completed ? (
                    <CheckCircle size={18} className="status-icon completed" />
                  ) : course.current ? (
                    <Play size={18} className="status-icon current" />
                  ) : (
                    <span className="status-icon locked"></span>
                  )}
                </div>
                <div className="course-content">
                  <div className="course-meta">
                    <span className="course-category">{course.category}</span>
                    <span className="course-stats">
                      <span className="course-lessons">{course.lessons} lessons</span>
                      <span className="course-duration">
                        <Clock size={14} />
                        {course.duration}
                      </span>
                    </span>
                  </div>
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <button className="course-button">
                    {course.completed ? "Review Course" : course.current ? "Continue Learning" : "Start Course"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="learn-section">
          <div className="section-header">
            <h2>
              <Play size={20} className="section-icon" />
              Educational Videos
            </h2>
            <a href="#" className="view-all">
              {translate("view_all")} <ChevronRight size={16} />
            </a>
          </div>

          <div className="video-grid">
            {filteredVideos.map((video) => (
              <div className="video-card" key={video.id}>
                <div className="video-thumbnail">
                  <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} />
                  <div className="video-overlay">
                    <div className="play-button">
                      <Play size={24} />
                    </div>
                  </div>
                  <span className="video-duration">
                    <Clock size={12} />
                    {video.duration}
                  </span>
                  <span className="video-category">{video.category}</span>
                </div>
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  <div className="video-meta">
                    <div className="video-instructor">
                      <div className="instructor-avatar">{video.instructor.charAt(0)}</div>
                      <span>{video.instructor}</span>
                    </div>
                    <div className="video-stats">
                      <span className="video-rating">
                        <Star size={14} className="star-icon" />
                        {video.rating}
                      </span>
                      <span className="video-views">{video.views} views</span>
                    </div>
                  </div>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="video-button">
                    Watch Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="learn-section">
          <div className="section-header">
            <h2>
              <FileText size={20} className="section-icon" />
              Recommended Articles
            </h2>
            <a href="#" className="view-all">
              {translate("view_all")} <ChevronRight size={16} />
            </a>
          </div>

          <div className="article-grid">
            {filteredArticles.map((article) => (
              <div className="article-card" key={article.id}>
                <div className="article-category">{article.category}</div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <div className="article-meta">
                  <div className="article-author">
                    <div className="author-avatar">{article.author.charAt(0)}</div>
                    <span>{article.author}</span>
                  </div>
                  <div className="article-details">
                    <span className="article-source">{article.source}</span>
                    <span className="article-date">{article.date}</span>
                    <span className="article-read-time">
                      <Clock size={14} />
                      {article.readTime}
                    </span>
                  </div>
                </div>
                <div className="article-actions">
                  <a href={article.link} className="read-button">
                    Read Article
                  </a>
                  <button className="bookmark-button">
                    <Bookmark size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Learn

