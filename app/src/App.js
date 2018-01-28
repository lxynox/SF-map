import React, { Component } from 'react';

import ErrorBoundary from './components/ErrorBoundary';
import Control from './components/Control';
import SFMap from './components/SFMap';
import Skeleton from './components/Skeleton';

/**
 * Top level component tree, css-in-js used for ease of styling.
 * 
 * <Root>
 *   <SFMap/>
 *   <Control/>
 * </Root>
 */

class App extends Component {
  state = {
    mapData: null
  }

  componentWillMount() {
    const lazyLoadMapData = async () => {
      const mapData = await import(/* webpackChunkName: "mapData" */ './data/index.js');
      this.setState({ mapData });
    };

    lazyLoadMapData();
  }

  render() {
    const { projection,  pathGenerator } = this.props;
    const { mapData } = this.state;

    if (!mapData) {
      return <Skeleton/>;
    }

    return (
      <ErrorBoundary>
        <div style={{ background: 'linear-gradient(90deg, #ebebeb 66%, #cab7d3)' }}>
          <header style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000',
            color: 'lightgrey',
            fontFamily: 'Acme, sans-serif',
            textAlign: 'center',
          }}>
            <h1>SF Muni Vehicles</h1>
          </header>
          <main>
            <SFMap mapData={mapData} pathGenerator={pathGenerator} projection={projection.bind(this)} />
            <Control />
          </main>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
