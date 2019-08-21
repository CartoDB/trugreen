export default {
    name: 'TruGreen Locations',
  
    visible: true,
  
    cartocss: `
    #layer {
        polygon-fill: #a7dcb5;
        polygon-opacity: 0.6;
      }
      #layer::outline {
        line-width: 1;
        line-color: #ffffff;
        line-opacity: 0.5;
      }
    `,
  
    query: `
    SELECT *,
    (inc_60000_to_75000 + inc_75000_to_100000 + inc_150000_to_200000 + over_200000 + inc_100000_to_125000 + inc_125000_to_150000) / NULLIF(total_pop,0) * 100 as per_over_60k
    FROM mbforrcdb.tru_green    `,
  
    options: {
      featureClickColumns: ['isoline_time', 'address', 'addresslocality', 'addressregion', 'bestrating', 'name', 'postalcode', 'ratingcount', 'ratingvalue', 'phone', 'type', 'url', 'median_income', 'total_pop', 'single_family_detached', 'median_year_built', 'family_households', 'married_households', 'household', 'per_over_60k']
    }
  };
  