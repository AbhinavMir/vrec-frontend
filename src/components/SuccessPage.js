import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'; // Import the jwt-decode library
import { useNavigate } from 'react-router-dom';
import TxList from './TxList';
import Tx from './Tx';
function SuccessPage() {
  const [useruser_id, setUseruser_id] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token'); // Get the access token from local storage
    console.log(accessToken)
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken); // Decode the access token
      console.log(decodedToken)
      const user_id = decodedToken.user_id
      console.log(user_id)
      setUseruser_id(user_id);
    }
  }, []);

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('access_token');
    setUseruser_id('');

    // Redirect to the root route
    navigate('/');
  };

  return (
    <div>
      <h2>Signup Successful!</h2>
      <p>Your user_id: {useruser_id}</p>
      <button onClick={handleLogout}>Logout</button>
      <TxList />
    </div>
  );
}

export default SuccessPage;
