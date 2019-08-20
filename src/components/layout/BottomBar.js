import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import '@carto/airship-style';
import Formula from '../widgets/Formula'
import Histogram from '../widgets/Histogram'


class BottomBar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }

  render() {

    const background = `as-map-footer ${this.props.background}`

    return (
      <footer className={background} data-name={this.props.name}>
      <div className="as-box as-box--border">
      <Formula
        title='Median Income'
        description='Median income of area in map view'
        round={true}
        currency={true}
        locale='en-US'
        currencyType='USD'
        column={'median_income'}
        layer={this.props.layers.demos.source}
        operation={carto.operation.AVG}
      />
     
      </div>
      <div className="as-box as-box--border">
      <Formula
        title='Total Single Family Homes'
        description='Total single family homes in map view'
        round={true}
        currency={false}
        locale='en-US'
        currencyType='USD'
        column={'single_family_detached'}
        layer={this.props.layers.demos.source}
        operation={carto.operation.SUM}
      />
     
      </div>
      
        <div className="as-box as-box--border">
      <Formula
        title='Golf Courses'
        description='Total number of golf courses in map view'
        round={true}
        currency={false}
        locale='en-US'
        currencyType='USD'
        column={'cartodb_id'}
        layer={this.props.layers.golf.source}
        operation={carto.operation.COUNT}
      />
      </div>
      <div className="as-box as-box--border">
      <Formula
          title='Memorial Sites'
          description='Total number of memorial sites in map view'
          round={true}
          currency={false}
          locale='en-US'
          currencyType='USD'
          layer={this.props.layers.memorial.source}
          column={'cartodb_id'}
          operation={carto.operation.COUNT}
      />
      </div>
      </footer>
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

const mapDispatchToProps = dispatch => ({
  setNeighbourhoods: selected => dispatch(setNeighbourhoods(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
