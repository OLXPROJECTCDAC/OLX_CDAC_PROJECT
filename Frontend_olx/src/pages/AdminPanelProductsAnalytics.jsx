import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  SimpleGrid,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { DollarSign, ShoppingBag, Eye } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useToast } from "@chakra-ui/react";

// Register Chart.js components. This is crucial for rendering the different chart types.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Placeholder for a SideBar component. This is here to make the code self-contained.
// You should use your actual SideBar component if it's a separate file.
const SideBar = () => (
    <Box w="250px" bg="gray.800" minH="100vh" p={4} color="white">
        <Heading size="md" mb={6}>Admin Panel</Heading>
        <VStack align="stretch" spacing={2}>
            <Button variant="ghost" justifyContent="flex-start" colorScheme="gray">Dashboard</Button>
            <Button variant="ghost" justifyContent="flex-start" colorScheme="gray">Listings</Button>
            <Button variant="ghost" justifyContent="flex-start" colorScheme="gray">Analytics</Button>
        </VStack>
    </Box>
);

// Main component for the OLX Admin Analytics Dashboard
function AdminPanelProductsAnalytics() {
  const toast = useToast();

  // --- API Configuration ---
  // IMPORTANT: Replace this with the actual base URL of your Spring Boot backend API.
  const API_BASE_URL = "http://localhost:8080/api/admin";
  // IMPORTANT: Replace this with the actual authentication token obtained after login.
  // This token is required for Spring Security authorization. It could be stored in a context or state.
  const authToken = "your-auth-token-here";

  // --- Modal state handlers for each chart ---
  const { isOpen: isOpenAveragePrice, onOpen: onOpenAveragePrice, onClose: onCloseAveragePrice } = useDisclosure();
  const { isOpen: isOpenTopSelling, onOpen: onOpenTopSelling, onClose: onCloseTopSelling } = useDisclosure();
  const { isOpen: isOpenMostViewed, onOpen: onOpenMostViewed, onClose: onCloseMostViewed } = useDisclosure();
  
  // --- State for main dashboard metrics ---
  const [averagePrice, setAveragePrice] = useState(0);
  const [topSellingCategories, setTopSellingCategories] = useState(0);
  const [mostViewedCount, setMostViewedCount] = useState(0);

  // --- State for loading indicators for main cards ---
  const [isLoadingAveragePrice, setIsLoadingAveragePrice] = useState(true);
  const [isLoadingTopSelling, setIsLoadingTopSelling] = useState(true);
  const [isLoadingMostViewed, setIsLoadingMostViewed] = useState(true);
  
  // --- State for chart data that will be fetched from the API ---
  const [averagePriceChartData, setAveragePriceChartData] = useState({ labels: [], datasets: [] });
  const [topSellingChartData, setTopSellingChartData] = useState({ labels: [], datasets: [] });
  const [mostViewedChartData, setMostViewedChartData] = useState({ labels: [], datasets: [] });
  
  // --- State for loading indicators for charts inside modals ---
  const [isGraphLoadingAveragePrice, setIsGraphLoadingAveragePrice] = useState(false);
  const [isGraphLoadingTopSelling, setIsGraphLoadingTopSelling] = useState(false);
  const [isGraphLoadingMostViewed, setIsGraphLoadingMostViewed] = useState(false);

  // --- Function to simulate an API call with mock data ---
  const fetchMockData = (data) => {
    return new Promise((resolve) => setTimeout(() => resolve({ data }), 1500));
  };

  // --- Effect to fetch initial metrics on component mount ---
  useEffect(() => {
    const fetchMainMetrics = async () => {
      try {
        setIsLoadingAveragePrice(true);
        setIsLoadingTopSelling(true);
        setIsLoadingMostViewed(true);

        // Simulate fetching average price
        // In future, replace with: const listingsResponse = await axios.get(`${API_BASE_URL}/metrics/averageListingPrice`, { headers: { 'Authorization': `Bearer ${authToken}` } });
        const priceResponse = await fetchMockData({ price: 325.50 });
        setAveragePrice(priceResponse.data.price);

        // Simulate fetching top selling categories count (as a general metric)
        // In future, replace with: const categoriesResponse = await axios.get(`${API_BASE_URL}/metrics/topSellingCategoriesCount`, { headers: { 'Authorization': `Bearer ${authToken}` } });
        const categoriesResponse = await fetchMockData({ count: 5 });
        setTopSellingCategories(categoriesResponse.data.count);

        // Simulate fetching most viewed count
        // In future, replace with: const viewsResponse = await axios.get(`${API_BASE_URL}/metrics/mostViewedCount`, { headers: { 'Authorization': `Bearer ${authToken}` } });
        const viewsResponse = await fetchMockData({ count: 6200 });
        setMostViewedCount(viewsResponse.data.count);

      } catch (error) {
        console.error("Error fetching main metrics:", error);
        toast({
          title: "Error fetching data.",
          description: "Could not fetch dashboard metrics.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoadingAveragePrice(false);
        setIsLoadingTopSelling(false);
        setIsLoadingMostViewed(false);
      }
    };

    fetchMainMetrics();
  }, [toast]);

  // --- Function to handle the Average Listing Price modal (Line Chart) ---
  const handleOpenAveragePriceModal = async () => {
    setIsGraphLoadingAveragePrice(true);
    onOpenAveragePrice();
    try {
      // Mock API call to get average price trend data
      // In future, replace with: const response = await axios.get(`${API_BASE_URL}/analytics/averagePriceTrend`, { headers: { 'Authorization': `Bearer ${authToken}` } });
      const response = await fetchMockData({ 
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        averagePrices: [250, 275, 300, 310, 330, 325]
      });
      
      const chartData = response.data;
      
      setAveragePriceChartData({
        labels: chartData.labels,
        datasets: [
          {
            label: 'Average Listing Price ($)',
            data: chartData.averagePrices,
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.4,
            borderWidth: 2,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching average price data:", error);
    } finally {
      setIsGraphLoadingAveragePrice(false);
    }
  };

  // --- Function to handle the Top Selling Categories modal (Pie Chart) ---
  const handleOpenTopSellingModal = async () => {
    setIsGraphLoadingTopSelling(true);
    onOpenTopSelling();
    try {
      // Mock API call to get top selling categories data
      // In future, replace with: const response = await axios.get(`${API_BASE_URL}/analytics/topSellingCategories`, { headers: { 'Authorization': `Bearer ${authToken}` } });
      const response = await fetchMockData({
        labels: ["Electronics", "Vehicles", "Furniture", "Books", "Fashion"],
        sales: [150, 110, 80, 50, 30]
      });

      const chartData = response.data;
      const backgroundColors = ['#4299E1', '#48BB78', '#ECC94B', '#ED8936', '#9F7AEA'];

      setTopSellingChartData({
        labels: chartData.labels,
        datasets: [
          {
            label: 'Number of Sales',
            data: chartData.sales,
            backgroundColor: backgroundColors,
            borderColor: '#FFFFFF',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching top selling categories data:", error);
    } finally {
      setIsGraphLoadingTopSelling(false);
    }
  };

  // --- Function to handle the Most Viewed Listings modal (Bar Chart) ---
  const handleOpenMostViewedModal = async () => {
    setIsGraphLoadingMostViewed(true);
    onOpenMostViewed();
    try {
      // Mock API call to get most viewed listings data
      // In future, replace with: const response = await axios.get(`${API_BASE_URL}/analytics/mostViewedListings`, { headers: { 'Authorization': `Bearer ${authToken}` } });
      const response = await fetchMockData({
        labels: ["iPhone 13", "Gaming PC", "Sofa Set", "Used Car", "Vintage Guitar"],
        views: [5500, 4100, 2800, 6200, 1900]
      });
      
      const chartData = response.data;
      
      setMostViewedChartData({
        labels: chartData.labels,
        datasets: [
          {
            label: 'Views',
            data: chartData.views,
            backgroundColor: '#4C51BF',
            borderColor: '#383D89',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching most viewed data:", error);
    } finally {
      setIsGraphLoadingMostViewed(false);
    }
  };

  // --- Chart options for customization ---
  const averagePriceChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Average Listing Price Trend', font: { size: 18 } },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Price ($)' } },
      x: { title: { display: true, text: 'Month' } },
    },
  };

  const topSellingChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Sales Distribution by Category', font: { size: 18 } },
    },
  };

  const mostViewedChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Top 5 Most Viewed Listings', font: { size: 18 } },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Number of Views' } },
      x: { title: { display: true, text: 'Listing Title' } },
    },
  };

  return (
    <>
      <Box display="flex" minH="100vh">
        <SideBar />

        <Box flex="1" p={8} bg="gray.50">
          <Heading as="h1" size="xl" mb={6}>OLX Admin Analytics Dashboard</Heading>

          <SimpleGrid spacing={6} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
            {/* Card for Average Listing Price - Clicks to show Line Chart */}
            <Card
              bg="white" p={6} rounded="lg" shadow="md" transition="all 0.2s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
            >
              <CardHeader pb={2}>
                <Flex align="center">
                  <Icon as={DollarSign} w={10} h={10} color="blue.500" mr={4} />
                  <Heading size="md" color="gray.600">Avg. Listing Price</Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={2}>
                {isLoadingAveragePrice ? (
                  <Flex align="center" justify="center" h="100px"><Spinner size="lg" color="blue.500" /></Flex>
                ) : (
                  <Text fontSize="5xl" fontWeight="bold" color="blue.500">
                    ${averagePrice.toFixed(2)}
                  </Text>
                )}
              </CardBody>
              <CardFooter pt={0}>
                <Button onClick={handleOpenAveragePriceModal} colorScheme="blue" size="sm">
                  View Price Trend
                </Button>
              </CardFooter>
            </Card>

            {/* Card for Top Selling Categories - Clicks to show Pie Chart */}
            <Card
              bg="white" p={6} rounded="lg" shadow="md" transition="all 0.2s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
            >
              <CardHeader pb={2}>
                <Flex align="center">
                  <Icon as={ShoppingBag} w={10} h={10} color="green.500" mr={4} />
                  <Heading size="md" color="gray.600">Top Selling Categories</Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={2}>
                {isLoadingTopSelling ? (
                  <Flex align="center" justify="center" h="100px"><Spinner size="lg" color="green.500" /></Flex>
                ) : (
                  <Text fontSize="5xl" fontWeight="bold" color="green.500">
                    {topSellingCategories}
                  </Text>
                )}
              </CardBody>
              <CardFooter pt={0}>
                <Button onClick={handleOpenTopSellingModal} colorScheme="green" size="sm">
                  View Sales Distribution
                </Button>
              </CardFooter>
            </Card>

            {/* Card for Most Viewed Listings - Clicks to show Bar Chart */}
            <Card
              bg="white" p={6} rounded="lg" shadow="md" transition="all 0.2s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
            >
              <CardHeader pb={2}>
                <Flex align="center">
                  <Icon as={Eye} w={10} h={10} color="purple.500" mr={4} />
                  <Heading size="md" color="gray.600">Most Viewed Listings</Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={2}>
                {isLoadingMostViewed ? (
                  <Flex align="center" justify="center" h="100px"><Spinner size="lg" color="purple.500" /></Flex>
                ) : (
                  <Text fontSize="5xl" fontWeight="bold" color="purple.500">
                    {mostViewedCount.toLocaleString()}
                  </Text>
                )}
              </CardBody>
              <CardFooter pt={0}>
                <Button onClick={handleOpenMostViewedModal} colorScheme="purple" size="sm">
                  View Top Listings
                </Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </Box>
      </Box>

      {/* Modal for Average Listing Price (Line Chart) */}
      <Modal isOpen={isOpenAveragePrice} onClose={onCloseAveragePrice} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Average Listing Price Trend</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isGraphLoadingAveragePrice ? (
              <Flex align="center" justify="center" h="400px"><Spinner size="xl" color="blue.500" /></Flex>
            ) : (
              <Box w="100%" h="400px">
                <Line data={averagePriceChartData} options={averagePriceChartOptions} />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal for Top Selling Categories (Pie Chart) */}
      <Modal isOpen={isOpenTopSelling} onClose={onCloseTopSelling} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Top Selling Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isGraphLoadingTopSelling ? (
              <Flex align="center" justify="center" h="400px"><Spinner size="xl" color="green.500" /></Flex>
            ) : (
              <Box w="100%" h="400px" display="flex" justifyContent="center" alignItems="center">
                <Pie data={topSellingChartData} options={topSellingChartOptions} />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal for Top 5 Most Viewed Listings (Bar Chart) */}
      <Modal isOpen={isOpenMostViewed} onClose={onCloseMostViewed} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Top Most Viewed Listings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isGraphLoadingMostViewed ? (
              <Flex align="center" justify="center" h="400px"><Spinner size="xl" color="purple.500" /></Flex>
            ) : (
              <Box w="100%" h="400px" display="flex" justifyContent="center" alignItems="center">
                <Bar data={mostViewedChartData} options={mostViewedChartOptions} />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminPanelProductsAnalytics;
