import { Box, VStack, Heading, Button } from "@chakra-ui/react";

const Sidebar = ({ onThemeChange }) => (
  <Box bg="gray.800" color="white" w="250px" p="5" h="100vh">
    <Heading size="md" mb="5">Weather App</Heading>
    <VStack align="start" spacing="3">
      <Button variant="link" onClick={() => onThemeChange("latte")}>Latte</Button>
      <Button variant="link" onClick={() => onThemeChange("mocha")}>Mocha</Button>
      <Button variant="link" onClick={() => onThemeChange("macchiato")}>Macchiato</Button>
      <Button variant="link" onClick={() => onThemeChange("frappe")}>Frappe</Button>
    </VStack>
  </Box>
);

export default Sidebar;
