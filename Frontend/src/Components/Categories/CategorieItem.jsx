import { Link } from 'react-router-dom'
import { ContextProvider } from "../../Context/ContextConsumer";
import PropTypes from 'prop-types';

CategorieItem.propTypes = {
  category: PropTypes.object
}

export default function CategorieItem({ category }) {
  
  const { image, name } = category;
  const { setProductsByCategorie } = ContextProvider();

  return (
    <div className="targe-categorie">
      <div className="head">
        <img src={image.url} alt={name} />
      </div>
      <div className="body">
        <label>{category.name}</label>
        <Link to={`/Categorie/${name}`} onClick={() => { setProductsByCategorie([]) }}>View Products</Link>
      </div>
    </div>
  );
}