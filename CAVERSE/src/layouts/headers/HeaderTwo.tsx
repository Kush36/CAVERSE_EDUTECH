/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseSticky from "../../hooks/UseSticky";
import NiceSelect from "../../ui/NiceSelect";
import NavMenu from "./NavMenu";
import OffCanvas from "../../common/OffCanvas";

interface Option {
  value: string;
  text: string;
}

interface Course {
  id: string;
  title: string;
  level: string;
  category: string;
}

// Sample course data for search functionality
const coursesData: Course[] = [
  {
    id: "1",
    title: "Foundation - Accounting Basics",
    level: "foundation",
    category: "accounting",
  },
  {
    id: "2",
    title: "Foundation - Business Laws",
    level: "foundation",
    category: "law",
  },
  {
    id: "3",
    title: "Foundation - Business Economics",
    level: "foundation",
    category: "economics",
  },
  {
    id: "4",
    title: "Foundation - Quantitative Aptitude (Maths, Stats, LR)",
    level: "foundation",
    category: "Quantitative",
  },
  {
    id: "5",
    title: "Intermediate - Advanced Accounting",
    level: "intermediate",
    category: "accounting",
  },
  {
    id: "6",
    title: "Intermediate - Corporate Law",
    level: "intermediate",
    category: "law",
  },
  {
    id: "7",
    title: "Intermediate - Taxation",
    level: "intermediate",
    category: "taxation",
  },
  {
    id: "8",
    title: "Final - Financial Reporting",
    level: "final",
    category: "accounting",
  },
  {
    id: "9",
    title: "Final - Strategic Management",
    level: "final",
    category: "management",
  },
  {
    id: "10",
    title: "Final - Advanced Auditing",
    level: "final",
    category: "auditing",
  },
];

const HeaderTwo = () => {
  const { sticky } = UseSticky();
  const navigate = useNavigate();
  const [openCanvas, setOpenCanvas] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedLevel, setSelectedLevel] = useState<string>("all");

  // Handle course level selection
  const selectHandler = (item: Option, name: string) => {
    console.log("Selected:", name, item);
    setSelectedLevel(item.value);

    // Navigate to courses page with filter
    if (item.value !== "all") {
      navigate(`/courses?level=${item.value}`);
    } else {
      navigate("/courses");
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      // Filter courses based on search query
      const filtered = coursesData.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.level.toLowerCase().includes(query.toLowerCase()) ||
          course.category.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchDropdown(false);
    }
  };

  // Handle search result click
  const handleResultClick = (_courseId: string) => {
      navigate("/courses");
  // /${courseId}
    setSearchQuery("");
    setShowSearchDropdown(false);
  };

  // Close search dropdown when clicking outside
  const handleSearchBlur = () => {
    // Delay to allow click events on results
    setTimeout(() => {
      setShowSearchDropdown(false);
    }, 200);
  };

  return (
    <>
      <header className="header-section-2">
        <div className="container">
          <div className="header-top">
            <Link to="/" className="top-logo">
              <img
                src="assets/img/logo/black-logo.svg"
                alt="Logo"
                height="60px"
                width="60px"
              />
            </Link>

            <div className="category-oneadjust gap-6 d-flex align-items-center">
              <div className="icon">
                <img src="assets/img/logo/dot.png" alt="icon" />
              </div>

              <NiceSelect
                className="category"
                options={[
                  { value: "all", text: "All Test_Series" },
                  { value: "foundation", text: "Foundation" },
                  { value: "intermediate", text: "Intermediate" },
                  { value: "final", text: "Final" },
                ]}
                defaultCurrent={0}
                onChange={selectHandler}
                name="courseLevel"
                placeholder="Select Course"
              />

              <form
                onSubmit={handleSearchSubmit}
                className="search-toggle-box d-md-block"
                style={{ position: "relative" }}
              >
                <div className="input-area">
                  <input
                    type="text"
                    placeholder="Search Test_Series..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => {
                      if (searchResults.length > 0) {
                        setShowSearchDropdown(true);
                      }
                    }}
                    onBlur={handleSearchBlur}
                  />
                  <button className="cmn-btn" type="submit">
                    <i className="far fa-search"></i>
                  </button>
                </div>

                {/* Search Dropdown Results */}
                {showSearchDropdown && searchResults.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      borderRadius: "8px",
                      marginTop: "8px",
                      maxHeight: "300px",
                      overflowY: "auto",
                      zIndex: 1000,
                    }}
                  >
                    <div style={{ padding: "8px 0" }}>
                      {searchResults.slice(0, 5).map((course) => (
                        <div
                          key={course.id}
                          onClick={() => handleResultClick(course.id)}
                          style={{
                            padding: "12px 16px",
                            cursor: "pointer",
                            borderBottom: "1px solid #f0f0f0",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f8f6ff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "white";
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#1a1a2e",
                              marginBottom: "4px",
                            }}
                          >
                            {course.title}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#666",
                              textTransform: "capitalize",
                            }}
                          >
                            {course.level} • {course.category}
                          </div>
                        </div>
                      ))}
                      {searchResults.length > 5 && (
                        <div
                          style={{
                            padding: "12px 16px",
                            textAlign: "center",
                            fontSize: "13px",
                            color: "#5b4d8f",
                            fontWeight: 600,
                          }}
                        >
                          +{searchResults.length - 5} more results
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* No Results Message */}
                {showSearchDropdown &&
                  searchQuery.trim().length > 0 &&
                  searchResults.length === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "white",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        borderRadius: "8px",
                        marginTop: "8px",
                        padding: "16px",
                        zIndex: 1000,
                        textAlign: "center",
                        color: "#666",
                      }}
                    >
                      No Test_Series found for "{searchQuery}"
                    </div>
                  )}
              </form>
            </div>
          </div>
        </div>

        <div
          id="header-sticky"
          className={`header-2 ${sticky ? "sticky" : ""}`}
        >
          <div className="container">
            <div className="mega-menu-wrapper">
              <div className="header-main">
                <Link to="/" className="header-logo">
                  <img
                    src="assets/img/logo/black-logo.svg"
                    alt="logo"
                    height="60px"
                    width="60px"
                  />
                </Link>

                <div className="header-left">
                  <div className="mean__menu-wrapper">
                    <div className="main-menu">
                      <nav id="mobile-menu">
                        <NavMenu />
                      </nav>
                    </div>
                  </div>
                </div>

                <div className="header-right d-flex justify-content-end align-items-center">
                  <div
                    className="icon-items"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/sign-in")}
                  >
                    <i className="fas fa-user"></i>
                    <h6>
                      <Link to="/sign-in">Admin</Link>
                    </h6>
                  </div>

                  <div className="header-button">
                    <Link to="/register" className="theme-btn yellow-btn">
                      Enroll Now
                    </Link>
                  </div>

                  <div className="header__hamburger d-xl-none my-auto">
                    <div
                      className="sidebar__toggle"
                      onClick={() => setOpenCanvas(true)}
                    >
                      <i className="fas fa-bars"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <OffCanvas openCanvas={openCanvas} setOpenCanvas={setOpenCanvas} />
    </>
  );
};

export default HeaderTwo;
