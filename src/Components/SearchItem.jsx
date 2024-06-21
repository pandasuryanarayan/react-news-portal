import image from '../assets/news.jpg';
import PropTypes from "prop-types";

const SearchItem = ({title, description, src, url}) => {
    const defaultDescription = "Read more about this news article by clicking the link below.";
    
  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{maxWidth: "290px"}}>
      <img src={src?src:image} style={{height:"200px"}} className="card-img-top" alt="NEWS" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description ? description : defaultDescription}</p>
        <a href={url} className="btn btn-primary">
          Read news
        </a>
      </div>
    </div>
  );
};

SearchItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    src: PropTypes.string,
    url: PropTypes.string.isRequired
  };

export default SearchItem;
