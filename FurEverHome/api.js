const rescueGroups = "https://api.rescuegroups.org/v5/public";
const dogApi = "https://api.thedogapi.com/v1";
const catApi = "https://api.thecatapi.com/v1";

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

async function searchPets(location) {
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

// Don't forget to export the new function
module.exports = {
    getDogBreeds,
    getCatBreeds,
    getDogImages,
    getCatImages,
    searchPets
}