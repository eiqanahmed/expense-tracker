import { extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans/400.css'; // Import the font styles
import '@fontsource/raleway/700.css'; // Import the font styles

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
})

export default theme