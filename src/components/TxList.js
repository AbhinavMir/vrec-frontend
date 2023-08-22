import React, { useState, useEffect } from 'react';
import { Box, Card, Text } from '@chakra-ui/react';

const TranscriptionMessage = ({ id, date, transcript }) => {
  return (
    <Card p={4} mb={3} borderWidth="1px" borderRadius="md">
      <Text fontSize="sm">Date: {date}</Text>
      <Text fontSize="sm">Transcript: {transcript}</Text>
    </Card>
  );
};

const TxList = () => {
  const [txs, settxs] = useState([]); // State for storing Transcription txs

  useEffect(() => {
    // Simulate isLoggedIn for demonstration
    const isLoggedIn = true;

    if (isLoggedIn) {
      const accessToken = localStorage.getItem('access_token'); // Get the access token from local storage
      fetch('https://vrec.onrender.com/api/get-transcriptions/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => response.json())
        .then(data => settxs(data)) // Set the fetched txs data
        .catch(error => console.error('Error fetching txs:', error));
    }
  }, []); // Empty dependency array means this effect will run once on component mount

  return (
    <Box p={4}>
      <Text fontSize="lg" fontWeight="bold" mb={3}>
        Transcription History
      </Text>
      {txs.map(message => (
        <TranscriptionMessage
          key={message.id}
          id={message.id}
          date={message.date}
          transcript={message.transcript}
        />
      ))}
    </Box>
  );
};

export default TxList;
