import React from 'react'
import axios from 'axios';
import { useEffect, useState, Icon } from 'react';
import { Text, Input, Button, VStack, HStack, Box } from '@chakra-ui/react'
import WelcomeMessage from '../components/WelcomeMessage';
import DailySpendings from '../components/DailySpendings';
import { FaCheckCircle, FaUser, FaChartLine } from 'react-icons/fa';

const Home = () => {

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getTransactions`)
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
      <Box mt="2rem" mb="2rem">
        <WelcomeMessage transactions={transactions} />
      </Box>
      <Box align="center" mt="6rem" mb="5rem">
        <DailySpendings data={transactions} />
      </Box>
    </>
  )
}

export default Home
