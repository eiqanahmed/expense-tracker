import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, Input, Button, HStack, Box } from '@chakra-ui/react'

const AddTransaction = () => {
  
  const [item, setItem] = useState();
  const [value, setValue] = useState();

  // Display data from database since the beginning of the current month

  const Submit = () => {
    axios.post("http://localhost:3001/createTransaction", { item, value })
    .then((transaction) => {
      console.log(transaction);
    }).catch(err => console.log(err));
  }
    
  // border="2px solid black"

  return (
    <div>
      <Box align='center'>
        <HStack justifyContent='center' width='70%' spacing={6}>
          <Input placeholder='Book' size='md' width='20%' onChange={(e) => setItem(e.target.value)}/>
          <Input placeholder='20' size='md' width='20%' onChange={(e) => setValue(e.target.value)}/>
          <Button onClick={Submit} colorScheme='teal' variant='solid'>
              Add Transaction
          </Button>
        </HStack>
      </Box>
      
    </div>
  )
}

export default AddTransaction
