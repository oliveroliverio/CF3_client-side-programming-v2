/**
 * Script to update movie poster URLs in MongoDB Atlas
 * 
 * This script connects to your MongoDB Atlas database and updates
 * all movie documents with legitimate poster URLs from TMDB API.
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');
const axios = require('axios');

// MongoDB connection string from .env
const uri = process.env.CONNECTION_URI;

// TMDB API key - you'll need to get one from https://www.themoviedb.org/settings/api
const TMDB_API_KEY = process.env.TMDB_API_KEY || 'YOUR_TMDB_API_KEY'; // Replace with your API key if not in .env
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

/**
 * Search for a movie on TMDB and get its poster URL
 * @param {string} title - Movie title to search for
 * @returns {Promise<string|null>} - Poster URL or null if not found
 */
async function getMoviePosterUrl(title) {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query: title,
                include_adult: false
            }
        });

        if (response.data.results && response.data.results.length > 0) {
            const movie = response.data.results[0]; // Get the first match
            if (movie.poster_path) {
                return `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`;
            }
        }
        console.log(`No poster found for: ${title}`);
        return null;
    } catch (error) {
        console.error(`Error searching for movie "${title}": ${error.message}`);
        return null;
    }
}

/**
 * Update all movies in the database with poster URLs from TMDB
 */
async function updateMoviePosters() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        const database = client.db('myFlixDB'); // Replace with your actual database name if different
        const moviesCollection = database.collection('movies');

        // Get all movies
        const movies = await moviesCollection.find({}).toArray();
        console.log(`Found ${movies.length} movies to update`);

        let updatedCount = 0;
        let errorCount = 0;

        // Update each movie with a poster URL
        for (const movie of movies) {
            try {
                const title = movie.title || movie.Title;
                if (!title) {
                    console.log(`Movie with ID ${movie._id} has no title, skipping`);
                    continue;
                }

                console.log(`Processing: ${title}`);
                const posterUrl = await getMoviePosterUrl(title);

                if (posterUrl) {
                    // Update the movie document
                    await moviesCollection.updateOne(
                        { _id: movie._id },
                        { $set: { imageUrl: posterUrl } } // Use imageUrl as the field name
                    );
                    console.log(`✅ Updated poster for "${title}": ${posterUrl}`);
                    updatedCount++;
                } else {
                    console.log(`❌ Could not find poster for "${title}"`);
                    errorCount++;
                }

                // Add a small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 250));
            } catch (error) {
                console.error(`Error updating movie ${movie._id}: ${error.message}`);
                errorCount++;
            }
        }

        console.log('\nUpdate Summary:');
        console.log(`Total movies: ${movies.length}`);
        console.log(`Successfully updated: ${updatedCount}`);
        console.log(`Failed to update: ${errorCount}`);

    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB Atlas');
    }
}

// Run the update function
updateMoviePosters().catch(console.error);
