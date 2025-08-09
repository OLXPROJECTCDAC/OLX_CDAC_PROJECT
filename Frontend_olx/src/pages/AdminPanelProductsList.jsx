

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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const API_URL = "http://localhost:7070/admin/products"; // Replace with your API

  // Fetch product data
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      toast({
        title: "Error fetching products",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 
  
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:7070/admin/products/${id}`, {
      headers: {
        // Include this only if your Spring Boot API is secured
        // Authorization: `Bearer ${token}`,
      },
    });

    toast({
      title: `Deleted product with ID ${id}`,
      status: "success",
      isClosable: true,
    });

    setProducts((prev) => prev.filter((product) => product.id !== id));
  } catch (error) {
    console.error("Delete failed:", error);
    toast({
      title: "Failed to delete product",
      description: error?.response?.data?.message || "Something went wrong",
      status: "error",
      isClosable: true,
    });
  }
};

  

// Handle update: open modal
const handleUpdate = (id) => {
  const product = products.find((p) => p.id === id);
  setSelectedProduct(product);
  setUpdatedProduct({
    title: product.title,
    price: product.price,
    categoryId: product.categoryId,      // for backend
    category: product.categoryName,  // for showing in modal
  });
  onOpen();
};

// Save changes (with backend API call)
const handleSaveUpdate = async () => {
  try {
    const response = await axios.put(
      `http://localhost:7070/admin/products/${selectedProduct.id}`, // Your backend update endpoint
      {
        title: updatedProduct.title,
        price: Number(updatedProduct.price),
        categoryId: Number(updatedProduct.categoryId), 
      }
    );

    // Update frontend list with the updated product from backend
    const updatedList = products.map((prod) =>
      prod.id === selectedProduct.id ? response.data : prod
    );
    setProducts(updatedList);

    toast({
      title: "Product updated successfully",
      status: "success",
      isClosable: true,
    });

    onClose();
  } catch (error) {
    console.error("Error updating product:", error);
    toast({
      title: "Failed to update product",
      status: "error",
      isClosable: true,
    });
  }
};



  return (
    <Box display="flex">
      <Box position="fixed" w="40" h="100vh" bg="gray.200">
        <SideBar />
      </Box>

      <Box flex={1} marginLeft={250 } p={8} minH="100vh" bg="gray.50" align="center">
        <Heading size="lg" mb={6}>
          Products Table
        </Heading>

        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Table variant="simple" bg="white" borderRadius="md" boxShadow="md">
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Category</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id}>
                  <Td>{product.id}</Td>
                  <Td>{product.title}</Td>
                  <Td>${product.price}</Td>
                  <Td>{product.categoryName}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      width={20}
                      margin={1}
                      onClick={() => handleUpdate(product.id)}
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      width={20}
                      margin={1}
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        {/* ✅ Update Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               {/* Existing Input fields for title and price */}

                <Input type="hidden" value={updatedProduct.categoryId} />
  
          
              <Input
                mb={3}
                placeholder="Product Title"
                value={updatedProduct.title || ""}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, title: e.target.value })
                }
              />
              <Input
                mb={3}
                type="number"
                placeholder="Price"
                value={updatedProduct.price || ""}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                }
              />
              
           
                  <Input
                  placeholder="Category"
                  value={updatedProduct.category || ""}
                  onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, category: e.target.value })
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
      </Box>
    </Box>
  );
};

export default ProductsTable;


