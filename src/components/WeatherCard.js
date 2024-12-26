import { Box, Text, Heading, VStack } from "@chakra-ui/react";

const WeatherCard = ({ weather }) => {
  if (!weather) return <Text>Loading...</Text>;

  return (
    <Box bg="gray.700" p="5" borderRadius="md" shadow="md">
      <Heading size="md">{weather.name}</Heading>
      <Text fontSize="xl">{weather.main.temp}°C</Text>
      <Text>{weather.weather[0].description}</Text>
    </Box>
  );
};

export default WeatherCard;
