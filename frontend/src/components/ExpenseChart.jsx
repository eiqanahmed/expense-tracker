import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Text, Box } from '@chakra-ui/react';

const ExpenseChart = ({ data }) => {
  const COLORS = ['#76E4F7', '#0BC5EA', '#90cdf4', '#81E6D9', '#4FD1C5', '#319795', '#285E61'].reverse();

  const currentDate = new Date();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const transformData = (data) => {
    const categoryTotals = data.reduce((acc, item) => {
      const date = new Date(item.date);
      if (date.getMonth() === monthIndex && date.getFullYear() === year && item.value < 0) {
        const { category, value } = item;
        if (!acc[category.toUpperCase()]) {
          acc[category.toUpperCase()] = 0;
        }
        acc[category.toUpperCase()] -= value; // Convert value to positive
      }
      return acc;
    }, {});

    return Object.keys(categoryTotals).map(category => ({
      name: category.toUpperCase(),
      value: categoryTotals[category],
    }));
  };

  const transformedData = transformData(data);

  return (
    <Box>
      <PieChart width={400} height={400}>
        <Pie
          data={transformedData}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Box>
  );
};

export default ExpenseChart;
