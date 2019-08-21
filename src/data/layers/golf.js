export default {
  name: 'Golf Courses',

  visible: true,

  cartocss: `
  #layer {
    polygon-fill: #97e7ac;
    polygon-opacity: 0.7;
  }
  #layer::outline {
    line-width: 1;
    line-color: #327e46;
    line-opacity: 0.5;
  }
  #layer::labels [zoom >= 11]{
    text-name: [name];
    text-face-name: 'Lato Bold';
    text-size: 12;
    text-fill: #606c75;
    text-label-position-tolerance: 0;
    text-halo-radius: 1;
    text-halo-fill: #ffffff;
    text-dy: 0;
    text-allow-overlap: true;
    text-placement: point;
    text-placement-type: dummy;
  }
  `,

  query: `
    SELECT * FROM golf
  `,

  options: {
    featureClickColumns: ['name']
  }
};
