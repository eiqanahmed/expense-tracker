import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, Input, Button, VStack, HStack, Box } from '@chakra-ui/react'
import WelcomeMessage from '../components/WelcomeMessage';
import DailySpendings from '../components/DailySpendings';

const Home = () => {

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    axios.get("http://localhost:3001/getTransactions")
      .then(response => {
        setTransactions(response.data);
      })
      .catch(err => console.log(err));
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);



  return (
    <>
      <Box mt="12%">
        <WelcomeMessage transactions={transactions} />
      </Box>
      <Box align="center" mt="10%" mb="5%">
        <DailySpendings data={transactions} />
      </Box>
    </>
  )
}

export default Home
