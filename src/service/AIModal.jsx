import  {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
            role: "user",
            parts:[
                {
                    text:"Generate Travel plan for Location: Chandigarh for 3 Days for couple with a cheap budget, Give me a Hotels options list with Hotel Name, Hotel address, Price,hotel image url,geo coordinates, rating, descriptions and suggest itinerary with place Name, place details, Place Image Url, Geo coordinates, ticket pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format."
                }
            ],
        },
        {
          role: "model",
          parts:[
            {
                text:"```json\n{\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1\",\n      \"hotelAddress\": \"Hotel Address 1, Chandigarh\",\n      \"priceRange\": \"₹500 - ₹1500 per night\",\n      \"imageUrl\": \"URL_TO_HOTEL_IMAGE_1\",\n      \"geoCoordinates\": { \"latitude\": 30.7333, \"longitude\": 76.7794 },\n      \"rating\": 3.8,\n      \"description\": \"Description of Hotel 1. Mention amenities, location advantages etc.\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 2\",\n      \"hotelAddress\": \"Hotel Address 2, Chandigarh\",\n      \"priceRange\": \"₹700 - ₹1800 per night\",\n      \"imageUrl\": \"URL_TO_HOTEL_IMAGE_2\",\n      \"geoCoordinates\": { \"latitude\": 30.7333, \"longitude\": 76.7794 },\n      \"rating\": 4.1,\n      \"description\": \"Description of Hotel 2. Mention amenities, location advantages etc.\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 3\",\n      \"hotelAddress\": \"Hotel Address 3, Chandigarh\",\n      \"priceRange\": \"₹1000 - ₹2500 per night\",\n      \"imageUrl\": \"URL_TO_HOTEL_IMAGE_3\",\n      \"geoCoordinates\": { \"latitude\": 30.7333, \"longitude\": 76.7794 },\n      \"rating\": 4.5,\n      \"description\": \"Description of Hotel 3. Mention amenities, location advantages etc.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day1\",\n      \"plan\": [\n        {\n          \"placeName\": \"Rock Garden\",\n          \"placeDetails\": \"Nek Chand's unique sculpture garden.\",\n          \"imageUrl\": \"URL_TO_ROCK_GARDEN_IMAGE\",\n          \"geoCoordinates\": { \"latitude\": 30.7236, \"longitude\": 76.7896 },\n          \"ticketPricing\": \"₹10 per person (approx.)\",\n          \"travelTime\": \"30 minutes (depending on transport)\",\n          \"bestTime\": \"Morning or late afternoon to avoid harsh sun\"\n        },\n        {\n          \"placeName\": \"Sukhna Lake\",\n          \"placeDetails\": \"Beautiful lake with boating facilities.\",\n          \"imageUrl\": \"URL_TO_SUKHNA_LAKE_IMAGE\",\n          \"geoCoordinates\": { \"latitude\": 30.7205, \"longitude\": 76.8015 },\n          \"ticketPricing\": \"Boating charges vary\",\n          \"travelTime\": \"15 minutes from Rock Garden\",\n          \"bestTime\": \"Evening for a relaxing stroll\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day2\",\n      \"plan\": [\n        {\n          \"placeName\": \"Rose Garden\",\n          \"placeDetails\": \"One of Asia's largest rose gardens.\",\n          \"imageUrl\": \"URL_TO_ROSE_GARDEN_IMAGE\",\n          \"geoCoordinates\": { \"latitude\": 30.7167, \"longitude\": 76.7902 },\n          \"ticketPricing\": \"₹10 per person (approx.)\",\n          \"travelTime\": \"30 minutes\",\n          \"bestTime\": \"Morning or afternoon\"\n        },\n        {\n          \"placeName\": \"Government Museum and Art Gallery\",\n          \"placeDetails\": \"Showcase of art and artifacts.\",\n          \"imageUrl\": \"URL_TO_MUSEUM_IMAGE\",\n          \"geoCoordinates\": { \"latitude\": 30.7324, \"longitude\": 76.7834 },\n          \"ticketPricing\": \"Nominal entry fee\",\n          \"travelTime\": \"30 minutes\",\n          \"bestTime\": \"Morning or afternoon\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day3\",\n      \"plan\": [\n        {\n          \"placeName\": \"Chandigarh Capitol Complex\",\n          \"placeDetails\": \"UNESCO World Heritage site.\",\n          \"imageUrl\": \"URL_TO_CAPITOL_COMPLEX_IMAGE\",\n          \"geoCoordinates\": { \"latitude\": 30.7333, \"longitude\": 76.7794 },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"Depending on location\",\n          \"bestTime\": \"Morning or late afternoon\"\n        },\n        {\n          \"placeName\": \"Sector 17 Market\",\n          \"placeDetails\": \"Shopping and food.\",\n          \"imageUrl\": \"URL_TO_SECTOR_17_IMAGE\",\n          \"geoCoordinates\": { \"latitude\": 30.7300, \"longitude\": 76.7800 },\n          \"ticketPricing\": \"Depends on shopping\",\n          \"travelTime\": \"Depending on location\",\n          \"bestTime\": \"Anytime\"\n        }\n      ]\n    }\n  ]\n}"
            }
        ],
        }
      ],
    });
