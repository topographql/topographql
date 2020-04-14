
const { buildClientSchema } = require('graphql');
const schemaController = {};

// converts schema into an object of Types and their respective fields (along with references to other Types)
// output is in format e.g.:

schemaController.convertSchema = (req, res, next) => {
  const sourceSchema = req.body;
  const cleanedSchema = cleanSchema(sourceSchema);
  const d3Json = schemaToD3(cleanedSchema);
  // Writes and saves the JSON file into root folder
  // fs.writeFileSync(path.resolve(__dirname, 'd3schema.json'), JSON.stringify(d3Json, null, 2));
  // Stores the file path for future middleware to access to implement in d3
  // res.locals.path = path.resolve(__dirname, 'd3schema.json');
  res.locals.schema = buildClientSchema(sourceSchema);
  res.locals.d3json = d3Json;
  return next();
};

// cleanSchema cleans the schema received from the client's graphQL endpoint into format:
/*
{
  Query: [
    'info',
    { teams: 'Team' },
    { players: 'Player' },
    { games: 'Fixture' },
    { fixtures: 'Fixture' }
  ],
  ....
  Result: [ 'goalsHomeTeam', 'goalsAwayTeam' ]
}
*/
const cleanSchema = (sourceSchema) => {
  const schemaTypes = sourceSchema.__schema.types;
  const types = {};
  for (let i = 0; i < schemaTypes.length; i++) {
    // iterate only through relevant types (tables)
    if (
      schemaTypes[i].fields !== null &&
      schemaTypes[i].name.indexOf('__') === -1
    ) {
      const fieldsList = [];
      // Iterate through the fields array of each type (table)
      for (let j = 0; j < schemaTypes[i].fields.length; j++) {
        if (
          schemaTypes[i].fields[j].name &&
          !schemaTypes[i].fields[j].isDeprecated
        ) {
          // checks if the type of a field references another Type
          if (schemaTypes[i].fields[j].type.kind === 'OBJECT') {
            const fieldsLink = {};
            fieldsLink[schemaTypes[i].fields[j].name] =
              schemaTypes[i].fields[j].type.name;
            fieldsList.push(fieldsLink);
          }
          // checks if the type of a field is a list and references another Type
          if (
            schemaTypes[i].fields[j].type.kind === 'LIST' &&
            schemaTypes[i].fields[j].type.ofType.kind === 'OBJECT'
          ) {
            const fieldsLink = {};
            fieldsLink[schemaTypes[i].fields[j].name] =
              schemaTypes[i].fields[j].type.ofType.name;
            fieldsList.push(fieldsLink);
          } else if (
            schemaTypes[i].fields[j].type.ofType &&
            schemaTypes[i].fields[j].type.ofType.ofType
          ) {
            // creates a key-value pair of relationship between the field name and the Type if it points to another Type
            const fieldsLink = {};
            fieldsLink[schemaTypes[i].fields[j].name] =
              schemaTypes[i].fields[j].type.ofType.ofType.name;
            fieldsList.push(fieldsLink);
          } else {
            fieldsList.push(schemaTypes[i].fields[j].name);
          }
        }
      }
      types[schemaTypes[i].name] = fieldsList;
    }
  }
  return types;
};

// schemaToD3 converts the "cleaned" schema into a JSON file for d3 in format:

/*
{
  nodes: [
    { name: 'Query', type: 'Type' },
    { name: 'info', type: 'field' },
    ....
  ],
  links: [
    { source: 'info', target: 'Info' },
    { source: 'Query', target: 'info' },
    ...
  ]
}

*/

const schemaToD3 = (cleanedSchema) => {
  const d3Json = {};
  const linksArray = [];
  const typesArray = Object.keys(cleanedSchema);
  // name each node with an & followed by the Type that the field belongs to, to solve for cases
  // where multiple fields have the same name across different Types
  // eslint-disable-next-line no-use-before-define
  for (let key in cleanedSchema) {
    for (let i = 0; i < cleanedSchema[key].length; i++) {
      const fieldName = Object.keys(cleanedSchema[key][i]);
      let nodeSource = {};
      let nodeTarget = {};
      if (typeof cleanedSchema[key][i] !== 'object') {
        // create links from each Type to their fields
        const link = {};
        nodeSource.name = key + '&';
        nodeSource.type = "Type";
        link.source = nodeSource;
        nodeTarget.name = cleanedSchema[key][i]+ '&' + key;
        nodeTarget.type = "field";
        link.target = nodeTarget;
        linksArray.push(link);
      } 
      else {
        // Create link from field to current Type
        const linkType = {};
        nodeSource.name = key + '&';
        nodeSource.type = 'Type';
        linkType.source = nodeSource;
        nodeTarget.name = fieldName[0] + '&' + key;
        nodeTarget.type = 'field';
        linkType.target = nodeTarget;
        linksArray.push(linkType);
        // Create link from fields to other Types
        const linkField = {};
        nodeSource = {};
        nodeSource.name = fieldName[0] + '&' + key;
        nodeSource.type = 'field';
        linkField.source = nodeSource;
        nodeTarget = {};
        nodeTarget.name = cleanedSchema[key][i][fieldName[0]] + '&';
        nodeTarget.type = 'Type';
        linkField.target = nodeTarget;
        linksArray.push(linkField);
      }
    }
  }
  d3Json.links = linksArray;
  return d3Json;
};

module.exports = schemaController;
