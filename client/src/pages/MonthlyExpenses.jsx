import React from 'react';
import AddTransaction from "../components/AddTransaction";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Input, Button, HStack, Box } from '@chakra-ui/react'

const MonthlyExpenses = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/getTransactions")
        .then((transactions) => {
            setTransactions(transactions.data);
        }).catch((err) => {
            console.log(err);
        })
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

  return (
    <div>
        <AddTransaction />
        <Text >Expenses for {currentMonth}:</Text>

      
    </div>
  )
}

export default MonthlyExpenses
