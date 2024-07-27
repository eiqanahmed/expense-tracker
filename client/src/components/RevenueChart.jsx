// src/components/ExpensePieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const RevenueChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += value;
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
      <Legend />
    </PieChart>
  );
};

export default RevenueChart;
