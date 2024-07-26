# FurEverHome - Pet Adoption Guide

## Description

FurEverHome is a comprehensive pet adoption platform designed to connect potential pet owners with animals in need of loving homes. This web application provides information about various dog and cat breeds, allows users to search for adoptable pets, and offers resources on pet care and adoption processes.

## Features

- Browse dog and cat breeds with detailed information
- Search for adoptable pets based on location
- Access pet care information and adoption guidelines
- Contact form for inquiries and support

## Technologies Used

- Node.js
- Express.js
- Pug templating engine
- CSS for styling
- The Dog API
- The Cat API
- RescueGroups API


## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fureverhome.git
```

2. Navigate to the project directory:

```bash
cd fureverhome
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add your API keys:

```env
DOG_API_KEY=your_dog_api_key
CAT_API_KEY=your_cat_api_key
RESCUEGROUPS_API_KEY=your_rescuegroups_api_key
```

## Usage

1. Start the server:

```bash
npm start
```

2. Open a web browser and go to `http://localhost:3000`

## API Integration

This project integrates with three external APIs:

1. The Dog API: Used to fetch dog breed information and images
2. The Cat API: Used to fetch cat breed information and images
3. RescueGroups API: Used to search for adoptable pets

## Project Structure

- `app.js`: Main application file
- `routes/`: Contains route handlers
- `views/`: Pug templates for rendering pages
- `public/`: Static assets (CSS, images)
- `api/`: API integration functions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any queries or support, please contact us at: contact@petadoptionguide.com
