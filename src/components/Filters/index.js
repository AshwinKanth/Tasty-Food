import { BsFilterRight } from "react-icons/bs";

import './index.css'

const Filters = props => {
  const { sortOption, sortByOptions, updateOption, onChangeSearchInput } = props

  const onChangeSort = event => {
    updateOption(event.target.value)
  }

  const onSearchEnter = event => {
    onChangeSearchInput(event.target.value)
  }

  return (
    <div className="filters-container">
      <div>
        <h1 className="popular-heading">Popular Restaurants</h1>
        <p className="select-text">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="filterSearch-container">
          <input
            type="search"
            placeholder="Search Restaurant"
            className="filterSearch-input"
            onChange={onSearchEnter}
          />
        </div>
      </div>
      <div className="sortByFilter-container">
        <BsFilterRight size={20} />
        <p className="sort-text">Rating</p>
        <select
          value={sortOption}
          className="select"
          onChange={onChangeSort}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.id}
              value={eachOption.value}
              className="option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Filters