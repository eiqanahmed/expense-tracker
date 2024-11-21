import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const RevenueChart = ({ data }) => {
  const COLORS = ['#76E4F7', '#0BC5EA', '#90cdf4', '#81E6D9', '#4FD1C5', '#319795', '#285E61'].reverse();

  // Get the current month and year
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Filter data for the current month and year
  const currentMonthData = data.filter((item) => {
    const itemDate = new Date(item.date); // Ensure `date` is part of your data and is in a valid format
    return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
  });

  // Include only positive values
  const filteredData = currentMonthData.filter((p) => p.value > 0);

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

    return Object.keys(categoryTotals).map((category) => ({
      name: category.toUpperCase(),
      value: categoryTotals[category],
    }));
  };

  const transformedData = transformData(filteredData);

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
      <Legend layout="vertical" verticalAlign="bottom" align="center" />
    </PieChart>
  );
};

export default RevenueChart;
