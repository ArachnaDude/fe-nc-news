import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = () => {
  // navigate is an invoked instance of useNavigate.
  const navigate = useNavigate();

  // changed state from "all" to empty string
  const [filterBy, setFilterBy] = useState("");

  const [sortBy, setSortBy] = useState("");

  const [direction, setDirection] = useState("");

  // setFilter updates the filter state to what we selected from the dropdown
  const handleChangeTopic = (event) => {
    setFilterBy(event.target.value);
    // "all" isnt a valid topic, so selecting it uses the Articles
    // component WITHOUT a query - see App.js route path Articles -
    // if a topic query is present, it uses the articles
    // route instead
    if (event.target.value === "all") {
      navigate("/articles");
    } else {
      navigate(`/articles?topic=${event.target.value}`);
    }
  };

  useEffect(() => {
    if (filterBy) console.log(filterBy);
    if (sortBy) console.log(sortBy);
    if (direction) console.log(direction);
  }, [filterBy, sortBy, direction]);

  const handleChangeOrder = (event) => {
    setSortBy(event.target.value);
    // console.log(event.target.value);
  };

  const handleChangeDirection = (event) => {
    setDirection(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <nav className="navBar">
      {/* select is HTML for a dropdown list */}
      <select value={filterBy} onChange={handleChangeTopic}>
        <option value="" disabled defaultValue>
          Select a topic
        </option>
        <option value="all">All</option>
        <option value="coding">Coding</option>
        <option value="football">Football</option>
        <option value="cooking">Cooking</option>
      </select>{" "}
      <select value={sortBy} onChange={handleChangeOrder}>
        <option value="" disabled defaultValue>
          Sort By
        </option>
        <option value="created_at">Date created</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment count</option>
      </select>{" "}
      <select value={direction} onChange={handleChangeDirection}>
        <option value="" disabled defaultValue>
          Direction
        </option>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </nav>
  );
};

export default Nav;
