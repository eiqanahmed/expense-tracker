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
          <Link as={RouterLink} to="/" px={2} py={1} width="11rem" rounded="md" _hover={{textDecoration: 'none', bg: '#4FD1C5' }}>
            Home
          </Link>
          <Link as={RouterLink} width="11rem" to="/monthly-expenses" px={2} py={1} rounded="md" _hover={{textDecoration: 'none', bg: '#4FD1C5' }}>
            Monthly Expenses
          </Link>
          <Link as={RouterLink} width="11rem" to="/history" px={2} py={1} rounded="md" _hover={{textDecoration: 'none', bg: '#4FD1C5' }}>
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
