// import {
//   Box,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Heading,
//   Button,
//   Text,
//   SimpleGrid,
//   flexbox,
//   Flex,
// } from "@chakra-ui/react";
// import SideBar from "../components/SideBar";
// function AdminPanelCategoriesAnalytics() {
//   return (
//     <>
//     <Box display="flex">

//         <SideBar />

//       <Box>
//         <SimpleGrid
//           spacing={6}
//           templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
//           display="flex"
//         >
//           <Card margin="10">
//             <CardHeader>
//               <Heading size="md"> Customer dashboard</Heading>
//             </CardHeader>
//             <CardBody>
//               <Text>
//                 View a summary of all your customers over the last month.
//               </Text>
//             </CardBody>
//             <CardFooter>
//               <Button>View here</Button>
//             </CardFooter>
//           </Card>
//           <Card margin="10">
//             <CardHeader>
//               <Heading size="md"> Customer dashboard</Heading>
//             </CardHeader>
//             <CardBody>
//               <Text>
//                 View a summary of all your customers over the last month.
//               </Text>
//             </CardBody>
//             <CardFooter>
//               <Button>View here</Button>
//             </CardFooter>
//           </Card>
          
//         </SimpleGrid>
//       </Box>
//     </Box>
      
//     </>
//   );
// }

// export default AdminPanelCategoriesAnalytics;


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Heading,
//   Button,
//   Text,
//   SimpleGrid,
//   Flex,
//   useDisclosure,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   VStack,
//   Icon,
//   Spinner,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatHelpText,
//   StatArrow,
// } from "@chakra-ui/react";
// import { User, LineChart } from "lucide-react"; // Using lucide-react for icons
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
// import SideBar from "../components/SideBar"

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );


// // Main component for the Admin Dashboard
// function AdminPanelCategoriesAnalytics() {
//   // State for the modal
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   // State for the total user count on the card
//   const [totalUsers, setTotalUsers] = useState(0);
//   // State for the graph data inside the modal
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [],
//   });
//   // State to manage loading for both the card and the graph
//   const [isLoading, setIsLoading] = useState(true);
//   const [isGraphLoading, setIsGraphLoading] = useState(false);

//   // useEffect hook to fetch initial data for the card when the component mounts
//   useEffect(() => {
//     // Simulate a backend API call to get the total number of users
//     const fetchTotalUsers = async () => {
//       try {
//         setIsLoading(true);
//         // Replace this with your actual axios call
//         // const response = await axios.get("http://localhost:7070/api/users/count");
//         // const count = response.data;

//         // --- Mock Data Simulation ---
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
//         const count = 1250; // Mock total user count
//         // --- End of Mock Data Simulation ---

//         setTotalUsers(count);
//       } catch (error) {
//         console.error("Error fetching total users:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTotalUsers();
//   }, []);

//   // Function to handle the "View here" button click
//   // It fetches the graph data and opens the modal
//   const handleOpenModal = async () => {
//     setIsGraphLoading(true);
//     onOpen(); // Open the modal immediately

//     // Simulate fetching graph data from the backend
//     try {
//       // Replace this with your actual axios call
//       // const response = await axios.get("http://localhost:7070/api/analytics/user-growth");
//       // const data = response.data; // Assuming data is in the format { labels: [...], counts: [...] }
      
//       // --- Mock Data Simulation ---
//       await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
//       const mockData = {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//         counts: [250, 400, 650, 850, 1100, 1250]
//       };
//       // --- End of Mock Data Simulation ---

//       setChartData({
//         labels: mockData.labels,
//         datasets: [
//           {
//             label: 'Total Users',
//             data: mockData.counts,
//             fill: true,
//             backgroundColor: 'rgba(79, 209, 197, 0.2)', // Chakra's teal color with transparency
//             borderColor: '#4FD1C5', // Chakra's teal color
//             tension: 0.4,
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Error fetching analytics data:", error);
//       // You can also set a state to display an error message in the modal
//     } finally {
//       setIsGraphLoading(false);
//     }
//   };

//   // Configuration options for the Chart.js line graph
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Total Users Over Time',
//         font: {
//           size: 18,
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Number of Users',
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Month',
//         },
//       },
//     },
//   };

//   return (
//     <>
//       <Box display="flex" minH="100vh">
//         <SideBar />

//         {/* Main Content Area */}
//         <Box flex="1" p={8} bg="gray.50">
//           <Heading as="h1" size="xl" mb={6} align="center">Analytics Dashboard</Heading>

//           <SimpleGrid spacing={8} templateColumns="repeat(auto-fill, minmax(300px, 1fr))" display="flex" alignItems="flex-end">
//             {/* Card for Total Users */}
//             <Card
//               bg="white"
//               p={6}
//               rounded="lg"
//               shadow="md"
//               transition="all 0.2s"
//               _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
//             >
//               <CardHeader pb={2}>
//                 <Flex align="center">
//                   <Icon as={User} w={10} h={10} color="teal.500" mr={4} />
//                   <Heading size="md" color="gray.600">Total Users</Heading>
//                 </Flex>
//               </CardHeader>
//               <CardBody pt={2}>
//                 {isLoading ? (
//                   <Flex align="center" justify="center" h="100px">
//                     <Spinner size="lg" color="teal.500" />
//                   </Flex>
//                 ) : (
//                   <Text fontSize="5xl" fontWeight="bold" color="teal.500">
//                     {totalUsers}
//                   </Text>
//                 )}
//               </CardBody>
//               <CardFooter pt={0}>
//                 <Button onClick={handleOpenModal} colorScheme="teal" size="sm">
//                   View Analytics
//                 </Button>
//               </CardFooter>
//             </Card>

//             {/* Other Cards for other analytics can go here */}
//             {/* For example, for a "Customer dashboard" */}
//             <Card bg="white" p={6} rounded="lg" shadow="md" transition="all 0.2s" _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}>
//                 <CardHeader>
//                     <Heading size="md"> Customer dashboard</Heading>
//                 </CardHeader>
//                 <CardBody>
//                     <Text>View a summary of all your customers over the last month.</Text>
//                 </CardBody>
//                 <CardFooter>
//                     <Button colorScheme="blue">View here</Button>
//                 </CardFooter>
//             </Card>

//           </SimpleGrid>
//         </Box>
//       </Box>

