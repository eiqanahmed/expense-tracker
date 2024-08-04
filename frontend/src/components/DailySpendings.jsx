import React from 'react';
import { Text, VStack, Box } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const DailySpendings = ({ data }) => {
  const currentDate = new Date();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(monthIndex, year);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const transformData = (data) => {
    const dailyTotals = data.reduce((acc, item) => {
      const date = new Date(item.date);
      if (date.getMonth() === monthIndex && date.getFullYear() === year) {
        const day = date.getDate();
        if (!acc[day]) {
          acc[day] = 0;
        }
        acc[day] -= item.value;
      }
      return acc;
    }, {});

    return daysArray.map(day => ({
      date: `${monthIndex + 1}/${day}/${year}`,
      Expenses: dailyTotals[day] || 0,
    }));
  };

  const expensesData = data.filter(p => p.value < 0);

  const currentMonth = monthNames[monthIndex];
  const transformedData = transformData(expensesData);

  const currTransactions = (allTransactions) => {
    return allTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === monthIndex && transactionDate.getFullYear() === year;
    });
  };

  const currs = currTransactions(data);

  const total = currs.reduce((sum, transaction) => {
    if (transaction.value < 0) {
      return sum - Number(transaction.value);
    }
    return sum;
  }, 0);

  const day = currentDate.getDate();
  const average = (total / day).toFixed(2);

  return (
    <VStack>
      <Text mb="2%">On average, your daily expenses have been ${average} in {currentMonth} so far.</Text>
      <Box>
        <BarChart width={600} height={300} data={transformedData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Expenses" fill="#38B2AC" />
        </BarChart>
      </Box>
    </VStack>
  );
}

export default DailySpendings;
