import { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(""); // Clear any previous errors

        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        };

        console.log("Sending signup data:", data);

        fetch("https://myflix2-54ee4b2daeee.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log("Signup response status:", response.status);
                if (response.ok) {
                    return response.json().then(data => {
                        console.log("Signup successful:", data);
                        alert("Signup successful");
                        window.location.reload();
                    });
                } else {
                    // Try to get error message from response
                    return response.json().then(err => {
                        console.error("Signup error:", err);
                        setError(err.error || "Signup failed");
                    }).catch(e => {
                        console.error("Error parsing response:", e);
                        setError(`Signup failed: ${response.status}`);
                    });
                }
            })
            .catch((e) => {
                console.error("Fetch error:", e);
                setError(`Network error: ${e.message}`);
            });
    };

    return (
        <>
            <h1>Signup</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Birthday:
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};