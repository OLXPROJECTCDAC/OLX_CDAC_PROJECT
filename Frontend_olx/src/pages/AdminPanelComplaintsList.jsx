// import {
//   Box,
//   Button,
//   Spinner,
//   Table,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr,
//   useToast,
//   Heading,
//   Input,
//   Flex,
//   Spacer,
//   Text,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import SideBar from "../components/SideBar";

// const AdminPanelReportList = () => {
//   // State variables
//   const [reports, setReports] = useState([]); // List of reports from backend
//   const [loading, setLoading] = useState(true); // Loading spinner flag
//   const [searchTerm, setSearchTerm] = useState(""); // Search input state
//   const toast = useToast();

//   // Base API URL for reports
//   const API_URL = "http://localhost:7070/admin/reports";

//   // Fetch ALL reports
//   const fetchAllReports = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_URL}/all`, {
//         // Uncomment for Spring Security JWT:
//         // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       setReports(response.data);
//     } catch (error) {
//       toast({
//         title: "Error fetching reports",
//         description: error.message,
//         status: "error",
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch filtered reports
//   const fetchFilteredReports = async (search) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_URL}/search?q=${search}`, {
//         // Uncomment for Spring Security JWT:
//         // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       setReports(response.data);
//     } catch (error) {
//       toast({
//         title: "Error searching reports",
//         description: error.message,
//         status: "error",
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // On mount → fetch all reports
//   useEffect(() => {
//     fetchAllReports();
//   }, []);

//   // Search handler
//   const handleSearch = () => {
//     if (searchTerm.trim() === "") {
//       fetchAllReports();
//     } else {
//       fetchFilteredReports(searchTerm.trim());
//     }
//   };

//   return (
//     <Box display="flex" minH="100vh">
//       {/* Sidebar fixed left */}
//       <Box position="fixed" w="40" h="100vh" bg="gray.200">
//         <SideBar />
//       </Box>

//       {/* Main content */}
//       <Box flex={1} marginLeft={250} p={8} minH="100vh" bg="gray.50">
//         {/* Header: Title and Search bar */}
//         <Heading size="lg" align="center">
//           Reports List
//         </Heading>
//         <Flex mb={6} align="center">
//           <Spacer />
//           <Input
//             placeholder="Search reports..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             maxW="300px"
//             mr={2}
//           />
//           <Button colorScheme="blue" onClick={handleSearch}>
//             Search
//           </Button>
//         </Flex>

//         {/* Loading spinner */}
//         {loading ? (
//           <Spinner size="xl" />
//         ) : (
//           <Table bg="white" borderRadius="md" boxShadow="md" maxW="100%">
//             <Thead bg="gray.100">
//               <Tr>
//                 <Th>ID</Th>
//                 <Th>Complaint Text</Th>
//                 <Th>Is Resolved</Th>
//                 <Th>Product Name</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {reports.map(({ id, complaintText, isResolved, productName }) => (
//                 <Tr key={id}>
//                   <Td>{id}</Td>
//                   <Td
//                     maxW="400px"
//                     whiteSpace="nowrap"
//                     overflow="hidden"
//                     textOverflow="ellipsis"
//                   >
//                     <Text maxW="400px" title={complaintText}>
//                       {complaintText}
//                     </Text>
//                   </Td>
//                   <Td>{isResolved ? "Yes" : "No"}</Td>
//                   <Td>{productName}</Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default AdminPanelReportList;


import {
  Box,
  Button,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Heading,
  Select,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";

const AdminPanelReportList = () => {
  // State variables
  const [reports, setReports] = useState([]); // List of reports from backend
  const [loading, setLoading] = useState(true); // Loading spinner flag
  const [filter, setFilter] = useState("ALL"); // Dropdown filter state
  const toast = useToast();

  // Base API URL for reports
  const API_URL = "http://localhost:7070/admin/reports";

  // Fetch ALL reports
  const fetchAllReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/all`);
      setReports(response.data);
    } catch (error) {
      toast({
        title: "Error fetching reports",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch reports by status
  const fetchReportsByStatus = async (status) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/status?status=${status}`);
      setReports(response.data);
    } catch (error) {
      toast({
        title: "Error fetching reports",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (value) => {
    setFilter(value);
    if (value === "ALL") {
      fetchAllReports();
    } else {
      fetchReportsByStatus(value);
    }
  };

  // On mount → fetch all reports
  useEffect(() => {
    fetchAllReports();
  }, []);

  return (
    <Box display="flex" minH="100vh">
      {/* Sidebar fixed left */}
      <Box position="fixed" w="40" h="100vh" bg="gray.200">
        <SideBar />
      </Box>

      {/* Main content */}
      <Box flex={1} marginLeft={250} p={8} minH="100vh" bg="gray.50">
        {/* Header: Title and Dropdown */}
        <Heading size="lg" align="center" mb={6}>
          Reports List
        </Heading>
        <Flex mb={6} align="center">
          <Spacer />
          <Select
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            maxW="200px"
            bg="white"
            borderColor="gray.300"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="RESOLVED">Resolved</option>
            <option value="INPROGRESS">In Progress</option>
          </Select>
        </Flex>

        {/* Loading spinner */}
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Table bg="white" borderRadius="md" boxShadow="md" maxW="100%">
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Complaint Text</Th>
                <Th>Is Resolved</Th>
                <Th>Product Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reports.map(({ id, complaintText, reportStatus, productName }) => (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td
                    maxW="400px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    <Text maxW="400px" title={complaintText}>
                      {complaintText}
                    </Text>
                  </Td>
                  <Td>{reportStatus}</Td>
                  <Td>{productName}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};

export default AdminPanelReportList;

