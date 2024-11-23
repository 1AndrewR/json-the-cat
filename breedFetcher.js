// breedFetcher.js
const needle = require('needle');

const fetchBreedDescription = (breedName, callback) => {
  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  needle.get(url, (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }

    const data = response.body;

    if (data.length === 0) {
      callback('Breed not found', null);
      return;
    }

    const breed = data[0];
    callback(null, breed.description);
  });
};

const breedName = process.argv[2];

fetchBreedDescription(breedName, (error, description) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log(description);
  }
});

module.exports = { fetchBreedDescription };
