import React from 'react'
import { Text, Input, Button, VStack, HStack, Box, Flex } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const DailySpendings = ( { data }) => {

    const transformData = (data) => {
        const dailyTotals = data.reduce((acc, item) => {
          const date = new Date(item.date).toLocaleDateString(); // Convert date to a readable string
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += item.value;
          return acc;
        }, {});
    
        return Object.keys(dailyTotals).map(date => ({
          date,
          Profit: dailyTotals[date],
        }));
      };

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
    
      const transformedData = transformData(data);

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
    
      const currs = currTransactions(data);
    
      let total = 0;
      currs.forEach((transaction) => {
        total += Number(transaction.value);
      })

      const day = currentDate.getDate();

      let average = Math.round(total / Number(day));

  return (
    <>
    <Text mb="2%">On average, your daily profit has been ${average} in {currentMonth} so far</Text>
    <BarChart width={600} height={300} data={transformedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Profit" fill="#38B2AC" />
    </BarChart>
    </>
  )
}

export default DailySpendings
