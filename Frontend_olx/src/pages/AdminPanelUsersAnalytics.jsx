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
import { Users, PieChart, Activity } from "lucide-react";
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

function AdminPanelUserAnalytics() {
  // Modal states
  const { isOpen: isOpenMonthly, onOpen: onOpenMonthly, onClose: onCloseMonthly } = useDisclosure();
  const { isOpen: isOpenRole, onOpen: onOpenRole, onClose: onCloseRole } = useDisclosure();
  const { isOpen: isOpenActive, onOpen: onOpenActive, onClose: onCloseActive } = useDisclosure();

  // Data states
  const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });
  const [roleData, setRoleData] = useState({ labels: [], datasets: [] });
  const [activeData, setActiveData] = useState({ labels: [], datasets: [] });

  // Loading states
  const [loadingMonthly, setLoadingMonthly] = useState(true);
  const [loadingRole, setLoadingRole] = useState(true);
  const [loadingActive, setLoadingActive] = useState(true);

  const [loadingMonthlyChart, setLoadingMonthlyChart] = useState(false);
  const [loadingRoleChart, setLoadingRoleChart] = useState(false);
  const [loadingActiveChart, setLoadingActiveChart] = useState(false);

  useEffect(() => {
    // 🚀 API Integration (Spring Security Auth Header Example)
    // const token = localStorage.getItem("token");
    // axios.get("http://localhost:8080/api/users/analytics/monthly", {
    //   headers: { Authorization: `Bearer ${token}` }
    // }).then(res => {
    //   setMonthlyData(res.data);
    //   setLoadingMonthly(false);
    // }).catch(console.error);

    // axios.get("http://localhost:8080/api/users/analytics/roles", {
    //   headers: { Authorization: `Bearer ${token}` }
    // }).then(res => {
    //   setRoleData(res.data);
    //   setLoadingRole(false);
    // }).catch(console.error);

    // axios.get("http://localhost:8080/api/users/analytics/active-status", {
    //   headers: { Authorization: `Bearer ${token}` }
    // }).then(res => {
    //   setActiveData(res.data);
    //   setLoadingActive(false);
    // }).catch(console.error);

    // Mock Data (Remove after API ready)
    setTimeout(() => {
      setMonthlyData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "New Users",
            data: [50, 75, 60, 90, 80],
            borderColor: "#4BC0C0",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
          },
        ],
      });
      setLoadingMonthly(false);

      setRoleData({
        labels: ["Admin", "Customer", "Seller"],
        datasets: [
          {
            label: "User Roles",
            data: [5, 120, 30],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      });
      setLoadingRole(false);

      setActiveData({
        labels: ["Active", "Inactive"],
        datasets: [
          {
            label: "User Status",
            data: [120, 35],
            backgroundColor: ["#4CAF50", "#F44336"],
          },
        ],
      });
      setLoadingActive(false);
    }, 1000);
  }, []);

  const handleOpenMonthly = () => {
    setLoadingMonthlyChart(true);
    onOpenMonthly();
    setTimeout(() => setLoadingMonthlyChart(false), 800);
  };

  const handleOpenRole = () => {
    setLoadingRoleChart(true);
    onOpenRole();
    setTimeout(() => setLoadingRoleChart(false), 800);
  };

  const handleOpenActive = () => {
    setLoadingActiveChart(true);
    onOpenActive();
    setTimeout(() => setLoadingActiveChart(false), 800);
  };

  const monthlyOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly New Users" },
    },
  };

  const roleOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "User Role Distribution" },
    },
  };

  const activeOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Active vs Inactive Users" },
    },
  };

  return (
    <>
      <Box display="flex" minH="100vh">
        <SideBar />
        <Box flex="1" p={8} bg="gray.50">
          <Heading as="h1" size="xl" mb={6} align="center">
            User Analytics Dashboard
          </Heading>

          <SimpleGrid spacing={6} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
            {/* Monthly New Users */}
            <Card bg="white" p={6} rounded="lg" shadow="md" _hover={{ transform: "translateY(-5px)", shadow: "xl" }}>
              <CardHeader pb={2}>
                <Flex align="center">
                  <Icon as={Activity} w={10} h={10} color="teal.500" mr={4} />
                  <Heading size="md" color="gray.600">
                    Monthly New Users
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

            {/* Role Distribution */}
            <Card bg="white" p={6} rounded="lg" shadow="md" _hover={{ transform: "translateY(-5px)", shadow: "xl" }}>
              <CardHeader pb={2}>
                <Flex align="center">
                  <Icon as={PieChart} w={10} h={10} color="orange.500" mr={4} />
                  <Heading size="md" color="gray.600">
                    Role Distribution
                  </Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={2}>
                {loadingRole ? (
                  <Flex align="center" justify="center" h="100px">
                    <Spinner size="lg" color="orange.500" />
                  </Flex>
                ) : (
                  <Text fontSize="5xl" fontWeight="bold" color="orange.500">
                    {roleData.datasets[0]?.data.reduce((a, b) => a + b, 0)}
                  </Text>
                )}
              </CardBody>
              <CardFooter pt={0}>
                <Button onClick={handleOpenRole} colorScheme="orange" size="sm">
                  View Chart
                </Button>
              </CardFooter>
            </Card>

            {/* Active vs Inactive Users */}
            <Card bg="white" p={6} rounded="lg" shadow="md" _hover={{ transform: "translateY(-5px)", shadow: "xl" }}>
              <CardHeader pb={2}>
                <Flex align="center">
                  <Icon as={Users} w={10} h={10} color="pink.500" mr={4} />
                  <Heading size="md" color="gray.600">
                    Active vs Inactive
                  </Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={2}>
                {loadingActive ? (
                  <Flex align="center" justify="center" h="100px">
                    <Spinner size="lg" color="pink.500" />
                  </Flex>
                ) : (
                  <Text fontSize="5xl" fontWeight="bold" color="pink.500">
                    {activeData.datasets[0]?.data.reduce((a, b) => a + b, 0)}
                  </Text>
                )}
              </CardBody>
              <CardFooter pt={0}>
                <Button onClick={handleOpenActive} colorScheme="pink" size="sm">
                  View Chart
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

      {/* Role Modal (Small Pie) */}
      <Modal isOpen={isOpenRole} onClose={onCloseRole} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingRoleChart ? (
              <Flex align="center" justify="center" h="400px">
                <Spinner size="xl" color="orange.500" />
              </Flex>
            ) : (
              <Flex align="center" justify="center" h="400px">
                <Box w="300px" h="300px">
                  <Pie data={roleData} options={roleOptions} />
                </Box>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Active vs Inactive Modal */}
      <Modal isOpen={isOpenActive} onClose={onCloseActive} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingActiveChart ? (
              <Flex align="center" justify="center" h="400px">
                <Spinner size="xl" color="pink.500" />
              </Flex>
            ) : (
              <Bar data={activeData} options={activeOptions} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminPanelUserAnalytics;
