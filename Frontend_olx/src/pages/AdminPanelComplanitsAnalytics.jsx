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
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { BarChart2, PieChart, Activity } from "lucide-react";
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
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import SideBar from "../components/SideBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminPanelComplaintsAnalytics() {
  // Modal states
  const { isOpen: isOpenMonthly, onOpen: onOpenMonthly, onClose: onCloseMonthly } = useDisclosure();
  const { isOpen: isOpenStatus, onOpen: onOpenStatus, onClose: onCloseStatus } = useDisclosure();
  const { isOpen: isOpenCategory, onOpen: onOpenCategory, onClose: onCloseCategory } = useDisclosure();

  // Data states
  const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });
  const [statusData, setStatusData] = useState({ labels: [], datasets: [] });
  const [categoryData, setCategoryData] = useState({ labels: [], datasets: [] });

  // Loading states
  const [loadingMonthly, setLoadingMonthly] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);

  const [loadingMonthlyChart, setLoadingMonthlyChart] = useState(false);
  const [loadingStatusChart, setLoadingStatusChart] = useState(false);
  const [loadingCategoryChart, setLoadingCategoryChart] = useState(false);

  useEffect(() => {
    // Simulate initial card summary data fetch
    setTimeout(() => {
      setMonthlyData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Monthly Complaints",
            data: [20, 35, 25, 40, 30],
            borderColor: "#4BC0C0",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
          },
        ],
      });
      setLoadingMonthly(false);

      setStatusData({
        labels: ["Resolved", "Pending", "In Progress"],
        datasets: [
          {
            label: "Status Breakdown",
            data: [45, 20, 10],
            backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
          },
        ],
      });
      setLoadingStatus(false);

      setCategoryData({
        labels: ["Delivery", "Product Quality", "Customer Service"],
        datasets: [
          {
            label: "Category Distribution",
            data: [20, 15, 10],
            backgroundColor: "#82ca9d",
          },
        ],
      });
      setLoadingCategory(false);
    }, 1000);
  }, []);

  const handleOpenMonthly = () => {
    setLoadingMonthlyChart(true);
    onOpenMonthly();
    setTimeout(() => {
      setLoadingMonthlyChart(false);
    }, 800);
  };

  const handleOpenStatus = () => {
    setLoadingStatusChart(true);
    onOpenStatus();
    setTimeout(() => {
      setLoadingStatusChart(false);
    }, 800);
  };

  const handleOpenCategory = () => {
    setLoadingCategoryChart(true);
    onOpenCategory();
    setTimeout(() => {
      setLoadingCategoryChart(false);
    }, 800);
  };

  const monthlyOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Complaints Trend" },
    },
  };

  const statusOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Complaints by Status" },
    },
  };

  const categoryOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Complaints by Category" },
    },
  };

  return (
    <>
      <Box display="flex" minH="100vh">
        <SideBar />

        <Box flex="1" p={8} bg="gray.50">
          <Heading as="h1" size="xl" mb={6} align="center">
            Complaints Analytics Dashboard
          </Heading>

          <SimpleGrid spacing={6} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
            {/* Monthly Complaints */}
            <Card
              bg="white"
              p={6}
              rounded="lg"
              shadow="md"
              _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            >
              <CardHeader pb={2}>
                <Flex align="center">
                  <Icon as={Activity} w={10} h={10} color="teal.500" mr={4} />
                  <Heading size="md" color="gray.600">
                    Monthly Complaints
                  </Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={2}>
                {loadingMonthly ? (
                  <Flex align="center" justify="center" h="100px">
                    <Spinner size="lg" color="teal.500" />
                  </Flex>
                ) : (
                  <Text fontSize="5xl" fontWeight="bold" color="teal.500">
                    {monthlyData.datasets[0]?.data.reduce((a, b) => a + b, 0)}
                  </Text>
                )}
              </CardBody>
              <CardFooter pt={0}>
                <Button onClick={handleOpenMonthly} colorScheme="teal" size="sm">
                  View Trend
                </Button>
              </CardFooter>
            </Card>

            {/* Status Breakdown */}
            <Card
              bg="white"
              p={6}
              rounded="lg"
              shadow="md"
              _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            >
              <CardHeader pb={2}>
                <Flex align="center">
                  <Icon as={PieChart} w={10} h={10} color="orange.500" mr={4} />
                  <Heading size="md" color="gray.600">
                    Status Breakdown
                  </Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={2}>
                {loadingStatus ? (
                  <Flex align="center" justify="center" h="100px">
                    <Spinner size="lg" color="orange.500" />
                  </Flex>
                ) : (
                  <Text fontSize="5xl" fontWeight="bold" color="orange.500">
                    {statusData.datasets[0]?.data.reduce((a, b) => a + b, 0)}
                  </Text>
                )}
              </CardBody>
              <CardFooter pt={0}>
                <Button onClick={handleOpenStatus} colorScheme="orange" size="sm">
                  View Breakdown
                </Button>
              </CardFooter>
            </Card>

            {/* Category Distribution */}
            <Card
              bg="white"
              p={6}
              rounded="lg"
              shadow="md"
              _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            >
              <CardHeader pb={2}>
                <Flex align="center">
                  <Icon as={BarChart2} w={10} h={10} color="pink.500" mr={4} />
                  <Heading size="md" color="gray.600">
                    Category Distribution
                  </Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={2}>
                {loadingCategory ? (
                  <Flex align="center" justify="center" h="100px">
                    <Spinner size="lg" color="pink.500" />
                  </Flex>
                ) : (
                  <Text fontSize="5xl" fontWeight="bold" color="pink.500">
                    {categoryData.datasets[0]?.data.reduce((a, b) => a + b, 0)}
                  </Text>
                )}
              </CardBody>
              <CardFooter pt={0}>
                <Button onClick={handleOpenCategory} colorScheme="pink" size="sm">
                  View Distribution
                </Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </Box>
      </Box>

      {/* Monthly Modal */}
      <Modal isOpen={isOpenMonthly} onClose={onCloseMonthly} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingMonthlyChart ? (
              <Flex align="center" justify="center" h="400px">
                <Spinner size="xl" color="teal.500" />
              </Flex>
            ) : (
              <Line data={monthlyData} options={monthlyOptions} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Status Modal */}
      <Modal isOpen={isOpenStatus} onClose={onCloseStatus} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingStatusChart ? (
              <Flex align="center" justify="center" h="400px">
                <Spinner size="xl" color="orange.500" />
              </Flex>
            ) : (
              <Flex align="center" justify="center" h="400px">
                     <Box w="300px" h="300px">
                <Pie data={statusData} options={statusOptions} />
               </Box>
              </Flex>
               
              
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Category Modal */}
      <Modal isOpen={isOpenCategory} onClose={onCloseCategory} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingCategoryChart ? (
              <Flex align="center" justify="center" h="400px">
                <Spinner size="xl" color="pink.500" />
              </Flex>
            ) : (
              <Bar data={categoryData} options={categoryOptions} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminPanelComplaintsAnalytics;
