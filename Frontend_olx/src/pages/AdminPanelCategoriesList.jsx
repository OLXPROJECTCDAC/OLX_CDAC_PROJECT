// import SideBar from "../components/SideBar";

// function AdminPanelCategoriesList(){

//     return(
//         <>
//         <Box display="flex">
//              <Box>
//              <SideBar/>
//              </Box>
//              <Box>

//              </Box>
//         </Box>
        
           
//       </>
//     )
// }

// export default AdminPanelCategoriesList;


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
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Input,
//   useDisclosure,
//   Text,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import SideBar from "../components/SideBar";

// const AdminPanelCategoriesList = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [updatedCategory, setUpdatedCategory] = useState({});
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const toast = useToast();

//   const API_URL = "http://localhost:7070/categories/all";

//   // Fetch categories from backend
//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(API_URL
//         // , {
//         //   headers: {
//         //     Authorization: `Bearer ${token}`, // For Spring Security (commented for now)
//         //   },
//         // }
//       );
//       setCategories(response.data);
//     } catch (error) {
//       toast({
//         title: "Error fetching categories",
//         description: error.message,
//         status: "error",
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Delete category handler
//   const handleDelete = async (id) => {
//     try {
//       if (!window.confirm("Are you sure you want to delete this category?")) return;

//       await axios.delete(`http://localhost:7070/categories/${id}`
//         // , {
//         //   headers: {
//         //     Authorization: `Bearer ${token}`, // For Spring Security (commented)
//         //   },
//         // }
//       );

//       toast({
//         title: `Deleted category with ID ${id}`,
//         status: "success",
//         isClosable: true,
//       });

//       setCategories((prev) => prev.filter((cat) => cat.id !== id));
//     } catch (error) {
//       toast({
//         title: "Failed to delete category",
//         description: error?.response?.data?.message || "Something went wrong",
//         status: "error",
//         isClosable: true,
//       });
//     }
//   };

//   // Open modal for update and set current category
//   const handleUpdate = (id) => {
//     const category = categories.find((cat) => cat.id === id);
//     setSelectedCategory(category);
//     setUpdatedCategory({
//       categoryName: category.categoryName,
//       categoryDetails: category.categoryDetails,
//     });
//     onOpen();
//   };

//   // Save updated category to backend
//   const handleSaveUpdate = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:7070/categories/${selectedCategory.id}`,
//         {
//           categoryName: updatedCategory.categoryName,
//           categoryDetails: updatedCategory.categoryDetails,
//         }
//         // , {
//         //   headers: {
//         //     Authorization: `Bearer ${token}`, // Spring Security commented
//         //   },
//         // }
//       );

//       // Update the category in frontend state
//       const updatedList = categories.map((cat) =>
//         cat.id === selectedCategory.id ? response.data : cat
//       );
//       setCategories(updatedList);

//       toast({
//         title: "Category updated successfully",
//         status: "success",
//         isClosable: true,
//       });

//       onClose();
//     } catch (error) {
//       toast({
//         title: "Failed to update category",
//         description: error.message || "Something went wrong",
//         status: "error",
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Box display="flex" minH="100vh">
//       <Box position="fixed" w="40" h="100vh" bg="gray.200">
//         <SideBar />
//       </Box>

//       <Box flex={1} marginLeft={250} p={8} minH="100vh" bg="gray.50" align="center">
//         <Heading size="lg" mb={6}>
//           Categories List
//         </Heading>

//         {loading ? (
//           <Spinner size="xl" />
//         ) : (
//           <Table  bg="white" borderRadius="md" boxShadow="md" maxW="100%">
//             <Thead bg="gray.100">
//               <Tr>
//                 <Th>ID</Th>
//                 <Th>Category Name</Th>
//                 <Th maxW="400px">Category Description</Th>
//                 <Th>Actions</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {categories.map(({ id, categoryName, categoryDetails }) => (
//                 <Tr key={id}>
//                   <Td>{id}</Td>
//                   <Td>{categoryName}</Td>
//                   <Td maxW="400px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
//                     <Text maxW="400px" title={categoryDetails}>
//                       {categoryDetails}
//                     </Text>
//                   </Td>
//                   <Td>
//                     <Button size="sm" colorScheme="blue" mr={2} onClick={() => handleUpdate(id)}>
//                       Update
//                     </Button>
//                     <Button size="sm" colorScheme="red" onClick={() => handleDelete(id)}>
//                       Delete
//                     </Button>
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         )}

//         {/* Update Modal */}
//         <Modal isOpen={isOpen} onClose={onClose}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Update Category</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//               <Input
//                 mb={3}
//                 placeholder="Category Name"
//                 value={updatedCategory.categoryName || ""}
//                 onChange={(e) =>
//                   setUpdatedCategory({ ...updatedCategory, categoryName: e.target.value })
//                 }
//               />
//               <Input
//                 mb={3}
//                 placeholder="Category Description"
//                 value={updatedCategory.categoryDetails || ""}
//                 onChange={(e) =>
//                   setUpdatedCategory({ ...updatedCategory, categoryDetails: e.target.value })
//                 }
//               />
//             </ModalBody>

//             <ModalFooter>
//               <Button colorScheme="blue" onClick={handleSaveUpdate}>
//                 Save
//               </Button>
//               <Button variant="ghost" ml={3} onClick={onClose}>
//                 Cancel
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       </Box>
//     </Box>
//   );
// };

// export default AdminPanelCategoriesList;

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";

