"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Box, Container, Heading, Grid, GridItem, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { FaChartPie, FaMoneyBillWave, FaListAlt, FaPlusCircle } from "react-icons/fa"
import ExpenseChart from "../components/ExpenseChart"
import RevenueChart from "../components/RevenueChart"
import TransactionsTable from "../components/TransactionsTable"
import AddTransaction from "../components/AddTransaction"

const MonthlyExpenses = () => {
  const [transactions, setTransactions] = useState([])
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const cardBg = useColorModeValue("white", "gray.800")

  const fetchTransactions = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getTransactions`)
      .then((response) => {
        setTransactions(response.data)
      })
      .catch((err) => console.log(err))
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchTransactions()
  }, [])

  // Get current month name
  const currentDate = new Date()
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
  const currentMonth = monthNames[currentDate.getMonth()]
  const currentYear = currentDate.getFullYear()

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Flex direction="column" gap={6}>
          <Flex align="center" mb={2}>
            <Icon as={FaMoneyBillWave} w={8} h={8} color="teal.500" mr={3} />
            <Heading size="lg" color="teal.700">
              Monthly Expenses
            </Heading>
          </Flex>

          <Box bg={cardBg} p={6} borderRadius="xl" boxShadow="md" borderTop="4px solid" borderColor="teal.400">
            <Flex
              justify="space-between"
              align="center"
              mb={4}
              direction={{ base: "column", sm: "row" }}
              gap={{ base: 2, sm: 0 }}
            >
              <Heading size="md" color="teal.700">
                Financial Overview: {currentMonth} {currentYear}
              </Heading>
              <Text bg="teal.50" color="teal.700" px={3} py={1} borderRadius="md" fontWeight="medium">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Flex>

            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} mb={8}>
              <GridItem>
                <Box bg="teal.50" p={4} borderRadius="lg" boxShadow="sm" height="100%">
                  <Flex align="center" mb={4}>
                    <Icon as={FaChartPie} color="red.500" mr={2} />
                    <Text fontWeight="bold" color="teal.700">
                      Expense Breakdown
                    </Text>
                  </Flex>
                  <Box display="flex" justifyContent="center">
                    <ExpenseChart data={transactions} />
                  </Box>
                </Box>
              </GridItem>

              <GridItem>
                <Box bg="teal.50" p={4} borderRadius="lg" boxShadow="sm" height="100%">
                  <Flex align="center" mb={4}>
                    <Icon as={FaChartPie} color="green.500" mr={2} />
                    <Text fontWeight="bold" color="teal.700">
                      Income Breakdown
                    </Text>
                  </Flex>
                  <Box display="flex" justifyContent="center">
                    <RevenueChart data={transactions} />
                  </Box>
                </Box>
              </GridItem>
            </Grid>

            <Grid templateColumns={{ base: "1fr", xl: "3fr 1fr" }} gap={6}>
              <GridItem>
                <Box bg={cardBg} p={4} borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
                  <Flex align="center" mb={4}>
                    <Icon as={FaListAlt} color="teal.500" mr={2} />
                    <Text fontWeight="bold" color="teal.700">
                      Transactions for {currentMonth}
                    </Text>
                  </Flex>
                  <TransactionsTable transactions={transactions} fetchTransactions={fetchTransactions} />
                </Box>
              </GridItem>

              <GridItem>
                <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
                  <Flex align="center" mb={4}>
                    <Icon as={FaPlusCircle} color="teal.500" mr={2} />
                    <Text fontWeight="bold" color="teal.700">
                      Add New Transaction
                    </Text>
                  </Flex>
                  <AddTransaction fetchTransactions={fetchTransactions} />
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default MonthlyExpenses

