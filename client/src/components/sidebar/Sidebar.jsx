import { Link } from "react-router-dom";
import { NoProfile } from "../../assets";
import "./sidebar.css";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const Sidebar = ({ isVisible, handleToggleSidebar }) => {
  const { user } = useSelector((state) => state.user);

  const sidebarRef = useRef(null);

  // Function to close the sidebar when clicking outside
  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      handleToggleSidebar();
    }
  };

  useEffect(() => {
    // Add an event listener to the entire document
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className={`sidebar ${isVisible ? "visible" : ""}`} ref={sidebarRef}>
        <Link to={"/"}>
          Job-<span>Connect</span>
        </Link>

        <div className="side-nav">
          <Link
            to={`${
              user?.accountType === "seeker"
                ? `/dashboard`
                : `/company-profile/${user?._id}`
            }`}
            className="item active"
          >
            <i className="bx bx-search-alt"></i>
            Dashboard
          </Link>
          <Link to={"/all-jobs"} className="item">
            <i className="bx bx-briefcase"></i>
            Jobs
          </Link>
          <Link to={"/company"} className="item">
            <i className="bx bx-message-square-dots"></i>
            Companies
          </Link>
          {user?.accountType === "company" && (
            <Link to={"/upload-job"} className="item">
              <i className="bx bx-bookmark-minus"></i>
              Upload Jobs
            </Link>
          )}
          <Link to={"/about-us"} className="item">
            <i className="bx bx-cog"></i>
            About
          </Link>
        </div>

        <div className="side-profile">
          <div className="info">
            <img src={user?.profileUrl ?? NoProfile} />
            <Link
              to={`${
                user?.accountType === "seeker"
                  ? `/user-profile/${user?._id}`
                  : `/company-profile/${user?._id}`
              }`}
            >
              @ {user?.firstName ?? user?.name}
            </Link>
            <p>{user?.jobTitle ?? user?.email}</p>
          </div>
          <br />
          <Link
            to={`${
              user?.accountType === "seeker"
                ? `/user-profile/${user?._id}`
                : `/company-profile/${user?._id}`
            }`}
            className="btn"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;