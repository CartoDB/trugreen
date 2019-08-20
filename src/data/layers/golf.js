export default {
  name: 'Golf Courses',

  visible: true,

  cartocss: `
  #layer {
    polygon-fill: #97e7ac;
    polygon-opacity: 0.3;
  }
  #layer::outline {
    line-width: 1;
    line-color: #327e46;
    line-opacity: 0.5;
  }
  `,

  query: `
    SELECT * FROM golf
  `,

  options: {
    featureClickColumns: ['name']
  }
};
