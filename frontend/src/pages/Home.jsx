"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Box, Container, Heading, useColorModeValue, Flex, Icon } from "@chakra-ui/react"
import { FaChartLine, FaWallet } from "react-icons/fa"
import WelcomeMessage from "../components/WelcomeMessage"
import DailySpendings from "../components/DailySpendings"

const Home = () => {
  const [transactions, setTransactions] = useState([])
  const bgColor = useColorModeValue("gray.50", "gray.900")

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

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Flex direction="column" gap={6}>
          <Flex align="center" mb={2}>
            <Icon as={FaWallet} w={8} h={8} color="teal.500" mr={3} />
            <Heading size="lg" color="teal.700">
              Expense Tracker
            </Heading>
          </Flex>

          <WelcomeMessage transactions={transactions} />

          <Box bg="white" borderRadius="xl" boxShadow="md" p={6} mt={4}>
            <Flex align="center" mb={6}>
              <Icon as={FaChartLine} w={6} h={6} color="teal.500" mr={3} />
              <Heading size="md" color="teal.700">
                Spending Analysis
              </Heading>
            </Flex>
            <DailySpendings data={transactions} />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Home

