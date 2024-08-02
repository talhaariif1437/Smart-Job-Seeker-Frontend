import { useState, useEffect } from "react";
import "boxicons";
import "./Navbar.css";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    moveActiveTab();
  }, [activeIndex]);

  // const handleShrinkToggle = () => {
  //   document.body.classList.toggle("shrink");
  //   moveActiveTab();
  // };

  const moveActiveTab = () => {
    const activeTab = document.querySelector(".active-tab");
    const shortcuts = document.querySelector(".sidebar-links h4");
    let topPosition = activeIndex * 58 + 2.5;

    if (activeIndex > 3) {
      topPosition += shortcuts.clientHeight;
    }

    if (activeTab) {
      activeTab.style.top = `${topPosition}px`;
    }
  };

  const changeLink = (index) => {
    setActiveIndex(index);
  };

  const showTooltip = (index) => {
    const tooltip = document.querySelector(".tooltip");
    const spans = tooltip.children;
    Array.from(spans).forEach((sp) => sp.classList.remove("show"));
    spans[index].classList.add("show");
    tooltip.style.top = `${(100 / (spans.length * 2)) * (index * 2 + 1)}%`;
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav>
      <div className="sidebar-top">
        {/* <span className="shrink-btn" onClick={handleShrinkToggle}>
          <i className="bx bx-chevron-left"></i>
        </span> */}
        <img src="src/assets/logo2.jpg" className="logo" alt="" />
        <h3 className="hide">Talha Arif</h3>
      </div>

      <div
        className="search"
        onClick={() => document.body.classList.remove("shrink")}
      >
        <i className="bx bx-search"></i>
        <input type="text" className="hide" placeholder="Quick Search ..." />
      </div>

      <div className="sidebar-links">
        <ul>
          {/* <div className="active-tab"></div> */}
          <li
            className="tooltip-element"
            data-tooltip="0"
            onClick={() => changeLink(0)}
            tabIndex="0"
          >
            <Link
              to="/dashboard"
              className={activeIndex === 0 ? "active" : ""}
              onFocus={() => showTooltip(0)}
            >
              <div className="icon">
                <i className="bx bxs-dashboard"></i>
                <i className="bx bxs-dashboard"></i>
              </div>
              <span className="link hide">Dashboard</span>
            </Link>
          </li>
        </ul>
        <h4 className="hide">Tables</h4>
        <ul>
          <li
            className="tooltip-element"
            data-tooltip="1"
            onClick={() => changeLink(1)}
            tabIndex="0"
          >
            <Link
              to="/JobseekersTable"
              className={activeIndex === 1 ? "active" : ""}
              onFocus={() => showTooltip(1)}
            >
              <div className="icon">
                <i className="bx bxs-user"></i>
                <i className="bx bxs-user"></i>
              </div>
              <span className="link hide">Job Seekers</span>
            </Link>

            <Link
              to="/usersTable"
              className={activeIndex === 1 ? "active" : ""}
              onFocus={() => showTooltip(1)}
            >
              <div className="icon">
                <i className="bx bxs-business"></i>
                <i className="bx bxs-business"></i>
              </div>
              <span className="link hide">Companies</span>
            </Link>
          </li>
          <div className="tooltip">
            <span className="show">Users</span>
          </div>
        </ul>
        <h4 className="hide">Pages</h4>
        <ul>
          <li
            className="tooltip-element"
            data-tooltip="2"
            onClick={() => changeLink(2)}
            tabIndex="0"
          >
            <Link
              to="/Calendar"
              className={activeIndex === 2 ? "active" : ""}
              onFocus={() => showTooltip(2)}
            >
              <div className="icon">
                <i className="bx bxs-calendar"></i>
                <i className="bx bxs-calendar"></i>
              </div>
              <span className="link hide">Calendar</span>
            </Link>
          </li>
          <li
            className="tooltip-element"
            data-tooltip="3"
            onClick={() => changeLink(3)}
            tabIndex="0"
          >
            <Link
              to="/faq"
              className={activeIndex === 3 ? "active" : ""}
              onFocus={() => showTooltip(3)}
            >
              <div className="icon">
                <i className="bx bx-question-mark"></i>
                <i className="bx bx-question-mark"></i>
              </div>
              <span className="link hide hidelink">FAQ</span>
            </Link>
          </li>
        </ul>
        <h4 className="hide">Graphs</h4>
        <ul>
          <li
            className="tooltip-element"
            data-tooltip="4"
            onClick={() => changeLink(4)}
            tabIndex="0"
          >
            <Link
              to="/Bar"
              className={activeIndex === 4 ? "active" : ""}
              onFocus={() => showTooltip(4)}
            >
              <div className="icon">
                <i className="bx bxs-bar-chart-alt-2"></i>
                <i className="bx bxs-bar-chart-alt-2"></i>
              </div>
              <span className="link hide hidelink">Bar</span>
            </Link>
          </li>
          <li
            className="tooltip-element"
            data-tooltip="5"
            onClick={() => changeLink(5)}
            tabIndex="0"
          >
            <Link
              to="/Line"
              className={activeIndex === 5 ? "active" : ""}
              onFocus={() => showTooltip(5)}
            >
              <div className="icon">
                <i className="bx bx-line-chart"></i>
                <i className="bx bx-line-chart"></i>
              </div>
              <span className="link hide hidelink">Line</span>
            </Link>
          </li>
          <li
            className="tooltip-element"
            data-tooltip="6"
            onClick={() => changeLink(6)}
            tabIndex="0"
          >
            <Link
              to="/Geography"
              className={activeIndex === 6 ? "active" : ""}
              onFocus={() => showTooltip(6)}
            >
              <div className="icon">
                <i className="bx bxs-network-chart"></i>
                <i className="bx bxs-network-chart"></i>
              </div>
              <span className="link hide hidelink">Geography</span>
            </Link>
          </li>
        </ul>
        <h4 className="hide">Shortcuts</h4>

        <ul>
          {/* <div className="active-tab"></div> */}

          <li
            className="tooltip-element"
            data-tooltip="7"
            onClick={() => changeLink(7)}
            tabIndex="0"
          >
            <Link to="#" onClick={toggleDropdown}>
              <div className="icon">
                <i className="bx bx-cog"></i>
                <i className="bx bx-cog"></i>
              </div>
              <span className="link">Settings</span>
            </Link>
            {showDropdown && (
              <div className="dropdown">
                <ul>
                  <li
                    className="tooltip-element"
                    data-tooltip="8"
                    onClick={() => changeLink(8)}
                    tabIndex="0"
                  >
                    <Link to="/ChangePassword" onClick={toggleDropdown}>
                      <div className="icon">
                        <i className="bx bxs-lock-alt"></i>
                        <i className="bx bxs-lock-alt"></i>
                      </div>
                      <span className="link">Change Password</span>
                    </Link>
                  </li>
                  <li
                    className="tooltip-element"
                    data-tooltip="9"
                    onClick={() => changeLink(9)}
                    tabIndex="0"
                  >
                    <Link to="#" onClick={toggleDropdown}>
                      <div className="icon">
                        <i className="bx bxs-edit-alt"></i>
                        <i className="bx bxs-edit-alt"></i>
                      </div>
                      <span className="link">Edit Profile</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <Link to="#" className="account tooltip-element" data-tooltip="0">
          <i className="bx bx-user"></i>
        </Link>
        <div className="admin-user tooltip-element" data-tooltip="1">
          <div className="admin-profile hide">
            <img src="src/assets/qwerty.jpg" alt="" />
            <div className="admin-info">
              <h3>Talha</h3>
              <h5>Admin</h5>
            </div>
          </div>
          <Link to="/" className="log-out">
            <i className="bx bx-log-out"></i>
          </Link>
        </div>
        <div className="tooltip">
          <span className="show">Talha Arif</span>
          <span>Logout</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
