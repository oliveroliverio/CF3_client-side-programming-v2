# How to Fix React Login Authentication with API

## Issue
The React myFlix client application was unable to authenticate users due to incorrect API endpoint configuration and token handling.

## Root Causes
1. Incorrect login endpoint path (`/login` instead of `/users/login`)
2. Missing token in the dependency array for the `useEffect` hook that fetches movies
3. Potential mismatch between field names in the request and what the API expects

## Solution Steps

### 1. Test API Endpoints with curl

First, we tested the API endpoints to understand the correct paths and expected request formats:

```bash
# Test incorrect login endpoint
curl -s -X POST -H "Content-Type: application/json" -d '{"username": "indielover", "password": "moonlightsonata"}' https://myflix2-54ee4b2daeee.herokuapp.com/login

# Test correct login endpoint with lowercase field names
curl -s -X POST -H "Content-Type: application/json" -d '{"username": "indielover", "password": "moonlightsonata"}' https://myflix2-54ee4b2daeee.herokuapp.com/users/login

# Check available users
curl -s -X GET -H "Content-Type: application/json" https://myflix2-54ee4b2daeee.herokuapp.com/users | jq '.[] | {id, username}'
```

### 2. Fix Login Endpoint in React Component

Update the login endpoint in `login-view.jsx` from `/login` to `/users/login`:

```jsx
// Change this line
fetch("https://myflix2-54ee4b2daeee.herokuapp.com/login", {

// To this
fetch("https://myflix2-54ee4b2daeee.herokuapp.com/users/login", {
```

### 3. Ensure Field Names Match API Expectations

Make sure the field names in the request match what the API expects:

```jsx
const data = {
    username: username,  // lowercase field names
    password: password
};
```

### 4. Update useEffect Dependency Array

In `main-view.jsx`, update the dependency array in the `useEffect` hook to include the token:

```jsx
useEffect(() => {
    if (!token) return;
    fetch(HEROKU_API_URL + '/movies', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(data => {
            console.log("Movie data structure:", JSON.stringify(data[0], null, 2));
            setMovies(data);
        })
        .catch(error => console.error("Error fetching movies:", error));
}, [token]); // Add token to the dependency array
```

### 5. Test the Application

Start the development server and test the login functionality:

```bash
# Start the development server
npm run start

# Clear Parcel cache if needed
rm -rf .parcel-cache dist && npm run start
```

### 6. Debug with Browser Developer Tools

To verify the login is working correctly:

1. Open Developer Tools (right-click → Inspect or press F12)
2. Check Local Storage for user and token:
   - Go to Application tab → Local Storage → http://localhost:XXXX
   - Verify "user" and "token" entries exist
3. Check Network tab for API requests:
   - Look for the login request to "/users/login"
   - Verify it returns a successful response
   - Check that subsequent movie requests include the Authorization header

## Additional Improvements

### Add Better Error Handling

```jsx
.then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        // Check specific status codes
        if (response.status === 401) {
            throw new Error("Invalid username or password");
        } else if (response.status === 400) {
            throw new Error("Username or password cannot be empty");
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    }
})
```

### Add Error Display in UI

```jsx
const [error, setError] = useState("");

// In the catch block
.catch((e) => {
    setError(e.message);
    console.log(e);
});

// In the JSX
return (
    <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {/* rest of your form */}
    </form>
);
```

## Terminal Commands Used

```bash
# Test API endpoints
curl -s -X POST -H "Content-Type: application/json" -d '{"username": "indielover", "password": "moonlightsonata"}' https://myflix2-54ee4b2daeee.herokuapp.com/users/login

# List users
curl -s -X GET -H "Content-Type: application/json" https://myflix2-54ee4b2daeee.herokuapp.com/users | jq '.[] | {id, username}'

# Start development server
npm run start

# Clear Parcel cache (if needed)
rm -rf .parcel-cache dist

# Git commands for version control
git add src/components/login-view/login-view.jsx src/components/main-view/main-view.jsx
git commit -m "Fix login authentication with correct API endpoint and token handling"
git push origin exercise/3.5-react-forms
```

## Key Lessons

1. Always verify API endpoints with direct testing tools like curl before implementing in code
2. Ensure field names in requests match what the API expects
3. Remember to include state variables in useEffect dependency arrays when they affect the operation
4. Use browser developer tools to debug authentication issues by checking local storage and network requests
5. Implement proper error handling to provide meaningful feedback to users
