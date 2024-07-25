import React from 'react';
import AddTransaction from "../components/AddTransaction";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Input, Button, HStack, Box } from '@chakra-ui/react'
import TransactionsTable from '../components/TransactionsTable';

const MonthlyExpenses = () => {

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
        <AddTransaction fetchTransactions={fetchTransactions} />
        <TransactionsTable transactions={transactions} />
        

      
    </>
  )
}

export default MonthlyExpenses
