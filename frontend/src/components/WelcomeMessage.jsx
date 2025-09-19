import {
  Text,
  VStack,
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react"
import { FaSackDollar, FaCalendarDays } from "react-icons/fa6"

const WelcomeMessage = ({ transactions }) => {
  const currentDate = new Date()
  const gradientBg = "linear(to-r, #4FD1C5, #81E6D9, #4299e1)"
  const statBg = useColorModeValue("white", "gray.700")

  // Array of month names
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

  // Get the current month index (0-11)
  const currentMonthIndex = currentDate.getMonth()

  // Get the name of the current month
  const currentMonth = monthNames[currentMonthIndex]

  const currTransactions = (allTransactions) => {
    const arr = []
    allTransactions.forEach((transaction) => {
      const curr = new Date()
      const d = new Date(transaction.date)
      if (d.getMonth() === curr.getMonth() && d.getFullYear() === curr.getFullYear()) {
        arr.push(transaction)
      }
    })
    return arr
  }

  const currs = currTransactions(transactions)

  let total = 0
  currs.forEach((transaction) => {
    total += Number(transaction.value)
  })

  return (
    <Box bgGradient={gradientBg} borderRadius="xl" overflow="hidden" boxShadow="lg">
      <Flex direction={{ base: "column", md: "row" }} p={{ base: 6, md: 8 }} align="center" justify="space-between">
        <VStack align={{ base: "center", md: "flex-start" }} spacing={2} mb={{ base: 6, md: 0 }}>
          <Flex align="center">
            <Icon as={FaCalendarDays} mr={2} color="teal.800" />
            <Text color="teal.800" fontSize="lg" fontWeight="medium">
              {currentMonth} {currentDate.getFullYear()}
            </Text>
          </Flex>
          <Text color="teal.900" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" lineHeight="1.2">
            Welcome to your Expense Tracker!
          </Text>
          <Text color="teal.800" fontSize="md">
            Track, analyze, and optimize your spending habits
          </Text>
        </VStack>

        <Box bg={statBg} p={4} borderRadius="lg" boxShadow="sm" minW={{ base: "full", md: "220px" }}>
          <Stat>
            <StatLabel color="gray.600" fontSize="sm" display="flex" alignItems="center">
              <Icon as={FaSackDollar} mr={2} color="teal.500" />
              Total Savings in {currentMonth}
            </StatLabel>
            <StatNumber fontSize="3xl" fontWeight="bold" color={total >= 0 ? "teal.600" : "red.500"}>
              ${total.toFixed(2)}
            </StatNumber>
            <StatHelpText fontSize="xs">Updated as of today</StatHelpText>
          </Stat>
        </Box>
      </Flex>
    </Box>
  )
}

export default WelcomeMessage

