import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SearchItem from "./SearchItem";

const SearchBoard = ({ query }) => {
  const [articles, setArticles] = useState([]);
  const [isQueryEmpty, setIsQueryEmpty] = useState(false);

  const apikey = import.meta.env.VITE_API_KEY;

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
        let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}&language=en`;
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles);
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
