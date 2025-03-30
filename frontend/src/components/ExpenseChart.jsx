import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Text, Box, Flex, Badge } from "@chakra-ui/react"

const ExpenseChart = ({ data }) => {
  const COLORS = ["#76E4F7", "#0BC5EA", "#90cdf4", "#81E6D9", "#4FD1C5", "#319795", "#285E61"].reverse()

  const currentDate = new Date()
  const monthIndex = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const transformData = (data) => {
    const categoryTotals = data.reduce((acc, item) => {
      const date = new Date(item.date)
      if (date.getMonth() === monthIndex && date.getFullYear() === year && item.value < 0) {
        const { category, value } = item
        if (!acc[category.toUpperCase()]) {
          acc[category.toUpperCase()] = 0
        }
        acc[category.toUpperCase()] -= value // Convert value to positive
      }
      return acc
    }, {})

    return Object.keys(categoryTotals)
      .map((category) => ({
        name: category.toUpperCase(),
        value: categoryTotals[category],
      }))
      .sort((a, b) => b.value - a.value) // Sort by value descending
  }

  const transformedData = transformData(data)

  // Calculate total expenses
  const totalExpenses = transformedData.reduce((sum, item) => sum + item.value, 0)

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const percentage = ((data.value / totalExpenses) * 100).toFixed(1)

      return (
        <Box bg="white" p={3} borderRadius="md" boxShadow="md" border="1px" borderColor="gray.200">
          <Text fontWeight="bold">{data.name}</Text>
          <Text color="teal.600">${data.value.toFixed(2)}</Text>
          <Badge colorScheme="teal">{percentage}% of total</Badge>
        </Box>
      )
    }
    return null
  }

  // Custom legend renderer
  const renderCustomizedLegend = (props) => {
    const { payload } = props

    return (
      <Box display="flex" flexWrap="wrap" justifyContent="center" mt={2}>
        {payload.map((entry, index) => (
          <Flex key={`item-${index}`} align="center" mr={3} mb={1}>
            <Box w="12px" h="12px" borderRadius="sm" bg={entry.color} mr={1} />
            <Text fontSize="xs">{entry.value}</Text>
          </Flex>
        ))}
      </Box>
    )
  }

  return (
    <Box>
      {transformedData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={transformedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {transformedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderCustomizedLegend} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Box height="300px" display="flex" alignItems="center" justifyContent="center">
          <Text color="gray.500">No expense data available for this month</Text>
        </Box>
      )}
    </Box>
  )
}

export default ExpenseChart

