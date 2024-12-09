const WEATHER_API_KEY = '9b8d914f2fdf5d4b4606184fda6105d5';
const SPOONACULAR_API_KEY = '98b50e1dfca44d12a1161b7946a75a32'; // Your Spoonacular API key

let searchCount = 0; // To track the number of searches
let accumulatedWords = []; // To store accumulated random words from instructions

// Fetch current weather from OpenWeatherMap
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Fetch recipes from Spoonacular using complexSearch endpoint
async function fetchRecipes(cuisine, mealType) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&type=${mealType}&instructionsRequired=true&number=1&apiKey=${SPOONACULAR_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Spoonacular API error: ${response.status}`);
        }
        const data = await response.json();
        return data.results[0]; // Return the first recipe
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return null;
    }
}

// Fetch detailed recipe information to get instructions
async function fetchRecipeInstructions(recipeId) {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Spoonacular API error: ${response.status}`);
        }
        const data = await response.json();
        return data.instructions; // Return the instructions
    } catch (error) {
        console.error('Error fetching recipe instructions:', error);
        return null;
    }
}

// Map country code to Spoonacular cuisine
function getCuisineByCountry(countryCode) {
    const cuisineMap = {
        'US': 'American',
        'JP': 'Japanese',
        'CN': 'Chinese',
        'IT': 'Italian',
        'FR': 'French',
        'ES': 'Spanish',
        'IN': 'Indian',
        'MX': 'Mexican',
        'TH': 'Thai',
        'GR': 'Greek',
        'KR': 'Korean',
        'VN': 'Vietnamese',
        'DE': 'German',
        'IE': 'Irish',
        'GB': 'British',
        'BR': 'Latin American',
        'EG': 'Middle Eastern',
        'ZA': 'African',
        // Add more mappings if necessary
    };

    return cuisineMap[countryCode] || 'European'; // Default to 'European' if country is not listed
}

// Determine meal type based on temperature
function getMealType(temperature) {
    if (temperature < 10) {
        // Cold weather: suggest warming dishes
        const coldWeatherOptions = ['soup', 'main course'];
        return coldWeatherOptions[Math.floor(Math.random() * coldWeatherOptions.length)];
    } else if (temperature >= 10 && temperature < 20) {
        // Moderate weather: suggest filling dishes or appetizers
        const moderateWeatherOptions = ['main course', 'appetizer'];
        return moderateWeatherOptions[Math.floor(Math.random() * moderateWeatherOptions.length)];
    } else {
        // Warm weather: suggest light and refreshing dishes
        const warmWeatherOptions = ['salad', 'beverage'];
        return warmWeatherOptions[Math.floor(Math.random() * warmWeatherOptions.length)];
    }
}

// Main function to handle weather and recipe suggestion
async function handleWeatherAndRecipe() {
    const city = document.getElementById('cityInput').value;
    const outputDiv = document.getElementById('output');
    const searchButton = document.getElementById('getWeather');
    const cityInput = document.getElementById('cityInput');

    if (!city) {
        outputDiv.textContent = 'Please enter a city name.';
        return;
    }

    outputDiv.textContent = 'Loading...';

    try {
        // Step 1: Fetch weather data
        const weatherData = await fetchWeather(city);
        if (!weatherData) {
            outputDiv.textContent = 'Failed to fetch weather data.';
            return;
        }

        const temperature = weatherData.main.temp;
        const countryCode = weatherData.sys.country; // Get country code
        const cuisine = getCuisineByCountry(countryCode); // Get the cuisine name
        const mealType = getMealType(temperature);

        // Step 2: Fetch recipe from Spoonacular
        const recipe = await fetchRecipes(cuisine, mealType);
        if (!recipe) {
            outputDiv.textContent = 'No recipe found. Please try again.';
            return;
        }

        // Step 3: Fetch recipe instructions
        const instructions = await fetchRecipeInstructions(recipe.id);
        if (!instructions) {
            outputDiv.textContent = 'No instructions found for this recipe. Please try again.';
            return;
        }

        // Step 4: Extract random words from first 5 instructions
        const instructionSteps = instructions.split('. ').slice(0, 5);

        instructionSteps.forEach(step => {
            const words = step.split(' ');
            // Get a random word from each instruction step
            const randomWord = words[Math.floor(Math.random() * words.length)];
            if (randomWord) accumulatedWords.push(randomWord);
        });

        // Step 5: Display weather, recipe suggestion, and update search count
        searchCount++;

        outputDiv.innerHTML = `
        <h2>Weather in ${weatherData.name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <h3>Suggested Recipe: ${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <h3>Instructions:</h3>
        <p>${instructions}</p>
    `;

        // Step 6: If search count reaches 5, disable inputs and display accumulated words with a next button
        if (searchCount >= 5) {
            cityInput.disabled = true;
            searchButton.disabled = true;

            outputDiv.innerHTML += `
                <button id="nextButton" class="btn btn-primary mt-3" style="font-size: 1.5em; padding: 15px 30px;">Next</button>
            `;

            document.getElementById('nextButton').addEventListener('click', () => {
                // Redirect to new page displaying accumulated words
                const newPageContent = `
                    <html>
                    <head>
                        <title>Accumulated Words</title>
                        <link rel="stylesheet" href="style2.css">
                    </head>
                    </head>
                    <body>
                        <div class="words-container">
                            ${accumulatedWords.join(' ')}
                        </div>
                    </body>
                    </html>
                `;
                const newWindow = window.open();
                newWindow.document.write(newPageContent);
                newWindow.document.close();
            });
        }

    } catch (error) {
        outputDiv.textContent = 'An error occurred. Please try again.';
        console.error('Error:', error);
    }
}

// Event listener for button click
document.getElementById('getWeather').addEventListener('click', handleWeatherAndRecipe);
