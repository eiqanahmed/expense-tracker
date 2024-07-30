import React from 'react';
import { Text, Input, Button, VStack, HStack, Box, Flex } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const DailySpendings = ({ data }) => {
  const currentDate = new Date();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(monthIndex, year);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const transformData = (data) => {
    const dailyTotals = data.reduce((acc, item) => {
      const date = new Date(item.date);
      const day = date.getDate();
      if (!acc[day]) {
        acc[day] = 0;
      }
      acc[day] -= item.value;
      return acc;
    }, {});

    return daysArray.map(day => ({
      date: `${monthIndex + 1}/${day}/${year}`,
      Expenses: dailyTotals[day] || 0,
    }));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let expensesData = [];
  data.forEach(p => {
    if (p.value < 0) {
      expensesData.push(p);
    }
  })

  const currentMonth = monthNames[monthIndex];
  const transformedData = transformData(expensesData);

  const currTransactions = (allTransactions) => {
    return allTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === monthIndex && transactionDate.getFullYear() === year;
    });
  };

  const currs = currTransactions(data);

  let total = 0;
  currs.forEach(transaction => {
    if (transaction.value < 0) {
    total -= Number(transaction.value);
    }
  });

  const day = currentDate.getDate();
  let average1 = total / Number(day);
  let average = average1.toFixed(2);

  return (
    <>
      <Text mb="2%">On average, your daily expenses have been ${average} in {currentMonth} so far.</Text>
      <BarChart width={600} height={300} data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Expenses" fill="#38B2AC" />
      </BarChart>
    </>
  );
}

export default DailySpendings;
