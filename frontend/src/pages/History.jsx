import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer, Center
} from '@chakra-ui/react';

const groupTransactionsByMonthAndYear = (transactions) => {
  const grouped = {};
  transactions.forEach((transaction) => {
    let currDate = new Date(transaction.date);
    const monthYear = `${currDate.getMonth() + 1}-${currDate.getFullYear()}`;
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(transaction);
  });
  return grouped;
};

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [groupedTransactions, setGroupedTransactions] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.CREATE_REACT_APP_BACKEND_BASEURL}/getTransactions`)
      .then(response => {
        setTransactions(response.data);
        setGroupedTransactions(groupTransactionsByMonthAndYear(response.data));
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <VStack mt="-1%" ml="4.75%" spacing={4} align="start" p={5}>
      <Text color="#319795" fontSize="4xl"  mt="3%" fontWeight="bold">Transaction History</Text>
      <Text mb="2.5%">This page displays all your past financial transactions by month and year, providing a clear overview of your spending history.</Text>
      {Object.keys(groupedTransactions).map(monthYear => (
        <Box mb="6%" key={monthYear} width="100%">
          <Text fontSize="xl" mb={4}>{monthYear}</Text>
          <Center>
          <TableContainer width="80%" >
            <Table variant="simple" >
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th>Value($)</Th>
                  <Th>Category</Th>
                  <Th>Date Added</Th>
                </Tr>
              </Thead>
              <Tbody>
                {groupedTransactions[monthYear].map(transaction => (
                  <Tr key={transaction.id}>
                    <Td>{transaction.item}</Td>
                    <Td>{transaction.value.toFixed(2)}</Td>
                    <Td>{transaction.category.toUpperCase()}</Td>
                    <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          </Center>
        </Box>
      ))}
    </VStack>
    
    
  );
};

export default History;
