import React, { useEffect, useState } from 'react';
import Spinner from '../spinner';
import './item-details.css';

const Record = ({item, field, label}) => {
  return (
            <li className="list-group-item">
              <span className="term">{label}:</span>
              <span>{item[field]}</span>
            </li>
  );
}

export { Record };

const ItemDetails = ({itemId, getData, getImageUrl, children}) =>{

  const [item, setItem] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!itemId) {
      return;
    }
    setLoading(true);

    getData(itemId)
    .then((newItem) => {
      setItem(newItem);
      setImage(getImageUrl(newItem));
      setLoading(false);
  });
    }, [itemId, getData, getImageUrl]);

  if (!item && !loading) {
    return <span>Select an item from a list</span>;
  }

  const hasData = !loading && item;
  const content = hasData ? <PersonalDetails item={item} image={image} children={children} /> : null;

  return (
    // this.foo.bar = 0;
      <div className="person-details card">
        { loading &&  <Spinner />}
        { content }
      </div>
  )
}

export default ItemDetails;

const PersonalDetails = ({ item, image, children }) => {
  const { name } = item;
  return (
    <React.Fragment>
        <img className="person-image"
          src={image} alt="item" />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
        </div>
    </React.Fragment>
  )
};