import React from 'react';
import AddTransaction from "../components/AddTransaction";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Input, Button, HStack, VStack, Box, List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react'
import TransactionsTable from '../components/TransactionsTable';
import ExpenseChart from '../components/ExpenseChart';
import RevenueChart from '../components/RevenueChart';

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

  let expensesTotal = 0;
  let revenueTotal = 0;
  transactions.forEach((transaction) => {
    if (transaction.value < 0) {
      expensesTotal -= transaction.value;
    } else {
      revenueTotal += transaction.value;
    }
  })


  const currentDate = new Date();

  // Array of month names
  const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  // Get the current month index (0-11)
  const currentMonthIndex = currentDate.getMonth();

  // Get the name of the current month
  const currentMonth = monthNames[currentMonthIndex];

  // border="2px solid black"

  return (
    <>
      <Text fontSize="4xl" ml="6%" mt="3%" textAlign="left" fontWeight="bold">Monthly Expenses</Text>
      <Box mt="3%" ml="6%" width="45%">
        <Text mt="-2%" textAlign="left" fontSize="1xl">You can track your monthly expenses on this page. Use negative values to input expenses, and positive values to input revenues (e.g. income). Be sure to enter a valid category; all valid categories are listed below. </Text>
        <HStack mt="3%" align="left">
          <VStack align="left">
            <Text textAlign="left">Expenses:</Text>
            <UnorderedList align="left">
              <ListItem>Housing</ListItem>
              <ListItem>Food</ListItem>
              <ListItem>Transportation</ListItem>
              <ListItem>Medical</ListItem>
              <ListItem>Other</ListItem>
            </UnorderedList>
          </VStack>
          <VStack ml="20%" align="left">
            <Text textAlign="left">Revenues:</Text>
            <UnorderedList align="left">
              <ListItem>Income</ListItem>
              <ListItem>Other</ListItem>
            </UnorderedList>
          </VStack>
        </HStack>
      </Box>
      <Box mt="-1%">
        <AddTransaction fetchTransactions={fetchTransactions} />
        <TransactionsTable transactions={transactions} fetchTransactions={fetchTransactions} />
        <Box align="center" ml="65%" mt="-65%">
          <Text mb="-3%" fontSize="2xl">Your total expenses for {currentMonth} are: ${expensesTotal}</Text>
          <ExpenseChart data={transactions}/>
        </Box>
        <Box mt="7%" mb="5%" align="center" ml="65%">
          <Text mb="-3%" fontSize="2xl"> Your total revenues for {currentMonth} are: ${revenueTotal}</Text>
          <RevenueChart data={transactions} />
        </Box>
      </Box>
        

      
    </>
  )
}

export default MonthlyExpenses
