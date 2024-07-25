import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, Input, Button, VStack, HStack, Box } from '@chakra-ui/react'

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
      <Box mt="4rem" align='center'>
        <VStack justifyContent='center' width='70%' spacing={6}>
          <HStack>
            <Text>Item: </Text>
            <Input ml='0.5rem' placeholder='Book' size='md' onChange={(e) => setItem(e.target.value)}/>
          </HStack>
          <HStack>
            <Text>Value:</Text>
            <Input placeholder='20' size='md'  onChange={(e) => setValue(e.target.value)}/>
          </HStack>
          <Button ml="2.5rem" onClick={Submit} colorScheme='teal' variant='solid'>
              Add Transaction
          </Button>
        </VStack>
      </Box>
      
    </div>
  )
}

export default AddTransaction
