import React from 'react';
import Loading from 'react-fullscreen-loading';

class Loader extends React.Component {
  render() {
    return (
      <Loading
        loading
        background="linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)"
        loaderColor="#0068ca" // LinkedIn blue spinner
      />
    );
  }
}

export default Loader;
