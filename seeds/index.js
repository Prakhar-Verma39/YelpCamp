const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20) + 10;
        const camp = new Campground({
            author: '644684470ca6bfc5ff4f4bf2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque in magnam eius vitae quos. Commodi delectus architecto fugit, consequuntur tempora voluptates cum deleniti similique veniam ut, tempore quas dolores suscipit.", 
            price: price,
            images: [
                {
                url: 'https://res.cloudinary.com/do2iwlopl/image/upload/v1682339302/Yelpcamp/a7qbi0fxwi9sbyks5otk.jpg',
                filename: 'Yelpcamp/a7qbi0fxwi9sbyks5otk',
              },
              {
                url: 'https://res.cloudinary.com/do2iwlopl/image/upload/v1682339317/Yelpcamp/ugg0zw4bvyh3uyw3inae.jpg',
                filename: 'Yelpcamp/ugg0zw4bvyh3uyw3inae',
              },
              {
                url: 'https://res.cloudinary.com/do2iwlopl/image/upload/v1682339333/Yelpcamp/lct5zmcpqdcxqe6hurp9.jpg',
                filename: 'Yelpcamp/lct5zmcpqdcxqe6hurp9',
              }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})