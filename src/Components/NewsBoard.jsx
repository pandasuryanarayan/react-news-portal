import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import axios from 'axios';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apikey = import.meta.env.VITE_API_KEY;
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apikey}`;
        const response = await axios.get(url);
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchArticles();
  }, [category]);

  return (
    <div>
      <h2 className="text-center p-1">Latest <span className="badge text-bg-warning fs-4">News</span></h2>
      <h1 className="p-1 text-capitalize text-center" style={{color: "blue"}}>{category}</h1>
      <div className="d-flex justify-content-center flex-wrap">
        {articles.map((news, index) => (
          <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
        ))}
      </div>
    </div>
  );
};

NewsBoard.propTypes = {
  category: PropTypes.string.isRequired
};

export default NewsBoard;
