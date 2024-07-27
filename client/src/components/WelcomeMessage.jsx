import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, Input, Button, VStack, HStack, Box, Flex } from '@chakra-ui/react';

const WelcomeMessage = ({ transactions }) => {

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

    const currTransactions = (allTransactions) => {
        let arr = [];
        allTransactions.forEach((transaction) => {
            const curr = new Date();
            const d = new Date(transaction.date);
            if (d.getMonth() === curr.getMonth()) {
                arr.push(transaction);
            }
        }
        
        )
        return arr;
      }
    
      const currs = currTransactions(transactions);
    
      let total = 0;
      currs.forEach((transaction) => {
        total += Number(transaction.value);
      })


  return (
    <>
    <Box align="center" mt="10%">
      <Text fontSize="4xl" fontWeight="bold">Welcome to your Expense Tracker! </Text>
        <HStack justifyContent="center" alignItms="center">
          <Text fontSize="1.25rem">Your total expenses for {currentMonth} so far are: </Text>
          <Text fontSize="1.25rem" color="teal">${total}</Text>
        </HStack>
    </Box>
    </>
  )
}

export default WelcomeMessage
