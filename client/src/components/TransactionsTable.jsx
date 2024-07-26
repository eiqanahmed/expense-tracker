import React from 'react';
import AddTransaction from "../components/AddTransaction";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Input, Button, VStack, Box, Flex, TableContainer, Table, Thead, Th, Tr, Td, Tbody } from '@chakra-ui/react'

const TransactionsTable = ({ transactions }) => {

  const currentDate = new Date();

  // Array of month names
  const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  // Get the current month index (0-11)
  const currentMonthIndex = currentDate.getMonth();

  // Get the name of the current month
  const currentMonth = monthNames[currentMonthIndex];

  const currDate = (date) => {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;

  }

  const currTransactions = (allTransactions) => {
    let arr = [];
    allTransactions.forEach((transaction) => {
        const curr = new Date();
        const d = new Date(transaction.date);
        if (d.getMonth() == curr.getMonth()) {
            arr.push(transaction);
        }
    }
    
    )
    return arr;
  }

  const currs = currTransactions(transactions);

  // console.log(currs);

  return (
    <>
      <VStack alignItems="flex-start" mt="5%" width="100%" >
        <Text mb="2%" fontSize='2xl' ml="6.2%"> Expenses for {currentMonth}:</Text>
        <TableContainer width="50%" ml="6.2%" mb="4%">
          <Table size="md" mx="auto" variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th textAlign="center">Item</Th>
                <Th textAlign="center">Transaction Value</Th>
                <Th textAlign="center">Date Added</Th>
              </Tr>
            </Thead>
                <Tbody>
                {currs.map((transaction, index) => (
                <Tr key={transaction._id || index}>
                  <Td textAlign="center">{transaction.item}</Td>
                  <Td textAlign="center">{transaction.value}</Td>
                  <Td textAlign="center">{currDate(transaction.date)}</Td>
                </Tr>
              ))}
                </Tbody>
            </Table>
        </TableContainer>
      </VStack>
    </>
  )
}

export default TransactionsTable
