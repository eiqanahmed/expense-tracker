"use client"

import { useState } from "react"
import axios from "axios"
import {
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Select,
  InputGroup,
  InputLeftElement,
  Box,
  useToast,
} from "@chakra-ui/react"

const AddTransaction = ({ fetchTransactions }) => {
  const [item, setItem] = useState("")
  const [value, setValue] = useState("")
  const [category, setCategory] = useState("")
  const [errors, setErrors] = useState({})
  const toast = useToast()

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!item || item.trim() === "") {
      newErrors.item = "Item name is required"
    }

    if (!value || isNaN(Number(value))) {
      newErrors.value = "Please enter a valid number"
    }

    if (!category) {
      newErrors.category = "Please select a category"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      const date = new Date()

      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/createTransaction`, {
          item,
          value: Number(value),
          date,
          category,
        })
        .then(() => {
          // Reset form
          setItem("")
          setValue("")
          setCategory("")

          // Refresh transactions
          fetchTransactions()

          // Show success toast
          toast({
            title: "Transaction added",
            description: `${item} has been added successfully.`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          })
        })
        .catch((err) => {
          console.log(err)
          toast({
            title: "Error",
            description: "Failed to add transaction.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          })
        })
    }
  }

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={!!errors.item}>
        <FormLabel fontSize="sm">Item Name</FormLabel>
        <Input placeholder="e.g., Groceries" value={item} onChange={(e) => setItem(e.target.value)} />
        {errors.item && <FormErrorMessage>{errors.item}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={!!errors.value}>
        <FormLabel fontSize="sm">Amount</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">$</InputLeftElement>
          <Input
            placeholder="e.g., -20 for expense, 100 for income"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </InputGroup>
        <FormHelperText>Use negative values for expenses, positive for income</FormHelperText>
        {errors.value && <FormErrorMessage>{errors.value}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={!!errors.category}>
        <FormLabel fontSize="sm">Category</FormLabel>
        <Select placeholder="Select category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="HOUSING">Housing</option>
          <option value="UTILITIES">Utilities</option>
          <option value="FOOD">Food</option>
          <option value="TRANSPORTATION">Transportation</option>
          <option value="MEDICAL">Medical</option>
          <option value="INCOME">Income</option>
          <option value="OTHER">Other</option>
        </Select>
        {errors.category && <FormErrorMessage>{errors.category}</FormErrorMessage>}
      </FormControl>

      <Box pt={2}>
        <Button onClick={handleSubmit} colorScheme="teal" width="full" size="md">
          Add Transaction
        </Button>
      </Box>
    </VStack>
  )
}

export default AddTransaction

