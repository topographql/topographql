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
  const d3Json = queryToD3(cleanedResults);
  res.locals.d3json = d3Json;
  return next();
};

const cleanResults = (sourceResults) => {
  const tracerData = sourceResults.extensions.tracing;


};

const queryToD3 = (cleanedResults) => {

};

module.exports = queryController;