//       {/* Modal for displaying the graph */}
//       <Modal isOpen={isOpen} onClose={onClose} size="4xl">
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>User Growth Analytics</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {isGraphLoading ? (
//               <Flex align="center" justify="center" h="400px">
//                 <Spinner size="xl" color="teal.500" />
//               </Flex>
//             ) : (
//               <Box w="100%" h="400px">
//                 {/* The Line component from react-chartjs-2 */}
//                 <Line data={chartData} options={chartOptions} />
//               </Box>
//             )}
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default AdminPanelCategoriesAnalytics;
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
import { TrendingUp, DollarSign, ListFilter } from "lucide-react"; // Updated icons
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement, // Import BarElement for bar charts
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2'; // Import Bar component
import axios from 'axios';
import SideBar from "../components/SideBar"

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement, // Register BarElement
  Title,
  Tooltip,
  Legend
);

// Main component for the Admin Dashboard
function AdminPanelCategoriesAnalytics() {
  // --- NEW: Modals for the new analytics cards ---
  const { isOpen: isOpenNewListings, onOpen: onOpenNewListings, onClose: onCloseNewListings } = useDisclosure();
  const { isOpen: isOpenAveragePrice, onOpen: onOpenAveragePrice, onClose: onCloseAveragePrice } = useDisclosure();
  // We keep the original OLX listings modal
  const { isOpen: isOpenOlx, onOpen: onOpenOlx, onClose: onCloseOlx } = useDisclosure();
  
  // --- NEW: State for the New Listings card and modal ---
  const [totalNewListings, setTotalNewListings] = useState(0);
  const [newListingsChartData, setNewListingsChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoadingNewListings, setIsLoadingNewListings] = useState(true);
  const [isGraphLoadingNewListings, setIsGraphLoadingNewListings] = useState(false);

  // --- NEW: State for the Average Price card and modal ---
  const [averageOverallPrice, setAverageOverallPrice] = useState(0);
  const [averagePriceChartData, setAveragePriceChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoadingAveragePrice, setIsLoadingAveragePrice] = useState(true);
  const [isGraphLoadingAveragePrice, setIsGraphLoadingAveragePrice] = useState(false);

  // We keep the original OLX state
  const [totalOlxListings, setTotalOlxListings] = useState(0);
  const [olxChartData, setOlxChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoadingOlx, setIsLoadingOlx] = useState(true);
  const [isGraphLoadingOlx, setIsGraphLoadingOlx] = useState(false);

  useEffect(() => {
    // --- NEW: Function to fetch total new listings for a period (e.g., last month) ---
    const fetchTotalNewListings = async () => {
      try {
        setIsLoadingNewListings(true);
        // Simulate a backend API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const count = 2500; // Mock total new listings in the last month
        setTotalNewListings(count);
      } catch (error) {
        console.error("Error fetching total new listings:", error);
      } finally {
        setIsLoadingNewListings(false);
      }
    };

    // --- NEW: Function to fetch the overall average price of all listings ---
    const fetchAverageOverallPrice = async () => {
      try {
        setIsLoadingAveragePrice(true);
        // Simulate a backend API call
        await new Promise(resolve => setTimeout(resolve, 1200));
        const price = 4550; // Mock overall average price
        setAverageOverallPrice(price);
      } catch (error) {
        console.error("Error fetching average overall price:", error);
      } finally {
        setIsLoadingAveragePrice(false);
      }
    };

    // We keep the original function to fetch total OLX listings
    const fetchTotalOlxListings = async () => {
      try {
        setIsLoadingOlx(true);
        await new Promise(resolve => setTimeout(resolve, 1400));
        const count = 15000;
        setTotalOlxListings(count);
      } catch (error) {
        console.error("Error fetching total OLX listings:", error);
      } finally {
        setIsLoadingOlx(false);
      }
    };

    fetchTotalNewListings();
    fetchAverageOverallPrice();
    fetchTotalOlxListings();
  }, []);

  // --- NEW: Function to handle the New Listings modal (Line Chart) ---
  const handleOpenNewListingsModal = async () => {
    setIsGraphLoadingNewListings(true);
    onOpenNewListings();

    try {
      // Mock data for new listings over time
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        counts: [2500, 3100, 2800, 3500, 4200, 2500] // New listings added each month
      };

      setNewListingsChartData({
        labels: mockData.labels,
        datasets: [
          {
            label: 'New Listings Added',
            data: mockData.counts,
            fill: true,
            backgroundColor: 'rgba(51, 153, 255, 0.2)', // A nice blue color
            borderColor: '#3399FF',
            tension: 0.4,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching new listings data:", error);
    } finally {
      setIsGraphLoadingNewListings(false);
    }
  };

  // --- NEW: Function to handle the Average Price modal (Bar Chart) ---
  const handleOpenAveragePriceModal = async () => {
    setIsGraphLoadingAveragePrice(true);
    onOpenAveragePrice();

    try {
      // Mock data for average price by category
      await new Promise(resolve => setTimeout(resolve, 1800));
      const mockData = {
        labels: ["Electronics", "Vehicles", "Real Estate", "Home & Garden", "Services"],
        prices: [7500, 85000, 500000, 1200, 2500]
      };

      const backgroundColors = [
        '#A0BFE0', // Lighter blue
        '#718096', // Gray
        '#9F7AEA', // Purple
        '#38A169', // Green
        '#F6E05E', // Yellow
      ];

      setAveragePriceChartData({
        labels: mockData.labels,
        datasets: [
          {
            label: 'Average Price (in ₹)',
            data: mockData.prices,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('0.2', '1')), // Use solid color for border
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching average price data:", error);
    } finally {
      setIsGraphLoadingAveragePrice(false);
    }
  };

  // We keep the original function to handle the pie chart modal
  const handleOpenOlxModal = async () => {
    setIsGraphLoadingOlx(true);
    onOpenOlx();

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockData = {
        labels: ["Electronics", "Vehicles", "Real Estate", "Home & Garden", "Jobs", "Services"],
        counts: [4500, 3000, 2500, 2000, 1500, 1500]
      };
      
      const backgroundColors = [
        '#E53E3E', '#D69E2E', '#319795', '#38A169', '#805AD5', '#3182CE',
      ];

      setOlxChartData({
        labels: mockData.labels,
        datasets: [
          {
            label: 'Listings by Category',
            data: mockData.counts,
            backgroundColor: backgroundColors,
            borderColor: '#fff',
            borderWidth: 1,
            hoverOffset: 10,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching OLX category data:", error);
    } finally {
      setIsGraphLoadingOlx(false);
    }
  };

  // --- NEW: Options for the New Listings line chart ---
  const newListingsChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'New Listings Added Per Month', font: { size: 18 } },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Number of Listings' } },
      x: { title: { display: true, text: 'Month' } },
    },
  };

  // --- NEW: Options for the Average Price bar chart ---
  const averagePriceChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }, // No need for legend on a single-dataset bar chart
      title: { display: true, text: 'Average Price of Listings by Category', font: { size: 18 } },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Average Price (₹)' } },
      x: { title: { display: true, text: 'Category' } },
    },
  };

  // Options for the existing pie chart
  const olxChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Total OLX Listings by Category', font: { size: 18 } },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) { label += ': '; }
            if (context.parsed !== null) { label += new Intl.NumberFormat('en-US').format(context.parsed); }
            return label;
          }
        }
      }
    },
  };

  return (
    <>
      <Box display="flex" minH="100vh">
        <SideBar />

        <Box flex="1" p={8} bg="gray.50">
          <Heading as="h1" size="xl" mb={6} align="center">Categories Analytics Dashboard</Heading>

          <SimpleGrid spacing={6} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
            {/* --- NEW: Card for New Listings Over Time --- */}
            <Card
              bg="white" p={6} rounded="lg" shadow="md" transition="all 0.2s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
            >
              <CardHeader pb={2}>
                <Flex align="center">
                  <Icon as={TrendingUp} w={10} h={10} color="blue.500" mr={4} />
                  <Heading size="md" color="gray.600">New Listings</Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={2}>
                {isLoadingNewListings ? (
                  <Flex align="center" justify="center" h="100px">
                    <Spinner size="lg" color="blue.500" />
                  </Flex>
                ) : (
                  <Text fontSize="5xl" fontWeight="bold" color="blue.500">
                    {totalNewListings}
                  </Text>
                )}
              </CardBody>
              <CardFooter pt={0}>
                <Button onClick={handleOpenNewListingsModal} colorScheme="blue" size="sm">
                  View Trend
                </Button>
              </CardFooter>
            </Card>

            {/* --- NEW: Card for Average Listing Price --- */}
            <Card
              bg="white" p={6} rounded="lg" shadow="md" transition="all 0.2s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
            >
                <CardHeader pb={2}>
                    <Flex align="center">
                        <Icon as={DollarSign} w={10} h={10} color="green.500" mr={4} />
                        <Heading size="md" color="gray.600">Average Price</Heading>
                    </Flex>
                </CardHeader>
                <CardBody pt={2}>
                  {isLoadingAveragePrice ? (
                    <Flex align="center" justify="center" h="100px">
                      <Spinner size="lg" color="green.500" />
                    </Flex>
                  ) : (
                    <Text fontSize="5xl" fontWeight="bold" color="green.500">
                      ₹{averageOverallPrice}
                    </Text>
                  )}
                </CardBody>
                <CardFooter pt={0}>
                    <Button onClick={handleOpenAveragePriceModal} colorScheme="green" size="sm">
                      View Breakdown
                    </Button>
                </CardFooter>
            </Card>

            {/* Existing card for Total OLX listings (Pie Chart) */}
            <Card
              bg="white" p={6} rounded="lg" shadow="md" transition="all 0.2s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
            >
              <CardHeader pb={2}>
                <Flex align="center">
                  <Icon as={ListFilter} w={10} h={10} color="purple.500" mr={4} />
                  <Heading size="md" color="gray.600">Total Listings</Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={2}>
                {isLoadingOlx ? (
                  <Flex align="center" justify="center" h="100px">
                    <Spinner size="lg" color="purple.500" />
                  </Flex>
                ) : (
                  <Text fontSize="5xl" fontWeight="bold" color="purple.500">
                    {totalOlxListings}
                  </Text>
                )}
              </CardBody>
              <CardFooter pt={0}>
                <Button onClick={handleOpenOlxModal} colorScheme="purple" size="sm">
                  View Distribution
                </Button>
              </CardFooter>
            </Card>
            
          </SimpleGrid>
        </Box>
      </Box>

      {/* --- NEW: Modal for the New Listings line chart --- */}
      <Modal isOpen={isOpenNewListings} onClose={onCloseNewListings} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>{/*for better view i have done it it will add some extra space on top */}
          <ModalCloseButton />
          <ModalBody>
            {isGraphLoadingNewListings ? (
              <Flex align="center" justify="center" h="400px">
                <Spinner size="xl" color="blue.500" />
              </Flex>
            ) : (
              <Box w="100%" h="400px">
                <Line data={newListingsChartData} options={newListingsChartOptions} />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* --- NEW: Modal for the Average Price bar chart --- */}
      <Modal isOpen={isOpenAveragePrice} onClose={onCloseAveragePrice} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isGraphLoadingAveragePrice ? (
              <Flex align="center" justify="center" h="400px">
                <Spinner size="xl" color="green.500" />
              </Flex>
            ) : (
              <Box w="100%" h="400px" display="flex" justifyContent="center" alignItems="center">
                <Bar data={averagePriceChartData} options={averagePriceChartOptions} />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Existing modal for the OLX listings pie chart */}
      <Modal isOpen={isOpenOlx} onClose={onCloseOlx} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isGraphLoadingOlx ? (
              <Flex align="center" justify="center" h="400px">
                <Spinner size="xl" color="purple.500" />
              </Flex>
            ) : (
              <Box w="100%" h="400px" display="flex" justifyContent="center" alignItems="center">
                <Pie data={olxChartData} options={olxChartOptions} />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminPanelCategoriesAnalytics;
