// API endpoints for different services

const rescueGroups = "https://api.rescuegroups.org/v5/public";
const dogApi = "https://api.thedogapi.com/v1";
const catApi = "https://api.thecatapi.com/v1";

// Function to fetch dog breeds details from "The Dog Api"
async function getDogBreeds() {
    let reqUrl = `${dogApi}/breeds`;
    try {
        let response = await fetch(
            reqUrl,
            {
                headers: {
                    "x-api-key": process.env.DOG_API_KEY
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dog breeds:', error);
        return [];
    }
}

// Function to fetch cat breeds details from "The Cat Api"
async function getCatBreeds() {
    let reqUrl = `${catApi}/breeds`;
    try {
        let response = await fetch(
            reqUrl,
            {
                headers: {
                    "x-api-key": process.env.CAT_API_KEY
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
        return [];
    }
}

// Function to fetch cat breeds imgaes from "The Cat Api"
async function getCatImages(breedId, limit = 10) {
    let reqUrl = `${catApi}/images/search?limit=${limit}&breed_ids=${breedId}`;
    try {
        let response = await fetch(
            reqUrl,
            {
                headers: {
                    "x-api-key": process.env.CAT_API_KEY
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cat images:', error);
        return [];
    }
}

// Function to fetch dog breeds imgaes from "The Dog Api"
async function getDogImages(breedId, limit = 10) {
    let reqUrl = `${dogApi}/images/search?limit=${limit}&breed_id=${breedId}`;
    try {
        let response = await fetch(
            reqUrl,
            {
                headers: {
                    "x-api-key": process.env.DOG_API_KEY
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dog images:', error);
        return [];
    }
}


// Function to search a pet from "RescueGroup Api"
async function searchPets() {
    let filters = [];
    
    let reqUrl = `${rescueGroups}/animals/search`;
    let response = await fetch(
      reqUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "Authorization": process.env.RESCUEGROUPS_API_KEY
        },
        body: JSON.stringify({
          data: {
            filters: filters,
            fields: [
              "animals.name",
              "animals.species",
              "animals.breedPrimary",
              "animals.ageGroup",
              "animals.sex",
              "animals.sizeGroup",
              "animals.pictures",
              "animals.descriptionText"
            ],
            include: ["pictures", "locations", "orgs"]
          }
        })
      }
    );
    const data = await response.json();
    console.log("Search Response:", JSON.stringify(data, null, 2));
    return data;
  }

// Exporting the functions
module.exports = {
    getDogBreeds,
    getCatBreeds,
    getDogImages,
    getCatImages,
    searchPets
}