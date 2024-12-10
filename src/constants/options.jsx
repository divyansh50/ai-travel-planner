export const SelectTravelesList =[
    {
        id:1,
        title: 'Just me',
        desc: ' A sole traveles in exploration',
        icon: '✈️',
        people:'1'
    },
    {
        id:2,
        title: 'A Couple',
        desc: ' Two travellers in tandem',
        icon: '🥂',
        people:'2 People'
    },
    {
        id:3,
        title: 'Family',
        desc: ' A group of fun loving adv',
        icon: '🥂',
        people:'3 to 5 people'
    },
    {
        id:4,
        title: 'Friends',
        desc: ' A bunch of thrill-seekes',
        icon: '🛥️',
        people:'5 to 10 people'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵'
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on average Side',
        icon: '💰'
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸'
    },
]

export const AI_PROMPT= 'Generate Travel plan for Location: {location} for {numberOfDays} Days for {traveller} with a {budget} budget, Give me a Hotels options list with Hotel Name, Hotel address, Price,hotel image url,geo coordinates, rating, descriptions and suggest itinerary with place Name, place details, Place Image Url, Geo coordinates, ticket pricing, Time t travel each of the location for {numberOfDays} days with each day plan with best time to visit in JSON format.'