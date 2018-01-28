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
        <div style={{
          textAlign: 'center',
          color: 'lightgrey',
          height: '100%',
          background: 'linear-gradient(90deg, #ebebeb 66%, #cab7d3)'
        }}>
          <header style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000',
            fontFamily: 'Acme, sans-serif'
          }}>
            <h1>SF Muni Vehicles</h1>
          </header>
          <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <div style={{ minWidth: 800, padding: '1rem' }}>
              <SFMap mapData={mapData} pathGenerator={pathGenerator} projection={projection.bind(this)} />
            </div>
            <Control />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
