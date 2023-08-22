import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const RecordingTool = () => {
  const {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (listening) {
      SpeechRecognition.startListening({ continuous: true });
    }

    return () => {
      SpeechRecognition.stopListening();
    };
  }, [listening]);

  return (
    <div>
      <h2>Recording Tool</h2>
      <p>Transcript: {transcript}</p>
      <button onClick={startListening} disabled={listening}>
        Start Recording
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop Recording
      </button>
      <button onClick={resetTranscript}>Reset Transcript</button>
    </div>
  );
};

export default RecordingTool;
