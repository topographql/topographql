const queryController = {};


/*
Converts query data (including tracing extensions) into d3 comparable file
* Input format e.g.:
{
        "people": [
            {
                "name": "Luke Skywalker"
            },
            ...,
          ],
          "extensions": {
            "tracing": {
              ...
            }
          }
}

Output format e.g.:
{Query& : [info&Query, duration]}
*/
queryController.getQuery = (req, res, next) => {
  const sourceResults = req.body;
  res.locals.d3querydata = queryToD3(sourceResults);
  return next();
};


/*
Outputs an object that has path sources as keys, and values that are objects 
which include the various path targets for each path source as well as duration
E.g. format for querying person/name and species/name in StarWars schema
{
'RootQueryType&': { 'people&RootQueryType': 93927641 },
'Person&': { 'name&Person': 5434, 'species_id&Person': 24122051 },
'Species&': { 'name&Species': 6098 }
}
*/
const queryToD3 = (sourceResults) => {
  if (sourceResults.extensions) {
    const tracerData = sourceResults.extensions.tracing.execution.resolvers;
    // Object to store all the paths / how many calls on that path
    const pathStorage = {};
    // Store the root query path and initialize into pathStorage
    for (let i = 0; i < tracerData.length; i++) {
      const pathSource = tracerData[i].parentType + '&';
      const pathTarget = tracerData[i].fieldName + '&' + tracerData[i].parentType;
      // check if the duration was greater than 1 microsecond (likelier to be database call)  
      if (!pathStorage[pathSource]) {
        const traceDetails = {};
        traceDetails[pathTarget] = tracerData[i].duration;
        pathStorage[pathSource] = traceDetails;
      } else if (!pathStorage[pathSource][pathTarget]) {
        pathStorage[pathSource][pathTarget] = tracerData[i].duration;
      }
    }
    return pathStorage;
  }
  return 'tracingerror';
};

module.exports = queryController;