import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SearchItem from "./SearchItem";
import axios from 'axios';

const SearchBoard = ({ query }) => {
  const [articles, setArticles] = useState([]);
  const [isQueryEmpty, setIsQueryEmpty] = useState(false);

  const apikey = import.meta.env.VITE_API_KEY2;

  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, do not fetch the data
      setArticles([]);
      setIsQueryEmpty(true);
      return;
    }

    setIsQueryEmpty(false);

    const fetchArticles = async () => {
      try {
        let url = `https://api.currentsapi.services/v1/search?country=in&keywords=${query}&apiKey=${apikey}`;
        const response = await axios.get(url);
        setArticles(response.data.news);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [query, apikey]);

  return (
    <div>
      {isQueryEmpty ? (
        <h1 className="text-center p-1">No search results</h1>
      ) : (
        <>
          <h2 className="text-center p-1">
            Search Results for 
            <span className="badge text-bg-warning fs-4"> {query}</span>
          </h2>
          <div className="d-flex justify-content-center flex-wrap">
            {articles.length > 0 ? (
              articles.map((news, index) => (
                <SearchItem
                  key={index}
                  title={news.title}
                  description={news.description}
                  src={news.urlToImage}
                  url={news.url}
                />
              ))
            ) : (
              <h1 className="text-center p-1">No articles found for &quot;{query}&quot;</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};

SearchBoard.propTypes = {
  category: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};

export default SearchBoard;
