import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, Input, Button, VStack, HStack, Box } from '@chakra-ui/react'

const AddTransaction = ({ fetchTransactions }) => {
  
  const [item, setItem] = useState();
  const [value, setValue] = useState();

  // Display data from database since the beginning of the current month

  const date = new Date();

  const Submit = () => {
    axios.post("http://localhost:3001/createTransaction", { item, value, date })
    .then((transaction) => {
      console.log(transaction);
      fetchTransactions();
    }).catch(err => console.log(err));
  }
    
  // border="2px solid black"

  return (
    <>
        <VStack mt="4rem" alignItems="flex-start" justifyContent='center' width='70%' spacing={6}>
          <HStack ml="10%">
            <Text ml="4%" fontSize='1xl'>Item: </Text>
            <Input ml='7.5%' placeholder='Book' size='md' width="120%" onChange={(e) => setItem(e.target.value)}/>
          </HStack>
          <HStack ml="10%">
            <Text fontSize='1xl'>Value($):</Text>
            <Input placeholder='-20' size='md' width="65%" onChange={(e) => setValue(e.target.value)}/>
          </HStack>
          <Button ml="17.5%" onClick={Submit} colorScheme='teal' variant='solid'>
              Add Transaction
          </Button>
        </VStack>
      
    </>
  )
}

export default AddTransaction
