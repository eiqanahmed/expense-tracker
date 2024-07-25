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
              </Tr>
            </Thead>
                <Tbody>
                    {
                        transactions.map(transaction => {
                            return <>
                                <Tr>
                                    <Td textAlign="center">{transaction.item}</Td>
                                    <Td textAlign="center">{transaction.value}</Td>
                                </Tr>
                            </>
                        })

                    }
                </Tbody>
            </Table>
        </TableContainer>
      </VStack>
    </>
  )
}

export default TransactionsTable
