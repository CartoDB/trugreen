import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { setNeighbourhoods } from '../../actions/actions';
import carto, { filter, source, style, layer  } from '@carto/carto.js';
import Category from '.././widgets/Category'
import CategoryVL from '.././vlwidgets/CategoryVL'
import Histogram from '.././widgets/Histogram'
import Formula from '.././widgets/Formula'
import Range from '.././widgets/Range'
import Export from '.././widgets/Export'
import '@carto/airship-style';

class RightBar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        ...props
      }
      this.setMins = this.setMins.bind(this);
  }

  state = {
    size: null,
    data: null,
    filter: null
  };

  componentDidMount() {
    const z = `as-sidebar as-sidebar--${this.props.size} as-sidebar--right ${this.props.background}`;
    this.setState({size: z})
  }

  setMins(mins) {
    const filter = new carto.filter.Category('isoline_time', { eq: mins });
    this.props.layers.stores.source.removeFilter(this.state.filter);
    this.setState({ filter: filter })
    this.props.layers.stores.source.addFilter(filter);
  }

  render() {

    this.props.layers.stores.layer.on('featureClicked', e => {
      this.setState({ data: e.data })
    });

    const { data } = this.state

    let popUp

    if (!data) { 
      popUp = <div className="as-m--16">
      <h1 className="as-title">Click a TruGreen trade area to see more details</h1>
      </div>
    } else {
      const gmaps = `https://maps.google.com/?q=${data.address}, ${data.addresslocality}, ${data.addressregion}, ${data.postalcode}`
      
      popUp = <div className="as-m--16">
        <h1 className="as-title">{data.name}</h1>
        <h4 className="as-subheader">{data.address}, {data.addresslocality}, {data.addressregion}, {data.postalcode}</h4>
        <p className="as-body"><b>Phone: </b>{data.phone}</p>
        <br />
        <div className="as-button-group" role="group">
        <a href={gmaps} target='_blank' className="as-btn as-btn--secondary ">Google Maps</a>
        <a href={data.url} target='_blank' className="as-btn as-btn--secondary ">Branch Website</a>
        </div>
        <br />
        <br />
        <span className="as-badge as-bg--success">{data.isoline_time} min. Trade Area</span>
        <br />
        <br />
        <h4 className="as-subheader">Trade Area Demographics</h4>
        <p className="as-body"><b>Total Population:</b> {data.total_pop.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
        <p className="as-body"><b>Median Income:</b> {data.median_income.toLocaleString('en-US', {maximumFractionDigits: 2, style: 'currency', currency: 'USD'})}</p>
        <p className="as-body"><b>% Population w/ Income Over $60,000:</b> {data.per_over_60k.toLocaleString('en-US', {maximumFractionDigits: 2})}%</p>
        <br />
        <h4 className="as-subheader">Household Data</h4>
        <p className="as-body"><b>Single Family Homes:</b> {data.single_family_detached.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
        <p className="as-body"><b>Total Households:</b> {data.household.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
        <p className="as-body"><b>Median Home Year Built:</b> {data.median_year_built}</p>
        <p className="as-body"><b>Family Occupied Households:</b> {data.family_households.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
        
        </div>
    }

    // 'isoline_time', 'address', 'addresslocality', 'addressregion', 'bestrating', 'name', 'postalcode', 'ratingcount', 'ratingvalue', 'telephone', 'type', 'url', 'median_income', 'total_pop', 'single_family_detached', 'median_year_built', 'family_households', 'married_households', 'household', 'per_over_60k'

    return (
      <aside className={this.state.size} data-name={this.props.name}>
      <div className="as-m--24">
      {/* <Category
        title='Store Name'
        categoryLayer={this.props.layers.stores.source}
        column='name'
        operation={carto.operation.COUNT}
    /> */}
      <as-tabs>
      <div role="tabpanel" data-title="Branch Information">

      <div class="as-container">
      <section class="as-box as-box--border">
      <h4 className="as-subheader">Select a drive time trade-area distance to view</h4>
      <br />
      <div className="as-button-group" role="group">
        <button class="as-btn as-btn--secondary" onClick={() => { this.setMins(30) }}>
          <p>30 min.</p>
        </button>
        <button class="as-btn as-btn--secondary"  onClick={() => { this.setMins(45) }}>
          <p>45 min.</p>
        </button>
        <button class="as-btn as-btn--secondary"  onClick={() => { this.setMins(60) }}>
          <p>60 min.</p>
        </button>
      </div>
      </section>
      </div>
      {popUp}
      </div>
      
      <div role="tabpanel" data-title="Filters">
      <div className="as-m--24">
      <h4 className="as-subheader">Use the filters to select different TruGreen Branch trade areas based on their demographic data</h4>
      <br />
      <Category
        title='State'
        description='State where a branch is located'
        categoryLayer={this.props.layers.stores.source}
        column='addressregion'
        operation={carto.operation.COUNT}
      />
      <Category
        title='City'
        description='City where a branch is located'
        categoryLayer={this.props.layers.stores.source}
        column='addresslocality'
        operation={carto.operation.COUNT}
      />
      <Histogram
        title='Median Income'
        description='Median Income for the trade areas in view'
        layer={this.props.layers.stores.source}
        column='median_income'
        bins={24}
      />
      <br />
      <Histogram
        title='Single Family Homes'
        description='Single family homes for the trade areas in view'
        layer={this.props.layers.stores.source}
        column='single_family_detached'
        bins={24}
      />
      <br />
      <Histogram
        title='Total Households'
        description='Total households for the trade areas in view'
        layer={this.props.layers.stores.source}
        column='household'
        bins={24}
      />
      </div>

      </div>
      </as-tabs>
      </div>
      </aside>

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

export default connect(mapStateToProps, mapDispatchToProps)(RightBar);
