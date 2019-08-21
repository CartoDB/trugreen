import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import LayerToggle from '../widgets/LayerToggle'
import StyleToggle from '../widgets/StyleToggle'
import '@carto/airship-style';

class Panel extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
  }

  state = {
    position: null
  };

  componentDidMount() {
    const position = `as-panel as-panel--${this.props.horizontal} as-panel--${this.props.vertical}`;
    this.setState({position: position})
  }

  render() {

    const cartocss = `#layer {
      marker-width: ramp([equipment_damage], range(2, 20), quantiles(5));
      marker-fill: #4d78ee;
      marker-fill-opacity: 0.3;
      marker-allow-overlap: true;
      marker-line-width: 1;
      marker-line-color: #FFFFFF;
      marker-line-opacity: 1;
      marker-comp-op: screen;
    }`

    const background = `as-panel__element as-p--32 ${this.props.background}`

    return (
      <div className="as-map-panels" data-name={this.props.name}>
        <div className={this.state.position}>
          <div className={background}>
            <p className='as-body'>Use the toggles to turn layers on and off</p>
            <br />
            <LayerToggle
              layer={this.props.layers.stores}
            />
            <LayerToggle
              layer={this.props.layers.golf}
            />
            <LayerToggle
              layer={this.props.layers.memorial}
            />
          </div>
        </div>
      </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
