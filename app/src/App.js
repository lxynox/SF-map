import React, { Component } from 'react';

import * as mapData from './data';
import ErrorBoundary from './components/ErrorBoundary';
import Control from './components/Control';
import SFMap from './components/SFMap';

/**
 * Top level component tree, css-in-js used for ease of styling.
 * 
 * <Root>
 *   <Map/>
 *   <Control/>
 * </Root>
 */

class App extends Component {
  render() {
    const { projection,  pathGenerator } = this.props;
    return (
      <ErrorBoundary>
        <div style={{
          textAlign: 'center',
          color: '#cccccc'
        }}>
          <header style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000',
            fontFamily: 'Acme, sans-serif'
          }}>
            <h1 className="App-title">SF Muni Vehicles</h1>
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