const AdminPanelCategoriesList = () => {
  // State variables
  const [categories, setCategories] = useState([]); // List of categories from backend
  const [loading, setLoading] = useState(true); // Loading spinner flag
  const [selectedCategory, setSelectedCategory] = useState(null); // For update modal
  const [updatedCategory, setUpdatedCategory] = useState({}); // Store update form data
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const { isOpen, onOpen, onClose } = useDisclosure(); // Update modal controls
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure(); // Delete confirmation modal controls
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); // ID to delete
  const toast = useToast();

  // Base API URL for categories
  const API_URL = "http://localhost:7070/categories";

  // ✅ New function to fetch ALL categories
  const fetchAllCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/all`);
      setCategories(response.data);
    } catch (error) {
      toast({
        title: "Error fetching categories",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // New function to fetch filtered categories based on search term
  const fetchFilteredCategories = async (search) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/search?q=${search}`);
      setCategories(response.data);
    } catch (error) {
      toast({
        title: "Error searching categories",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // On component mount, fetch all categories
  useEffect(() => {
    fetchAllCategories();
  }, []);

  // Handler for search button click
  const handleSearch = () => {
    // If search term is empty, fetch all categories. Otherwise, fetch filtered.
    if (searchTerm.trim() === "") {
      fetchAllCategories();
    } else {
      fetchFilteredCategories(searchTerm.trim());
    }
  };

  // Open update modal and populate data for given category id
  const handleUpdate = (id) => {
    const category = categories.find((cat) => cat.id === id);
    setSelectedCategory(category);
    setUpdatedCategory({
      categoryName: category.categoryName,
      categoryDetails: category.categoryDetails,
      id:category.id,
    });
    onOpen();
  };

  // Save updated category via API call
const handleSaveUpdate = async () => {
  try {
    // Use the ID from selectedCategory
    const categoryId = selectedCategory?.id;

    if (!categoryId) {
      toast({
        title: "No category selected",
        status: "error",
        isClosable: true,
      });
      return;
    }

    // Send PUT request to update category
    const response = await axios.put(`http://localhost:7070/admin/categories/${categoryId}`, {
      categoryName: updatedCategory.categoryName,
      categoryDetails: updatedCategory.categoryDetails,
    });

    // Update frontend list with updated category
    const updatedList = categories.map((cat) =>
      cat.id === categoryId ? response.data : cat
    );
    setCategories(updatedList);

    toast({
      title: "Category updated successfully",
      status: "success",
      isClosable: true,
    });

    onClose();
  } catch (error) {
    toast({
      title: "Failed to update category",
      description: error.message || "Something went wrong",
      status: "error",
      isClosable: true,
    });
  }
};

  // Open delete confirmation modal and set category id to delete
  const handleDeleteClick = (id) => {
    setDeleteCategoryId(id);
    onDeleteOpen();
  };

  // Confirm deletion and call backend API
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:7070/admin/categories/${deleteCategoryId}`);

      toast({
        title: `Deleted category with ID ${deleteCategoryId}`,
        status: "success",
        isClosable: true,
      });

      // Remove category from frontend list
      setCategories((prev) => prev.filter((cat) => cat.id !== deleteCategoryId));
      onDeleteClose();
      setDeleteCategoryId(null);
    } catch (error) {
      toast({
        title: "Failed to delete category",
        description: error?.response?.data?.message || "Something went wrong",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box display="flex" minH="100vh">
      {/* Sidebar fixed left */}
      <Box position="fixed" w="40" h="100vh" bg="gray.200">
        <SideBar />
      </Box>

      {/* Main content */}
      <Box flex={1} marginLeft={250} p={8} minH="100vh" bg="gray.50">
        {/* Header: Title and Search bar on the right */}
        <Heading size="lg" align="center">Categories List</Heading>
        <Flex mb={6} align="center">
          
          
          <Spacer />
          {/* Search input */}
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            maxW="300px"
            mr={2}
          />
          {/* Search button */}
          <Button colorScheme="blue" onClick={handleSearch}>
            Search
          </Button>
        </Flex>

        {/* Loading spinner */}
        {loading ? (
          <Spinner size="xl" />
        ) : (
          // Categories table
          <Table bg="white" borderRadius="md" boxShadow="md" maxW="100%">
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Category Name</Th>
                <Th maxW="400px">Category Description</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories.map(({ id, categoryName, categoryDetails }) => (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td>{categoryName}</Td>
                  <Td
                    maxW="400px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    <Text maxW="400px" title={categoryDetails}>
                      {categoryDetails}
                    </Text>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      mr={2}
                      onClick={() => handleUpdate(id)}
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeleteClick(id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        {/* Update Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                  <Input
                mb={3}
                placeholder="Category ID"
                value={updatedCategory.id || ""}
                onChange={(e) =>
                  setUpdatedCategory({ ...updatedCategory, id: e.target.value })
                }
                readOnly
              />
              <Input
                mb={3}
                placeholder="Category Name"
                value={updatedCategory.categoryName || ""}
                onChange={(e) =>
                  setUpdatedCategory({ ...updatedCategory, categoryName: e.target.value })
                }
              />
              <Input
                mb={3}
                placeholder="Category Description"
                value={updatedCategory.categoryDetails || ""}
                onChange={(e) =>
                  setUpdatedCategory({ ...updatedCategory, categoryDetails: e.target.value })
                }
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSaveUpdate}>
                Save
              </Button>
              <Button variant="ghost" ml={3} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this category?</ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={confirmDelete}>
                Yes
              </Button>
              <Button variant="ghost" ml={3} onClick={onDeleteClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default AdminPanelCategoriesList;
