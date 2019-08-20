export default {
    name: 'Golf Courses',
  
    visible: true,
  
    cartocss: `
    #layer {
      polygon-fill: #97e7ac;
      polygon-opacity: 0;
    }
    #layer::outline {
      line-width: 1;
      line-color: #327e46;
      line-opacity: 0;
    }
    `,
  
    query: `
      SELECT * FROM truegreen_block_groups_copy_1
    `,
  
    options: {
      featureClickColumns: ['name']
    }
  };
  