import React, { Component } from 'react';
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

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    loading: false
  }

  componentDidMount() {
    this.getItemDetails();
  }

  componentDidUpdate(prevProps){
    if (this.props.itemId !== prevProps.itemId){
      this.getItemDetails();
    }
  }

  getItemDetails() {
    const { itemId, getData, getImageUrl } = this.props;

    if(!itemId) {
      return;
    }
    this.setState({loading: true});

    getData(itemId)
    .then((item) => {
      this.setState({ item,
                      loading: false, 
                      image: getImageUrl(item) 
                    })
    });
  };

  render() {
    //this.foo.bar = 0;

    const { item, loading, image } = this.state;
    
    const spinner = loading ? <Spinner /> : null;
    const hasData = !loading && item;
    const content = hasData ? <PersonalDetails item={item} image={image} children={this.props.children} /> : null;

      if(!item && !loading) {
        return <span>Select an item from a list</span>;
      }

    return (
      <div className="person-details card">
        { spinner }
        { content }
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