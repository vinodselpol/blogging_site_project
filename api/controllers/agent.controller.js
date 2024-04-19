import dotenv from 'dotenv';
import { openai } from '../utils/openAi.js';
import {getJson} from 'serpapi'
dotenv.config();
import axios from 'axios';



async function getActivities() {
    try {
        const response = await new Promise((resolve, reject) => {
            getJson({
              engine: "google_events",
              q: "Things to do in Chicago",
              hl: "en",
              gl: "us",
              htichips:"date:week",
              api_key: process.env.SERP_API_KEY,
            }, (data, error) => {
              if (error) {
                reject(error);
              } else {
                resolve(data);
              }
            });
          });

        const eventsResults = response["events_results"];
        const activitiesData = eventsResults.map((event) => ({
            title:event.title,
            date: event.date,
            address: event.address,
            description: event.description,
        }))

        console.log("activities data is here",activitiesData);

        return activitiesData;
    } catch (error) {
        console.log("Failed to fetch activities",error);
    }
    
}

async function getSportActivities() {
  try {
      const response = await new Promise((resolve, reject) => {
          getJson({
            engine: "google_events",
            q: "Sport events in Chicago",
            hl: "en",
            gl: "us",
            htichips:"date:week",
            api_key: process.env.SERP_API_KEY,
          }, (data, error) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          });
        });

      const eventsResults = response["events_results"];
      const activitiesData = eventsResults.map((event) => ({
          title:event.title,
          date: event.date,
          address: event.address,
          description: event.description,
      }))

      console.log("Sport events data is here",activitiesData);

      return activitiesData;
  } catch (error) {
      console.log("Failed to fetch activities",error);
  }
  
}

async function getRestaurants() {
  //for each activities data get its address and pass the adress as query to get the restaurants
  
 
  try {
      const response = await new Promise((resolve, reject) => {
          getJson({
            engine: "google_maps",
            q: "Restaurants in Chicago",
            ll: "@41.8781,87.6298,15.1z",
            type: "search",
            api_key: process.env.SERP_API_KEY,
          }, (data, error) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          });
        });

      const eventsResults = response["local_results"];
      console.log("Restaunt data is here",eventsResults);
      const restuarantsData = eventsResults.map((event) => ({
          title:event.title,
          address: event.address,
          description: event.description,
          operatingHours:event.operating_hours,
          coordinates: event.gps_coordinates,
      }))

      console.log("Restaunt data is here",restuarantsData);

      return restuarantsData;
  } catch (error) {
      console.log("Failed to fetch activities",error);
  }
  
}

export const askAIAgent = async (req, res) => {
    try {
      // Extract the 'query' parameter from the URL query string
      const userQuery = req.query.query;
      // const userQuery = "Please suggest some sport events based on my location and the current weather."
  
      // Check if 'query' parameter is provided
      if (!userQuery) {
        return res.status(400).json({ message: "Query parameter 'query' is required." });
      }
  
      // Use the extracted 'query' parameter in the agent function
      const response = await agent(userQuery);

    

      res.status(200).json(response);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


async function getLocation() {
    const response = await fetch("https://ipapi.co/json/");
    const locationData = await response.json();
    return locationData;
}

async function getCurrentWeather(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`;
    const response = await fetch(url);
    const weatherData = await response.json();
    return weatherData;
}





const tools = [
    {
      type: "function",
      function: {
        name: "getCurrentWeather",
        description: "Get the current weather in a given location",
        parameters: {
          type: "object",
          properties: {
            latitude: { type: "string" },
            longitude: { type: "string" },
          },
          required: ["latitude", "longitude"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "getLocation",
        description: "Get the user's location based on their IP address",
        parameters: {
          type: "object",
          properties: {},
        },
      },
    },
    {
      type: "function",
      function: {
        name: "getSportActivities",
        description: "Get the sport events to do in a given location",
        parameters: {
          type: "object", // Corrected to 'object' from 'array'
          properties: {},
        },
      },
    },
    {
      type: "function",
      function: {
        name: "getActivities",
        description: "Get the current activities excluding sports to do in a given location",
        parameters: {
          type: "object", // Corrected to 'object' from 'array'
          properties: {},
        },
      },
    },
   
];


const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant. Only use the functions you have been provided with.",
    },
];
  

const agent = async (userInput) => {

    messages.push({
      role: "user",
      content: userInput,
    });

    console.log('after pushing',messages)

    for (let i = 0; i < 7; i++) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", //gpt-4-0613 //gpt-3.5-turbo
      messages: messages,
      tools: tools,
    });
    console.log(response);
    const { finish_reason, message } = response.choices[0];
 
if (finish_reason === "tool_calls" && message.tool_calls) {
  const functionName = message.tool_calls[0].function.name;
  const functionToCall = availableTools[functionName];
  const functionArgs = JSON.parse(message.tool_calls[0].function.arguments);
  const functionArgsArr = Object.values(functionArgs);
  const functionResponse = await functionToCall.apply(null, functionArgsArr);
  console.log(functionResponse);


  messages.push({
    role: "function",
    name: functionName,
    content: `The result of the last function was this: ${JSON.stringify(
      functionResponse
    )}
    `,
  });



}  else if (finish_reason === "stop") {
    messages.push(message);
    return message.content;
  }

}
return "The maximum number of iterations has been met without a suitable answer. Please try again with a more specific input.";

}

const availableTools = {
    getCurrentWeather,
    getLocation,
    getActivities,
    getSportActivities,
  };
  
// Function to get random entries from an array
export const getRandomEntries = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffled.slice(0, count); // Get a subset of the shuffled array
};

  //Get the recommendation events address lat and long

export const getLatLong = async (req, res) => {
  try {
      // Call getActivities function, getSportActivities function, and getRestaurants function
      // Merge only the first 3 results of each
      const activitiesData = await getActivities();
      const sportActivitiesData = await getSportActivities();
      const restaurantsData = await getRestaurants();

     
      // Get random entries for activities, sport activities, and restaurants
      const randomActivities = getRandomEntries(activitiesData, 3);
      const randomSportActivities = getRandomEntries(sportActivitiesData, 3);
      const randomRestaurants = getRandomEntries(restaurantsData, 3);

      // Geocode the addresses for activities
      const geocodedActivities = await Promise.all(randomActivities.map(async (activity) => ({
          ...activity,
          coordinates: await geocodeAddress(Array.isArray(activity.address) ? activity.address.join(', ') : activity.address)
      })));

      // Geocode the addresses for sport activities
      const geocodedSportActivities = await Promise.all(randomSportActivities.map(async (activity) => ({
          ...activity,
          coordinates: await geocodeAddress(Array.isArray(activity.address) ? activity.address.join(', ') : activity.address)
      })));

      // Prepare response object with categorized activities
      const response = {
          musical_events: geocodedActivities,
          sport_events: geocodedSportActivities,
          restaurants: randomRestaurants
      };

      console.log("Response:", response);

      res.status(200).json(response);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

 // Function to geocode an address using OpenStreetMap Nominatim API
 const geocodeAddress = async (address) => {
  console.log('address',address);
  try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
              address: address,
              key: process.env.GOOGLE_MAPS_API_KEY, // Replace with your Google Maps API key
          }
      });

      const results = response.data.results;
      if (results && results.length > 0) {
          const firstResult = results[0];
          const { lat, lng } = firstResult.geometry.location;
          return { latitude: lat, longitude: lng };
      } else {
          throw new Error('Address not found');
      }
  } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      throw new Error('Geocoding error');
  }
};
  



