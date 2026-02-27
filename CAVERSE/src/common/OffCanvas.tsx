import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface OffCanvasProps {
  openCanvas: boolean;
  setOpenCanvas: (open: boolean) => void;
}

interface SubmenuItem {
  title: string;
  path: string;
}

interface MenuItem {
  title: string;
  path?: string;
  submenu?: SubmenuItem[];
  icon?: string;
}

const OffCanvas = ({ openCanvas, setOpenCanvas }: OffCanvasProps) => {
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const menuData: MenuItem[] = [
    {
      title: "Home",
      path: "/",
      icon: "fas fa-home",
    },
    {
      title: "Courses",
      icon: "fas fa-book",
      submenu: [
        { title: "All Courses", path: "/courses" },
        { title: "Foundation", path: "/courses/foundation" },
        { title: "Intermediate", path: "/courses/intermediate" },
        { title: "Final", path: "/courses/final" },
        { title: "Test Series", path: "/test-series" },
      ],
    },
    {
      title: "Study Material",
      icon: "fas fa-file-alt",
      submenu: [
        { title: "E-Books", path: "/study-material/ebooks" },
        { title: "Video Lectures", path: "/study-material/videos" },
        { title: "Practice Papers", path: "/study-material/papers" },
        { title: "Revision Notes", path: "/study-material/notes" },
      ],
    },
    {
      title: "Test Series",
      path: "/test-series",
      icon: "fas fa-clipboard-list",
    },
    {
      title: "About",
      icon: "fas fa-info-circle",
      submenu: [
        { title: "About Us", path: "/about" },
        { title: "Our Faculty", path: "/faculty" },
        { title: "Success Stories", path: "/success-stories" },
      ],
    },
    {
      title: "Contact",
      path: "/contact",
      icon: "fas fa-envelope",
    },
  ];

  const toggleSubmenu = (title: string) => {
    setExpandedMenu(expandedMenu === title ? null : title);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpenCanvas(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setOpenCanvas(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`offcanvas-backdrop ${openCanvas ? "show" : ""}`}
        onClick={() => setOpenCanvas(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
          opacity: openCanvas ? 1 : 0,
          visibility: openCanvas ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
        }}
      />

      {/* Off Canvas Menu */}
      <div
        className={`offcanvas-menu ${openCanvas ? "active" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "320px",
          height: "100%",
          backgroundColor: "white",
          zIndex: 1000,
          boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.15)",
          transform: openCanvas ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #e8e5f2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#5b4d8f",
          }}
        >
          <Link to="/" onClick={() => setOpenCanvas(false)}>
            <img
              src="assets/img/logo/white-logo.svg"
              alt="logo"
              height="40px"
              width="120px"
            />
          </Link>
          <button
            onClick={() => setOpenCanvas(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
              lineHeight: 1,
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Search Box */}
        <div style={{ padding: "20px", borderBottom: "1px solid #f0f0f0" }}>
          <form onSubmit={handleSearch}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 40px 12px 16px",
                  border: "2px solid #e8e5f2",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#5b4d8f",
                  border: "none",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>

        {/* Navigation Menu */}
        <div style={{ padding: "20px 0" }}>
          {menuData.map((item, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              {item.path ? (
                <div
                  onClick={() => handleNavigation(item.path!)}
                  style={{
                    padding: "14px 20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {item.icon && (
                    <i
                      className={item.icon}
                      style={{ color: "#5b4d8f", width: "20px" }}
                    ></i>
                  )}
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#1a1a2e",
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              ) : (
                <>
                  <div
                    onClick={() => toggleSubmenu(item.title)}
                    style={{
                      padding: "14px 20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8f6ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {item.icon && (
                        <i
                          className={item.icon}
                          style={{ color: "#5b4d8f", width: "20px" }}
                        ></i>
                      )}
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: 500,
                          color: "#1a1a2e",
                        }}
                      >
                        {item.title}
                      </span>
                    </div>
                    <i
                      className="fas fa-chevron-down"
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        transition: "transform 0.3s",
                        transform:
                          expandedMenu === item.title
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    ></i>
                  </div>

                  {/* Submenu */}
                  <div
                    style={{
                      maxHeight: expandedMenu === item.title ? "500px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                      backgroundColor: "#f8f6ff",
                    }}
                  >
                    {item.submenu?.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        onClick={() => handleNavigation(subItem.path)}
                        style={{
                          padding: "12px 20px 12px 52px",
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "#555",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#5b4d8f";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#555";
                        }}
                      >
                        {subItem.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: "20px",
            borderTop: "1px solid #f0f0f0",
            marginTop: "auto",
          }}
        >
          <button
            onClick={() => handleNavigation("/register")}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#5b4d8f",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: "12px",
            }}
          >
            Enroll Now
          </button>
          <button
            onClick={() => handleNavigation("/sign-in")}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "transparent",
              color: "#5b4d8f",
              border: "2px solid #5b4d8f",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </div>

        {/* Social Links */}
        <div
          style={{
            padding: "20px",
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#f8f6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5b4d8f",
              fontSize: "18px",
            }}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#f8f6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5b4d8f",
              fontSize: "18px",
            }}
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#f8f6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5b4d8f",
              fontSize: "18px",
            }}
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#f8f6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5b4d8f",
              fontSize: "18px",
            }}
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default OffCanvas;