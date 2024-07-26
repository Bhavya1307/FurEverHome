// Import required modules
require('dotenv').config();
const express = require('express');
const path = require('path');

const api = require('./api');

// Set up Express app
const app = express();
const port = process.env.PORT || 8888;

// Define important folders

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Setup public folder
app.use(express.static(path.join(__dirname, 'public')));

// Page Routes

// Home route
app.get('/', async (req, res) => {
  res.render('index', { title: 'Home' });
});

// Search page route
app.get('/search', async (req, res) => {
  const location = req.query.location;
  try {
    const petsData = await api.searchPets();
    let filteredPets = petsData.data;

    if (location && petsData.included) {
      const locationLower = location.toLowerCase();
      filteredPets = petsData.data.filter(pet => {
        const petLocation = petsData.included.find(
          item => item.type === 'locations' &&
            item.id === pet.relationships.locations.data[0].id
        );
        if (petLocation) {
          const cityState = `${petLocation.attributes.city}, ${petLocation.attributes.state}`.toLowerCase();
          return cityState.includes(locationLower);
        }
        return false;
      });
    }

    res.render('search', {
      title: 'Search Results',
      pets: { ...petsData, data: filteredPets },
      searchPerformed: true
    });
  } catch (error) {
    console.error('Error searching pets:', error);
    res.render('search', {
      title: 'Search Results',
      error: 'An error occurred while searching for pets',
      searchPerformed: true
    });
  }
});

// dogBreed page route
app.get('/dogBreeds', async (req, res) => {
  try {
    const dogBreeds = await api.getDogBreeds();
    res.render('dogBreeds', {
      title: 'Dog Breeds',
      dogBreeds,
      dogError: dogBreeds.length === 0 ? 'Failed to fetch dog breeds' : null
    });
  } catch (error) {
    console.error('Error fetching dog breeds:', error);
    res.render('dogBreeds', {
      title: 'Dog Breeds',
      dogBreeds: [],
      dogError: 'Failed to fetch dog breeds'
    });
  }
});

// catBreed page route
app.get('/catBreeds', async (req, res) => {
  try {
    const catBreeds = await api.getCatBreeds();
    res.render('catBreeds', {
      title: 'Cat Breeds',
      catBreeds,
      catError: catBreeds.length === 0 ? 'Failed to fetch cat breeds' : null
    });
  } catch (error) {
    console.error('Error fetching cat breeds:', error);
    res.render('catBreeds', {
      title: 'Cat Breeds',
      catBreeds: [],
      catError: 'Failed to fetch cat breeds'
    });
  }
});

// To displat cat images
app.get('/catImages/:breedId', async (req, res) => {
  try {
      const breedId = req.params.breedId;
      const catImages = await api.getCatImages(breedId);
      res.render('catBreeds/catImages', {
          title: 'Cat Images',
          images: catImages,
          error: catImages.length === 0 ? 'No images found for this breed' : null
      });
  } catch (error) {
      console.error('Error fetching cat images:', error);
      res.render('catBreeds/catImages', {
          title: 'Cat Images',
          images: [],
          error: 'Failed to fetch cat images'
      });
  }
});


// To display dog images
app.get('/dogImages/:breedId', async (req, res) => {
  try {
      const breedId = req.params.breedId;
      const dogImages = await api.getDogImages(breedId);
      res.render('dogBreeds/dogImages', {
          title: 'Dog Images',
          images: dogImages,
          error: dogImages.length === 0 ? 'No images found for this breed' : null
      });
  } catch (error) {
      console.error('Error fetching dog images:', error);
      res.render('dogBreeds/dogImages', {
          title: 'Dog Images',
          images: [],
          error: 'Failed to fetch dog images'
      });
  }
});

// Care page route
app.get('/care', (req, res) => {
  res.render('care', { title: 'Pet Care Information' });
});

// About page route
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Contact page route
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// Set up server listening
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});