const queryController = {};


/*
Converts query data (including tracing extensions) into d3 compatible file
* Input format e.g.:
{
        "people": [
            {
                "name": "Luke Skywalker"
            },
            ...
          ],
          "extensions": {
            "tracing": {
              ...
            }
*/

queryController.getQuery = (req, res, next) => {
  const sourceResults = req.body;
  const cleanedResults = cleanResults(sourceResults);
  const d3Json = queryToD3(sourceResults);
  res.locals.d3json = d3Json;
  return next();
};

const cleanResults = (sourceResults) => {
  const tracerData = sourceResults.extensions.tracing.execution.resolvers;
  // Object to store all the paths / how many calls on that path
  const pathStorage = {};
  const queryCalls = tracerData.length;
  // console.log('tracer', tracerData);
  // Store the root query path and initialize into pathStorage
  const root = tracerData[0].returnType[0] + '&';
  const tracerDetails = {};
  
  pathStorage.root = 1;
  for (let i = 1; i < tracerData.length; i++) {
    const path = tracerData[i].fieldName + '&' + tracerData[i].parentType;
    if (!pathStorage.path) { 

    } pathStorage.path = 1;

  }

};

const queryToD3 = (sourceResults) => {
  





  return sourceResults;

};

module.exports = queryController;