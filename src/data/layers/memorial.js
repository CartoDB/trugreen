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
  #layer::labels [zoom >= 11]{
    text-name: [name];
    text-face-name: 'Lato Bold';
    text-size: 12;
    text-fill: #606c75;
    text-label-position-tolerance: 0;
    text-halo-radius: 1;
    text-halo-fill: #ffffff;
    text-dy: 0;
    text-allow-overlap: false;
    text-placement: point;
    text-placement-type: dummy;
  }
  `,

  query: `
    SELECT * FROM memorial
  `,

  options: {
    featureClickColumns: ['name']
  }
};
