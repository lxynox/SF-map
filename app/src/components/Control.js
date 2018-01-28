import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, array } from 'prop-types';

import * as actionCreators from '../actions/routes';
import { getRoutes } from '../store/selectors';

/**
 * Html control for user to select which route's vehicles to paint.
 */

class Control extends Component {

  static propTypes = {
    fetchRoutes: func,
    toggleRoute: func,
    routes: array
  }

  // lifecycle hooks

  componentDidMount() {
    const { fetchRoutes } = this.props;
    fetchRoutes();
  }

  // event handlers

  handleChange = (event) => {
    const { toggleRoute } = this.props;
    const { target: { value: route } } = event;
    toggleRoute(route);
  }

  // renders

  renderRadios() {
    const { routes } = this.props;
    return routes.map(route => {
      const { tag, title, isChecked = false } = route;
      return (
        <label key={tag} style={{
          color: 'teal',
          flex: 1,
          padding: '1rem 0',
          margin: 8,
          minWidth: '6rem',
          border: isChecked ? '3px outset hotpink' : '',
          cursor: 'pointer'
        }}>
          <input
            type="checkbox"
            name={tag}
            value={tag}
            checked={isChecked}
            onChange={this.handleChange}
            style={{ display: 'none' }}
          />
          {title}
        </label>
      );
    });
  }

  render() {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        padding: '1rem 2rem 1rem 1rem',
        fontFamily: 'Menlo, monospace'
      }}>
        {this.renderRadios()}
      </div>
    );
  }
}

// redux bindings

const stateProps = (state) => {
  return {
    routes: getRoutes(state)
  };
}

export default connect(stateProps, actionCreators)(Control);
