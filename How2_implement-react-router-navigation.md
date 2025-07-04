# How to Implement React Router Navigation

## Issue

The application was using React's state management to handle navigation between views, which caused several issues:
1. The browser's back/forward buttons didn't work correctly
2. Direct URL access to specific views wasn't possible
3. The application state was lost on page refresh

## Solution

We implemented client-side routing using `react-router-dom` v6 to handle navigation between views. This provides a better user experience and proper browser history management.

### Files Modified

1. **movie-card/movie-card.jsx**
   - Replaced `onClick` handler with React Router's `useNavigate` hook
   - Removed `setSelectedMovie` prop
   - Added navigation to movie details on button click

```jsx
// Before
<Button onClick={() => setSelectedMovie(movie)}>View</Button>

// After
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
// ...
<Button onClick={() => navigate(`/movies/${movie._id}`)}>View</Button>
```

2. **movie-view/movie-view.jsx**
   - Converted to a self-contained component that fetches its own data
   - Added loading and error states
   - Implemented similar movies functionality
   - Added proper back navigation

```jsx
// Before
const MovieView = ({ selectedMovie, onBackClick, similarMovies, setSelectedMovie }) => {
  // ...
  <Button onClick={onBackClick}>Back</Button>
  // ...
  <Button onClick={() => setSelectedMovie(movie)}>View</Button>

// After
const MovieView = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  // ...
  <Button onClick={() => navigate(-1)}>Back</Button>
  // ...
  <Button onClick={() => navigate(`/movies/${movie._id}`)}>View</Button>
```

3. **main-view/main-view.jsx**
   - Removed `selectedMovie` state
   - Updated routes to use React Router's declarative routing
   - Simplified the component structure

```jsx
// Before
<Routes>
  <Route path="/movies/:movieId" element={
    <MovieView 
      selectedMovie={selectedMovie}
      onBackClick={...}
      similarMovies={...}
      setSelectedMovie={...}
    />
  } />
</Routes>

// After
<Routes>
  <Route path="/movies/:movieId" element={<MovieView />} />
</Routes>
```

## Benefits

1. **Better UX**: Users can use browser navigation (back/forward buttons)
2. **Shareable URLs**: Direct links to specific views work
3. **State Persistence**: Page refresh maintains the current view
4. **Cleaner Code**: Separation of concerns with each component managing its own data

## Testing

1. Navigate between movie list and details
2. Use browser back/forward buttons
3. Refresh the page on any view
4. Test direct URL access (e.g., `/movies/123`)
5. Verify similar movies navigation

## Commands Used

No additional commands were needed as `react-router-dom` was already installed in the project.
