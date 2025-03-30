import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import { Text, Box, Badge } from "@chakra-ui/react"

const RevenueChart = ({ data }) => {
  const COLORS = ["#76E4F7", "#0BC5EA", "#90cdf4", "#81E6D9", "#4FD1C5", "#319795", "#285E61"].reverse()

  const currentDate = new Date()
  const monthIndex = currentDate.getMonth()
  const year = currentDate.getFullYear()

  // Filter for positive values (income) and current month
  const filterData = (data) => {
    return data.filter((item) => {
      const date = new Date(item.date)
      return item.value > 0 && date.getMonth() === monthIndex && date.getFullYear() === year
    })
  }

  // Function to transform the data array
  const transformData = (data) => {
    const categoryTotals = data.reduce((acc, item) => {
      const { category, value } = item
      if (!acc[category.toUpperCase()]) {
        acc[category.toUpperCase()] = 0
      }
      acc[category.toUpperCase()] += value
      return acc
    }, {})

    return Object.keys(categoryTotals)
      .map((category) => ({
        name: category.toUpperCase(),
        value: categoryTotals[category],
      }))
      .sort((a, b) => b.value - a.value) // Sort by value descending
  }

  const filteredData = filterData(data)
  const transformedData = transformData(filteredData)

  // Calculate total income
  const totalIncome = transformedData.reduce((sum, item) => sum + item.value, 0)

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const percentage = ((data.value / totalIncome) * 100).toFixed(1)

      return (
        <Box bg="white" p={3} borderRadius="md" boxShadow="md" border="1px" borderColor="gray.200">
          <Text fontWeight="bold">{data.name}</Text>
          <Text color="green.600">${data.value.toFixed(2)}</Text>
          <Badge colorScheme="green">{percentage}% of total</Badge>
        </Box>
      )
    }
    return null
  }

  return (
    <Box width="100%" height="400px" display="flex" justifyContent="center" alignItems="center">
      {transformedData.length > 0 ? (
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      ) : (
        <Box textAlign="center">
          <Text color="gray.500">No income data available for this month</Text>
        </Box>
      )}
    </Box>
  )
}

export default RevenueChart

