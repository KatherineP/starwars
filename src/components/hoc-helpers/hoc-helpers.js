import React, { Component } from 'react';
import Spinner from '../spinner';


const withData = (View) => {
  return class extends Component {

    state = {
      data: null,
      loading: true
    }
  
    componentDidMount = () =>  {
      this.props.getData()
      .then((data) => {
        this.setState({
          data,
         loading: false, 
        })
      });
    };

    render() {
      const { data, loading } = this.state;
      if(loading) {
        return <Spinner />;
      }
      if(!loading && data){
        return <View {...this.props} data={data} />;
      }
      }
  }
}

export default withData;