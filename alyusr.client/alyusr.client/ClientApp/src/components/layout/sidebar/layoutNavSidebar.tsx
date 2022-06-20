import React, { FC } from "react";
export const LayoutNavSidebar: FC<any> = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        {" "}
        <a href="#menu-toggle" id="menu-toggle" className="navbar-brand">
          <span className="navbar-toggler-icon" />
        </a>{" "}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample02"
          aria-controls="navbarsExample02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {" "}
          <span className="navbar-toggler-icon" />{" "}
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              {" "}
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>{" "}
            </li>
            <li className="nav-item">
              {" "}
              <a className="nav-link" href="#">
                Link
              </a>{" "}
            </li>
          </ul>
          <form className="form-inline my-2 my-md-0"> </form>
        </div>
      </nav>
      <div id="wrapper" className="toggled">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              {" "}
              <a href="#"> Start Bootstrap </a>{" "}
            </li>
            <li>
              {" "}
              <a href="#">Dashboard</a>{" "}
            </li>
            <li>
              {" "}
              <a href="#">Shortcuts</a>{" "}
            </li>
            <li>
              {" "}
              <a href="#">Overview</a>{" "}
            </li>
            <li>
              {" "}
              <a href="#">Events</a>{" "}
            </li>
            <li>
              {" "}
              <a href="#">About</a>{" "}
            </li>
            <li>
              {" "}
              <a href="#">Services</a>{" "}
            </li>
            <li>
              {" "}
              <a href="#">Contact</a>{" "}
            </li>
          </ul>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <h1>Simple Sidebar</h1>
            <p>
              This template has a responsive menu toggling system. The menu will
              appear collapsed on smaller screens, and will appear non-collapsed
              on larger screens. When toggled using the button below, the menu
              will appear/disappear. On small screens, the page content will be
              pushed off canvas.
            </p>
            <p>
              Make sure to keep all page content within the{" "}
              <code>#page-content-wrapper</code>.
            </p>
          </div>
        </div>
      </div>

      <script src="js/jquery.min.js" />
      <script src="js/bootstrap.bundle.min.js" />
    </div>
  );
};
