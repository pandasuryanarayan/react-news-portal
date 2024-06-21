import PropTypes from "prop-types";
import { useState } from "react";
import SearchBoard from "./SearchBoard";
import NewsBoard from "./NewsBoard";

const Navbar = ({ category, setCategory }) => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [text, setText] = useState("");
  const categories = [
    "general",
    "business",
    "health",
    "science",
    "technology",
    "entertainment",
    "sports",
  ];

  const handleChange = (Event) => {
    setText(Event.target.value);
  };

  const handleSubmit = (Event) => {
    Event.preventDefault();
    if (text.trim() === "") {setText("")} else {setShowSearchResults(true);}
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary sticky-top"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <span className="badge text-bg-secondary fs-4">Samachaar</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {categories.map((cat) => (
                <li className="nav-item" key={cat}>
                  <div
                    className={`nav-link ${category === cat ? "active" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCategory(cat);
                      setShowSearchResults(false);
                    }}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </div>
                </li>
              ))}
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                value={text}
                onChange={handleChange}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div>
        {showSearchResults ? (
          <SearchBoard query={text} />
        ) : (
          <NewsBoard category={category} />
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default Navbar;
