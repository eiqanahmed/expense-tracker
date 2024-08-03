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
         <VStack align="flex-start" mt="5%" border="2px solid black" width="30%">
          <HStack ml="20%">
            <VStack spacing="2.5rem" align="center" >
              <Text ml="2%" fontSize='1xl'>Item: </Text>
              <Text ml="2%" fontSize='1xl'>Value($):</Text>
              <Text ml="2%" fontSize='1xl'>Category:</Text>
            </VStack>
            <VStack spacing="1.25rem" align="flex-start">
            <Input placeholder='Book' size='md' onChange={(e) => setItem(e.target.value)}/>
            <Input placeholder='-20' size='md' onChange={(e) => setValue(e.target.value)}/>
            <Input placeholder='other' size='md' onChange={(e) => setCategory(e.target.value)}/>
          </VStack>
          </HStack>
          <Button alignSelf="center"mt="0.8rem" onClick={Submit} colorScheme='teal' variant='solid' ml="26.5%">
              Add Transaction
          </Button>
        </VStack>
    </>
  )
}

export default AddTransaction
