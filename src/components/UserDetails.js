import React, { useEffect, useState } from 'react';

const UserDetails = ({ accessToken }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch('https://vrec.onrender.com/api/user-details/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      }
    };

    fetchUserDetails();
  }, [accessToken]);

  if (!userDetails) {
    return <p>Loading user details...</p>;
  }

  return (
    <div>
      <p>ID: {userDetails.id}</p>
      <p>Email: {userDetails.email}</p>
      <p>Name: {userDetails.name}</p>
    </div>
  );
};

export default UserDetails;
