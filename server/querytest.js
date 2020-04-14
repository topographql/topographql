let data = {
    'person': {
      'species_id': {
        'name': 'Human',
      },
      'eye-color': 'brown'
    },
      'name': 'Luke',
};

for(let key in data) {
  console.log(key);
  console.log(data[key]);
}

let _data = {...data};
console.log(data);

console.log(_data);