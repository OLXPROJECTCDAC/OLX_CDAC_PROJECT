import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex,
  Heading,
  Spinner,
  Switch,
  Toast,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import SideBar from "../components/SideBar";


function AdminPanelUsersList() {
  // State to store all users
  const [users, setUsers] = useState([]);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Delete modal state
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Update modal state
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
  const [updateUser, setUpdateUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    mobilePhone: "",
    isActive: true,
  });
  const toast = useToast();

  /**
   * Fetch all users from backend API
   */
  const fetchUsers = () => {
    setLoading(true);
    // const token = localStorage.getItem("token");
    // axios.get("http://localhost:8080/api/users", {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
    // .then(res => {
    //   setUsers(res.data);
    //   setLoading(false);
    // })
    // .catch(console.error);


    axios
    .get(`http://localhost:7070/admin/users`) // Replace with your API endpoint
    .then((res) => {
      setUsers(res.data); // Assuming API returns an array of users
      setLoading(false);
      
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      setLoading(false);
    });

    // // Mock Data for now
    // setTimeout(() => {
    //   setUsers([
    //     { id: 1, firstName: "John", lastName: "Doe", mobile: "1234567890", isActive: true },
    //     { id: 2, firstName: "Jane", lastName: "Smith", mobile: "9876543210", isActive: false },
    //   ]);
    //   setLoading(false);
    // }, 500);
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Handle deleting a user
   */
  const handleDeleteUser = () => {
    // const token = localStorage.getItem("token");
    // axios.delete(`http://localhost:8080/api/users/${deleteUserId}`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
    // .then(() => {
    //   fetchUsers();
    //   onDeleteClose();
    // })
    // .catch(console.error);

    // Mock delete logic
    setUsers(users.filter((u) => u.id !== deleteUserId));
    onDeleteClose();
  };

  /**
   * Handle saving updated user data
   */
  const handleSaveUser = () => {
    // const token = localStorage.getItem("token");
    // axios.put(`http://localhost:8080/api/users/${updateUser.id}`, updateUser, {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
    // .then(() => {
    //   fetchUsers();
    //   onUpdateClose();
    // })
    // .catch(console.error);



     axios
    .put(`http://localhost:7070/admin/users/${updateUser.id}`,updateUser) // Replace with your API endpoint
    .then((res) => {
    //   console.log(res)  used for debugging
      setUsers(prevusers=>prevusers.map((u)=>u.id===updateUser.id?updateUser:u)); // Assuming API returns an array of users
      setLoading(false);
      toast({
          title: "User Updated Successfully.",
          status: "success",
          isClosable: true,
        
        });
      onUpdateClose();
      
      
    })
    .catch((error) => {
    //   console.error("Error fetching users:", error);
      setLoading(false);
        toast({
          title: "User failed to update.",
          status: "error",
          isClosable: true,
        
        });
      onUpdateClose();
    
    });

    // // Mock update logic
    // setUsers(users.map((u) => (u.id === updateUser.id ? updateUser : u)));
    // onUpdateClose();
  };

  /**
   * Handle searching users
   */
  const handleSearch = () => {
    setLoading(true);
    // const token = localStorage.getItem("token");
    // axios.get(`http://localhost:8080/api/users/search?query=${searchQuery}`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
    // .then(res => {
    //   setUsers(res.data);
    //   setLoading(false);
    // })
    // .catch(console.error);

    axios.get(`http://localhost:7070/admin/users/search?keyword=${searchQuery}`).then(res=>{
        setUsers(res.data);
        setLoading(false);
    }).catch((error) => {
        console.error("Error searching users:", error);
        setLoading(false);
        toast({
          title: "Error searching users.",
          description: error.message,
          status: "error",
          isClosable: true,
        });
    });
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Box position="fixed">
         <SideBar />
      </Box>
     

      {/* Main content */}
      <Box flex="1" p={6} ml="250">
        {/* Page heading */}
        <Heading size="lg" align="center" mb={4}>
          Users List
        </Heading>

        {/* Search bar */}
        <Flex justify="end" align="center" mb={4}>
          <Flex>
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              mr={2}
            />
            <Button colorScheme="blue" onClick={handleSearch}>
              Search
            </Button>
          </Flex>
        </Flex>

        {/* Users table */}
        {loading ? (
          <Flex justify="center" align="center" h="200px">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : (
          <Table colorScheme="gray" boxShadow="md" borderRadius="md" maxW="100%">
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Mobile</Th>
                <Th>Is Active</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.mobilePhone}</Td>
                  <Td>
                    <Switch isChecked={user.isActive} isReadOnly />
                  </Td>
                  <Td>
                    {/* Update Button */}
                    <Button
                      size="sm"
                      colorScheme="blue"
                      mr={2}
                      onClick={() => {
                        setUpdateUser(user);
                        onUpdateOpen();
                      }}
                    >
                      Update
                    </Button>
                    {/* Delete Button */}
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        setDeleteUserId(user.id);
                        onDeleteOpen();
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this user?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteUser}>
              Yes, Delete
            </Button>
            <Button variant="ghost" onClick={onDeleteClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Update User Modal */}
      <Modal isOpen={isUpdateOpen} onClose={onUpdateClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* ID (Read-only) */}
            <Input
              placeholder="ID"
              value={updateUser.id}
              isReadOnly
              mb={3}
            />
            {/* First Name */}
            <Input
              placeholder="First Name"
              value={updateUser.firstName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, firstName: e.target.value })
              }
              mb={3}
            />
            {/* Last Name */}
            <Input
              placeholder="Last Name"
              value={updateUser.lastName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, lastName: e.target.value })
              }
              mb={3}
            />
            {/* Mobile */}
            <Input
              placeholder="Mobile"
              value={updateUser.mobilePhone}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, mobilePhone: e.target.value })
              }
              mb={3}
            />
            {/* Active switch */}
            <Flex align="center" mb={3}>
              <Switch
                isChecked={updateUser.isActive}
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, isActive: e.target.checked })
                }
                mr={2}
              />
              <span>Is Active</span>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveUser}>
              Save
            </Button>
            <Button variant="ghost" onClick={onUpdateClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AdminPanelUsersList;


