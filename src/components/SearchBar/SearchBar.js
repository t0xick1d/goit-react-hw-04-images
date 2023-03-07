import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';

function SearchBar({ onSubmitSearch }) {
  const [inputValue, setInputValue] = useState('');
  const onInputValue = event => {
    setInputValue(event.currentTarget.value);
  };
  const onSubmitSearchForm = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    onSubmitSearch(inputValue.toLowerCase());
    setInputValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm">
        <button
          type="submit"
          className="SearchForm-button"
          onClick={onSubmitSearchForm}
        >
          <BsSearch className="svgIconButton" />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={onInputValue}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired,
};

export default SearchBar;
