# 250701: Nested Objects Rendering Fix

## Issue
The React application was throwing an error when trying to render movie data from the API:

```
Error: Objects are not valid as a React child (found: object with keys {name, description, _id}).
If you meant to render a collection of children, use an array instead.
```

## Root Cause
The API returns movie objects with nested objects for `Genre` and `Director` fields. When the MovieView component tried to render these nested objects directly, React threw an error because objects cannot be rendered as React children.

## Files Changed

### 1. `src/components/movie-view/movie-view.jsx`
- Modified to safely access nested object properties
- Added conditional checks to handle potential missing data
- Implemented fallbacks for different property naming conventions (API uses capitalized property names)
- Added proper rendering for Genre and Director objects by accessing their Name properties

### 2. `src/components/movie-card/movie-card.jsx`
- Verified compatibility with API data structure
- Updated to handle potential differences in property naming (imageUrl vs ImagePath)

## Code Changes

### Updated MovieView Component
```jsx
export const MovieView = ({ selectedMovie, onBackClick }) => {
    return (
        <div className="movie-view">
            <div className="movie-poster">
                <img src={selectedMovie.ImagePath || selectedMovie.imageUrl} alt={selectedMovie.Title || selectedMovie.title} />
            </div>
            <div className="movie-details">
                <h2>{selectedMovie.Title || selectedMovie.title}</h2>
                
                {/* Handle nested Genre object */}
                <h3>Genre:</h3>
                <p>{selectedMovie.Genre ? selectedMovie.Genre.Name : 'Unknown'}</p>
                
                {/* Handle nested Director object */}
                <h3>Director:</h3>
                <p>{selectedMovie.Director ? selectedMovie.Director.Name : 'Unknown'}</p>
                
                <h3>Description:</h3>
                <p>{selectedMovie.Description || selectedMovie.description}</p>
                
                <button onClick={onBackClick}>Back</button>
            </div>
        </div>
    );
};
```

## Debugging Process

1. Identified the error message indicating an object was being rendered directly
2. Examined the API response structure using console.log
3. Found that Genre and Director were objects with their own properties
4. Updated the component to access nested properties correctly
5. Added fallback values and conditional checks for robustness

## Terminal Commands Used

```bash
# Restart the development server after changes
npm start

# View API response structure for debugging
curl -s https://myflix2-54ee4b2daeee.herokuapp.com/movies | jq '.[0]'
```

## Git Commands for Tracking Changes

```bash
# Add changes to staging
git add src/components/movie-view/movie-view.jsx

# Commit with descriptive message
git commit -m "Fix nested object rendering in MovieView component"

# Push to feature branch
git push origin feature/api-integration
```

## Lessons Learned

1. Always inspect API response structures before implementing components
2. Use conditional rendering and property access for nested objects
3. Provide fallbacks for potentially missing data
4. Consider differences in property naming conventions between your frontend and API

## Next Steps

1. Complete PropTypes implementation for all components
2. Add loading states during API fetch
3. Implement error handling UI for failed requests
4. Consider adding data transformation in the API fetch to normalize property names
