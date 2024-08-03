import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, Input, Button, VStack, HStack, Box } from '@chakra-ui/react'

const AddTransaction = ({ fetchTransactions }) => {
  
  const [item, setItem] = useState();
  const [value, setValue] = useState();
  const [category, setCategory] = useState('');

  // Display data from database since the beginning of the current month

  const date = new Date();

  const Submit = () => {

    let arr = ['HOUSING', 'UTILITIES', 'FOOD', 'TRANSPORTATION', 'MEDICAL', 'OTHER', 'INCOME'];

    if (!arr.includes(category.toUpperCase())) {
      alert('Please enter a valid category!');
      return;
    }


    axios.post(`${process.env.REACT_APP_BACKEND_URL}/createTransaction`, { item, value, date, category })
    .then((transaction) => {
      console.log(transaction);
      fetchTransactions();
    }).catch(err => console.log(err));
  }

    
  // border="2px solid black"

  return (
    <>
        <VStack mt="4rem" alignItems="flex-start" justifyContent='center' width='70%' spacing={6}>
          <HStack ml="8%" width="40%">
            <Text ml="2rem" fontSize='1xl'>Item: </Text>
            <Input ml='0.9rem' placeholder='Book' size='md' width="46%" onChange={(e) => setItem(e.target.value)}/>
          </HStack>
          <HStack ml="10%">
            <Text fontSize='1xl'>Value($):</Text>
            <Input placeholder='-20' size='md' width="65%" onChange={(e) => setValue(e.target.value)}/>
          </HStack>
          <HStack ml="9.4%">
            <Text fontSize="1xl">Category:</Text>
            <Input placeholder='other' size='md' width="64%" onChange={(e) => setCategory(e.target.value)}/>
          </HStack>
          <Button ml="12rem" onClick={Submit} colorScheme='teal' variant='solid'>
              Add Transaction
          </Button>
        </VStack>
      
    </>
  )
}

export default AddTransaction
