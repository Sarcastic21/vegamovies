import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Admin.css';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Check if the response is OK before parsing the JSON
        if (!response.ok) {
            const errorData = await response.json(); // Attempt to read the error response
            throw new Error(errorData.message || 'Login failed'); // Throw an error with the message
        }

        const data = await response.json(); // Parse the response only if the status is OK

        // Save the JWT token to local storage or cookies
        localStorage.setItem('token', data.token);
        setAuth(true); // Set authentication state
        navigate('/admin'); // Navigate to the admin page
    } catch (err) {
        console.error('Error during login:', err);
        alert(err.message); // Display the error message to the user
    }
};

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
