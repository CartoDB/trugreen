import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';


class Histogram extends Component {

  static defaultProps = {
    // showHeader: true,
    // showClearButton: true,
    // useTotalPercentage: false,
    // visibleCategories: Infinity,
  };

  state = {
    data: [],
    range: null,
    filter: null
  };

  componentDidMount() {
    this.setupConfig();
    this.setupEvents();
    this.addDataview();
  }

  componentDidUpdate(prevProps) {
    this.setupConfig();
    const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map)

    if(prevProps !== this.props) {
      this.dataView.addFilter(this.props.boundingbox);
    }
  }

  setupConfig() {
    const { data } = this.state
    this.widget.data = data;
  }

  addDataview() {
    this.dataView = new carto.dataview.Histogram(this.props.layers.railaccidents.source, 'rr_employees_injured', {
      bins: 10
    });

    this.dataView.on('dataChanged', ( data ) => {
      const d = data.bins
      const finalData = d.map(d => ({ start: d.start, end: d.end, value: d.freq }))
      this.setState({ data: finalData })

    });

    this.props.client.addDataview(this.dataView);
 }

 createFilter() {
   const { range } = this.state
   const min = range[0]
   const max = range[1]
   const filter = new carto.filter.Range('rr_employees_injured', { between: { min, max } });
   this.props.layers.railaccidents.source.addFilter(filter);
   this.setState({ filter: filter });
   //console.log('CREATE!!!!', filter._filters.between) //CHECK HERE CHECK HERE CHECK HERE

 }

 updateFilter() {
   const { range, filter } = this.state
   const min = range[0]
   const max = range[1]
   //console.log('UPDATE!!!!', filter._filters.between, this.state.filter._filters.between, this.state.range)  //CHECK HERE CHECK HERE CHECK HERE
   filter.setFilters({ between: { min, max } });
 }

 onApplySelection() {
   const matt = this.props.layers.railaccidents.source._appliedFilters._filters
   const { filter, range } = this.state;
   const testing = {min: range[0], max: range[1]}
   if (!filter) {
     this.createFilter()
   } else if (filter !== matt) {
     console.log(filter === matt[0])
     console.log(filter, matt[0])
     this.updateFilter();
   }
   // !filter
   //   ? this.createFilter()
   //   : this.updateFilter();
 }



 onSelectedChanged = ({ detail }) => {
   let { filter } = this.state;
   if (!detail.length) {
     this.props.layers.railaccidents.source.removeFilter(filter);
     filter = null;
     this.setState({ filter });
   }
 }


 // onSelectedChanged = ({ detail }) => {
 //   let { filter } = this.state;
 //
 //   if (filter && !detail.length) {
 //     this.props.categoryLayer.removeFilter(filter);
 //     filter = null;
 //   }
 //
 //   this.setState({ selection: detail, filter });
 // }

 completeUpdateRangeFilter(event) {
   const { onSelectedChanged } = this;
   onSelectedChanged && onSelectedChanged(event);
   console.log('ME')
   this.onApplySelection()
 }

  setupEvents() {
    let { range, filter } =  this.state;
    this.widget.addEventListener('selectionChanged', (event) => {
      this.setState({ range: event.detail });

      this.completeUpdateRangeFilter(event)

    });
  }




  render() {
    const { data } = this.state;


    return (
      <as-histogram-widget
        ref={node => { this.widget = node; }}
        heading="Title"
        description="Description"
        data={data}
        show-header
        show-clear
      />
    );
  }

}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  filters: state.filters,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

const mapDispatchToProps = dispatch => ({
  setNeighbourhoods: selected => dispatch(setNeighbourhoods(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Histogram);
