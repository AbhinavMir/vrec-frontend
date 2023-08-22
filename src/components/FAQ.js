import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router v6
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Button } from '@chakra-ui/react';

const FAQComponent = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const faqData = [
    {
      question: 'Is my data private and secure?',
      answer: 'We are implementing E2E as we speak. However, no one is peeking into your data. Our server has logs in case of any such incident happens.'
    },
    {
      question: 'Is this a release candidate?',
      answer: 'Eventually. Currently this is in pre-alpha stage. Many features are yet to work.'
    },
    {
      question: 'I think I found a bug!',
      answer: 'Please report it to atg271@gmail.com. I will try to fix it as soon as possible.'
    },
    {
      question: 'I cannot see my notes!',
      answer: 'Refresh the page. I have slowed down refresh rates because of the server laod. We will scale soon!'
    }
  ];

  return (
   <Box p = {4} >
      <Button onClick={handleGoBack} mb={4}>Back</Button>
      <Accordion allowMultiple>
        {faqData.map((faq, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {faq.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>{faq.answer}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FAQComponent;
