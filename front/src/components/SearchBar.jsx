import PropTypes from "prop-types";
import "./searchBar.css";

const dynasties = [
  "Tang",
  "Sui",
  "Wei",
  "Shang",
  "Han",
  "Yuan",
  "Zhou",
  "Xia",
  "Song",
  "Jin",
  "Qin",
  "Qing",
  "Ming",
];

export default function SearchBar({ query, setQuery }) {
  function onSelectChange(evt) {
    setQuery(evt.target.value);
  }

  return (
    <div className="search-container">
      <label className="form-label">
        Filter by Dynasty:{" "}
        <select
          id="search"
          className="form-control"
          value={query}
          onChange={onSelectChange}
        >
          <option value="">All Dynasties</option>
          {dynasties.map((dynasty, index) => (
            <option key={index} value={dynasty}>
              {dynasty}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
