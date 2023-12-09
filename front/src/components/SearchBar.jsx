import PropTypes from "prop-types";
import "./searchBar.css";

export default function SearchBar({ query, setQuery }) {
  function onInput(evt) {
    setQuery(evt.target.value);
  }

  return (
    <div>
      <label className="form-label">
      <div></div>
        Search by Dynasty (case sensitive):{" "}
        <input
          id="search"
          className="form-control"
          type="search"
          value={query}
          onInput={onInput}
        ></input>
      </label>
    </div>
  );
}
SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
