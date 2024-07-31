// src/components/Navbar.js

import React from 'react';
import { Box, Flex, Link, Button, useColorMode, useColorModeValue, HStack } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Box bg={bg} px={4} boxShadow="sm" >
      <Flex h={16} alignItems="center" justifyContent="center">
        <HStack spacing={12} alignItems="center" mx="auto">
          <Link fontWeight="bold" as={RouterLink} to="/" px={2} py={1} width="11rem" rounded="md" _hover={{textDecoration: 'none', bgGradient: 'linear(to-r, #4FD1C5, #81E6D9, #4299e1)' }}>
            Home
          </Link>
          <Link fontWeight="bold" as={RouterLink} width="11rem" to="/monthly-expenses" px={2} py={1} rounded="md" _hover={{textDecoration: 'none', bgGradient: 'linear(to-r, #4FD1C5, #81E6D9, #4299e1)' }}>
            Monthly Expenses
          </Link>
          <Link fontWeight="bold" as={RouterLink} width="11rem" to="/history" px={2} py={1} rounded="md" _hover={{textDecoration: 'none', bgGradient: 'linear(to-r, #4FD1C5, #81E6D9, #4299e1)' }}>
            Transaction History
          </Link>
        </HStack>
        <Button onClick={toggleColorMode} ml={4}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
