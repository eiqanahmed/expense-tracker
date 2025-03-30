import {
  Text,
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts"
import { FaChartSimple, FaMoneyBillTrendUp } from "react-icons/fa6"

const DailySpendings = ({ data }) => {
  const currentDate = new Date()
  const monthIndex = currentDate.getMonth()
  const year = currentDate.getFullYear()
  const chartWidth = useBreakpointValue({ base: 300, sm: 400, md: 500, lg: 600 })
  const chartHeight = useBreakpointValue({ base: 250, md: 300 })

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const daysInMonth = getDaysInMonth(monthIndex, year)
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const transformData = (data) => {
    const dailyTotals = data.reduce((acc, item) => {
      const date = new Date(item.date)
      if (date.getMonth() === monthIndex && date.getFullYear() === year) {
        const day = date.getDate()
        if (!acc[day]) {
          acc[day] = 0
        }
        acc[day] -= item.value
      }
      return acc
    }, {})

    return daysArray.map((day) => ({
      date: `${monthIndex + 1}/${day}/${year}`,
      Expenses: dailyTotals[day] || 0,
    }))
  }

  const expensesData = data.filter((p) => p.value < 0)

  const currentMonth = monthNames[monthIndex]
  const transformedData = transformData(expensesData)

  const currTransactions = (allTransactions) => {
    return allTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date)
      return transactionDate.getMonth() === monthIndex && transactionDate.getFullYear() === year
    })
  }

  const currs = currTransactions(data)

  const total = currs.reduce((sum, transaction) => {
    if (transaction.value < 0) {
      return sum - Number(transaction.value)
    }
    return sum
  }, 0)

  const day = currentDate.getDate()
  const average = (total / day).toFixed(2)

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="white" p={3} borderRadius="md" boxShadow="md" border="1px" borderColor="gray.200">
          <Text fontWeight="bold">{label}</Text>
          <Text color="teal.600">Expenses: ${Math.abs(payload[0].value).toFixed(2)}</Text>
        </Box>
      )
    }
    return null
  }

  return (
    <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
      <GridItem>
        <Box
          bg="teal.50"
          p={4}
          borderRadius="lg"
          boxShadow="sm"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Flex align="center" mb={4}>
            <Icon as={FaMoneyBillTrendUp} color="teal.500" mr={2} />
            <Text fontWeight="medium" color="teal.700">
              Expense Summary
            </Text>
          </Flex>

          <Stat mb={4}>
            <StatLabel color="gray.600">Total Expenses This Month</StatLabel>
            <StatNumber fontSize="3xl" color="teal.600">
              ${total.toFixed(2)}
            </StatNumber>
            <StatHelpText>
              For {currentMonth} {year}
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel color="gray.600">Daily Average</StatLabel>
            <StatNumber fontSize="2xl" color="teal.500">
              ${average}
            </StatNumber>
            <StatHelpText>Based on {day} days so far</StatHelpText>
          </Stat>
        </Box>
      </GridItem>

      <GridItem>
        <Box>
          <Flex align="center" mb={4}>
            <Icon as={FaChartSimple} color="teal.500" mr={2} />
            <Text fontWeight="medium" color="teal.700">
              Daily Spending Trends
            </Text>
          </Flex>

          <Box overflowX="auto">
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.split("/")[1]}
                  stroke="#718096"
                />
                <YAxis stroke="#718096" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Expenses" fill="#38B2AC" radius={[4, 4, 0, 0]} barSize={chartWidth > 400 ? 20 : 15} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  )
}

export default DailySpendings

