require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5008;

// MongoDB Atlas connection string
console.log('Mongo URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use middleware
const allowedOrigins = [
    'https://vegamovies-kappa.vercel.app',
    'https://vegamoviesworld.vercel.app',  // Add other allowed origins here
];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json()); // To parse incoming JSON requests

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Define the Movie schema and model
const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    description2: { type: String, required: true },
    image: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },
    image5: { type: String, required: true },
    category: { type: String, required: true },
    filesize: { type: String, required: true },
    filesize2: { type: String, required: true },
    link720p: { type: String },  // Only for movies
    link1080p: { type: String },  // Only for movies

    seasons720p: { type: [String], default: [] },  // Array of links for Web Series seasons
    seasons1080p: { type: [String], default: [] },  // Array of links for Web Series seasons

    platform: { type: String, required: false } // New field to specify the platform
}, { timestamps: true });
const Movie = mongoose.model('Movie', movieSchema);

// API route for login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Check against the environment variables
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Generate JWT token using a hardcoded secret key or load from .env if you want to
        const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' }); 
        res.json({ auth: true, token }); // Send token to client
    } else {
        res.status(401).json({ auth: false, message: 'Invalid credentials' });
    }
});

// API route to get all movies or filter by category
app.get('/api/movies', async (req, res) => {
    try {
        const { category } = req.query; // Use query parameter to filter by category
        let movies;
        if (category) {
            movies = await Movie.find({ category });
        } else {
            movies = await Movie.find();
        }
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API route to get a movie by ID
app.get('/api/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API route to add a new movie/webseries
app.post('/api/movies', async (req, res) => {
    const { name, description, description2, image, image2, image3, image4, image5, link720p, link1080p, category, filesize, filesize2, seasons720p, seasons1080p, platform } = req.body;

    // Validate category and handle the links based on the category type
    let movieData = {
        name,
        description,
        description2,
        image,
        image2,
        image3,
        image4,
        image5,
        category,
        link720p,
        link1080p,
        filesize,
        filesize2,
        platform, // Ensure platform is included
    };

    if (category === 'webseries') {
        movieData.seasons720p = seasons720p || []; // Accept seasons if provided
        movieData.seasons1080p = seasons1080p || []; // Accept 1080p seasons if provided
    } else if (category === 'movies') {
        // Only accept single link for movies
        movieData.link720p = link720p;
        movieData.link1080p = link1080p;
    }

    const movie = new Movie(movieData);

    try {
        const savedMovie = await movie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        console.error('Error saving movie:', err);
        res.status(400).json({ message: err.message });
    }
});

// API route to delete a movie/webseries by name
app.delete('/api/movies/:name', async (req, res) => {
    try {
        const movie = await Movie.findOneAndDelete({ name: req.params.name });
        if (!movie) return res.status(404).json({ message: 'Movie/Web Series not found' });
        res.json({ message: 'Movie/Web Series deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
