// src/components/ExpensePieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Text, Input, Button, VStack, HStack, Box } from '@chakra-ui/react'

const RevenueChart = ({ data }) => {
  const COLORS = ['#76E4F7' ,'#0BC5EA' ,'#90cdf4', '#81E6D9', '#4FD1C5', '#319795', '#285E61'].reverse();

  let modifiedData = []
  data.forEach((p) => {
    if (p.value > 0) {
        modifiedData.push(p);
    }
  })


  // Function to transform the data array
  const transformData = (data) => {
    const categoryTotals = data.reduce((acc, item) => {
      const { category, value } = item;
      if (!acc[category.toUpperCase()]) {
        acc[category.toUpperCase()] = 0;
      }
      acc[category.toUpperCase()] += value;
      return acc;
    }, {});

    return Object.keys(categoryTotals).map(category => ({
      name: category.toUpperCase(),
      value: categoryTotals[category],
    }));
  };

  const transformedData = transformData(modifiedData);

  return (
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
      <Legend layout="vertical" verticalAlign="bottom" align="center"/>
    </PieChart>
  );
};

export default RevenueChart;
