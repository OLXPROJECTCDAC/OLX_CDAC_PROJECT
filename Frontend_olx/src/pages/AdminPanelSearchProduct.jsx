import {
  Box,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Spinner,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";

const AdminPanelSearchProduct = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const API_URL = "https://fakestoreapi.com/products"; // Example API

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Enter a product name or ID to search",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(API_URL);
      const filtered = response.data.filter((product) => {
        const idMatch = product.id.toString() === query.trim();
        const nameMatch = product.title
          .toLowerCase()
          .includes(query.toLowerCase());
        return idMatch || nameMatch;
      });
      setSearchResults(filtered);
    } catch (err) {
      toast({
        title: "Failed to fetch products",
        description: err.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setSearchResults((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: `Product with ID ${id} deleted (mock)`,
      status: "info",
      isClosable: true,
    });
  };

  const handleUpdateOpen = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({
      title: product.title,
      price: product.price,
      category: product.category,
    });
    onOpen();
  };

  const handleSaveUpdate = () => {
    const updated = searchResults.map((prod) =>
      prod.id === selectedProduct.id ? { ...prod, ...updatedProduct } : prod
    );
    setSearchResults(updated);
    toast({
      title: "Product updated",
      status: "success",
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box display="flex">
    <Box  position="fixed"><SideBar/></Box>
    <Box p={8} marginLeft={40} bg="gray.50" minH="100vh" flex={1} >
      {/* 🔍 Search bar */}
      <VStack align="start" spacing={4} mb={6}>
        <Input
          placeholder="Search by Product Name or ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          width="400px"
        />
        <Button colorScheme="blue" onClick={handleSearch}>
          Search
        </Button>
      </VStack>

      {/* 🧪 Results */}
      {loading ? (
        <Spinner size="lg" />
      ) : searchResults.length > 0 ? (
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
            {searchResults.map((product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.title}</Td>
                <Td>${product.price}</Td>
                <Td>{product.category}</Td>
                <Td>
                  <Button
                    width="20"
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleUpdateOpen(product)}
                  >
                    Update
                  </Button>
                  <Button
                    width="20"
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        query && <Box>No products found.</Box>
      )}

      {/* 🛠️ Update Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title"
              mb={3}
              value={updatedProduct.title || ""}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, title: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              mb={3}
              type="number"
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
            <Button ml={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    </Box>
  );
};

export default AdminPanelSearchProduct;
