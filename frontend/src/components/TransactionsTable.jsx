"use client"
import axios from "axios"
import {
  Text,
  Button,
  Box,
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Badge,
  Icon,
  useColorModeValue,
  Flex,
  Tooltip,
} from "@chakra-ui/react"
import { FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa"

const TransactionsTable = ({ transactions, fetchTransactions }) => {
  const currentDate = new Date()
  const monthIndex = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const evenRowBg = useColorModeValue("gray.50", "gray.700")
  const hoverBg = useColorModeValue("gray.100", "gray.600")

  // Format date to DD/MM/YYYY
  const formatDate = (date) => {
    const today = new Date(date)
    const yyyy = today.getFullYear()
    let mm = today.getMonth() + 1 // Months start at 0!
    let dd = today.getDate()

    if (dd < 10) dd = "0" + dd
    if (mm < 10) mm = "0" + mm

    return dd + "/" + mm + "/" + yyyy
  }

  // Filter transactions for current month
  const getCurrentMonthTransactions = (allTransactions) => {
    return allTransactions.filter((transaction) => {
      const d = new Date(transaction.date)
      return d.getMonth() === monthIndex && d.getFullYear() === year
    })
  }

  const currentMonthTransactions = getCurrentMonthTransactions(transactions)

  // Calculate total for current month
  const total = currentMonthTransactions.reduce((sum, transaction) => {
    return sum + Number(transaction.value)
  }, 0)

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteTransaction/${id}`)
      fetchTransactions()
    } catch (err) {
      console.error("Error deleting transaction:", err)
    }
  }

  // Get category badge color
  const getCategoryColor = (category) => {
    const categoryColors = {
      HOUSING: "blue",
      UTILITIES: "purple",
      FOOD: "orange",
      TRANSPORTATION: "yellow",
      MEDICAL: "red",
      INCOME: "green",
      OTHER: "gray",
    }

    return categoryColors[category.toUpperCase()] || "gray"
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="medium">
          Total Balance:
          <Badge ml={2} colorScheme={total >= 0 ? "green" : "red"} fontSize="md" px={2} py={1}>
            ${total.toFixed(2)}
          </Badge>
        </Text>
        <Text fontSize="sm" color="gray.500">
          {currentMonthTransactions.length} transactions
        </Text>
      </Flex>

      {currentMonthTransactions.length > 0 ? (
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead bg="teal.50">
              <Tr>
                <Th>Item</Th>
                <Th isNumeric>Amount ($)</Th>
                <Th>Category</Th>
                <Th>Date</Th>
                <Th width="80px"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentMonthTransactions.map((transaction, index) => (
                <Tr
                  key={transaction._id || index}
                  bg={index % 2 === 1 ? evenRowBg : "transparent"}
                  _hover={{ bg: hoverBg }}
                  transition="background 0.2s"
                >
                  <Td>{transaction.item}</Td>
                  <Td isNumeric>
                    <Flex align="center" justify="flex-end">
                      <Icon
                        as={transaction.value >= 0 ? FaArrowUp : FaArrowDown}
                        color={transaction.value >= 0 ? "green.500" : "red.500"}
                        mr={2}
                        fontSize="xs"
                      />
                      <Text fontWeight="medium" color={transaction.value >= 0 ? "green.600" : "red.600"}>
                        {transaction.value.toFixed(2)}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Badge colorScheme={getCategoryColor(transaction.category)}>
                      {transaction.category.toUpperCase()}
                    </Badge>
                  </Td>
                  <Td>{formatDate(transaction.date)}</Td>
                  <Td>
                    <Tooltip label="Delete transaction" placement="top">
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => deleteTransaction(transaction._id)}
                        aria-label="Delete transaction"
                      >
                        <Icon as={FaTrash} />
                      </Button>
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Box py={10} textAlign="center" bg="gray.50" borderRadius="md">
          <Text color="gray.500">No transactions found for this month</Text>
        </Box>
      )}
    </Box>
  )
}

export default TransactionsTable

