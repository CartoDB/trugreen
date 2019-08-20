export default {
  name: 'Memorials',

  visible: true,

  cartocss: `
  #layer {
    polygon-fill: #abc2ea;
    polygon-opacity: 0.3;
  }
  #layer::outline {
    line-width: 1;
    line-color: #31528c;
    line-opacity: 0.5;
  }
  `,

  query: `
    SELECT * FROM memorial
  `,

  options: {
    featureClickColumns: ['name']
  }
};
