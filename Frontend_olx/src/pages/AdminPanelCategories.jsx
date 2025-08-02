import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  useDisclosure,
  useToast,
  Switch,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";

import SlideBar from "../components/SideBar"; // Adjust path as needed

const AdminPanelCategories = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState({ name: "", description: "" });

  const addCategory = () => {
    if (!newCat.name) {
      toast({
        title: "Validation Error",
        description: "Category name is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setCategories([...categories, { ...newCat, id: Date.now(), active: true }]);
    setNewCat({ name: "", description: "" });
    onClose();

    toast({
      title: "Category Added",
      description: `${newCat.name} has been added.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: "Category Deleted",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const toggleActive = (id) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, active: !cat.active } : cat
    ));
  };

  return (
    <Flex> {/* Parent layout container */}
      <Box width="40" bg="gray.100" minH="100vh">
        <SlideBar />
      </Box>

      <Box flex="1" p={8}>
        <Button colorScheme="blue" onClick={onOpen}>
          Add Category
        </Button>

        <Table mt={8}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map(cat => (
              <Tr key={cat.id}>
                <Td>{cat.name}</Td>
                <Td>{cat.description}</Td>
                <Td>
                  <Switch
                    isChecked={cat.active}
                    onChange={() => toggleActive(cat.id)}
                    colorScheme="green"
                  />
                </Td>
             
                <Td>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => deleteCategory(cat.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={3}>
                <FormLabel>Category Name</FormLabel>
                <Input
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={addCategory}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default AdminPanelCategories;


