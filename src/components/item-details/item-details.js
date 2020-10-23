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

// const ItemDetails = ({itemId, getData, getImageUrl, children}) =>{
//   console.log(getData);

//   const [item, setItem] = useState(null);
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if(!itemId) {
//       return;
//     }
//     setLoading(true);

//     getData(itemId)
//     .then((newItem) => {
//       console.log(newItem)
//       setItem(newItem);
//       setImage(getImageUrl(newItem));
//       setLoading(false);
//   });
//     }, [itemId, getData, getImageUrl]);

//   if (!item && !loading) {
//     return <span>Select an item from a list</span>;
//   }

//   const hasData = !loading && item;
//   const content = hasData ? <PersonalDetails item={item} image={image} children={children} /> : null;

//   return (
//     // this.foo.bar = 0;
//       <div className="person-details card">
//         { loading &&  <Spinner />}
//         { content }
//       </div>
//   )
// }

// export default ItemDetails;
export default class ItemDetails extends React.Component {

  state = {
    item: null,
    image: null,
    loading: false,
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    const { itemId, getData, getImageUrl } = this.props;

    if (itemId !== prevProps.itemId ||
        getData !== prevProps.getData ||
        getImageUrl !== prevProps.getImageUrl) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) return this.setState({ item: null, image: null, hasError: false });

    this.setState({ item: null, loading: true });
    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item),
          loading: false,
          hasError: false
        });
      })
      .catch((err) => {
        this.setState({          
          hasError: true,
          loading: false
        });
      });
  }

  render() {
    const { loading, item, image } = this.state;

    const content = item ? <PersonalDetails item={item} image={image} children={this.props.children} /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
        <div className="item-details card list-group-item">
          {content}
          {spinner}
        </div>
    )
  }
}

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