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
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import SideBar from "../components/SideBar";

// const ProductsTable = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const toast = useToast();

//   // Replace this with your actual backend endpoint
//   const API_URL = "https://fakestoreapi.com/products";

//   // Fetch product data
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(API_URL);
//       setProducts(response.data);
//     } catch (error) {
//       toast({
//         title: "Error fetching products",
//         description: error.message,
//         status: "error",
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Handle delete (mock for now)
//   const handleDelete = (id) => {
//     toast({
//       title: `Deleted product with ID ${id}`,
//       status: "warning",
//       isClosable: true,
//     });

//     // Simulate UI update by filtering out the deleted product
//     setProducts((prev) => prev.filter((product) => product.id !== id));
//   };

//   // Handle update (mock for now)
//   const handleUpdate = (id) => {
//     toast({
//       title: `Update product with ID ${id}`,
//       status: "info",
//       isClosable: true,
//     });

//     // Here you can open a modal or navigate to an edit page
//   };

//   return (
//     <Box display="flex">
//        <Box position="fixed"><SideBar/></Box> {/* to fix sidebar component on left while scrolling but it will get it outside of document flow */}
//     <Box flex={1} p={8} ml="40"  minH="100vh" bg="gray.50" align="center">
//         {/*because of that it will start merging to avoid that i give margin equal to Sidebar width */}
     
//       <Heading size="lg" mb={6}>
//         Products Table
//       </Heading>

//       {loading ? (
//         <Spinner size="xl" />
//       ) : (
//         <Table variant="simple" bg="white" borderRadius="md" boxShadow="md">
//           <Thead bg="gray.100">
//             <Tr>
//               <Th>ID</Th>
//               <Th>Name</Th>
//               <Th>Price</Th>
//               <Th>Category</Th>
//               <Th>Actions</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {products.map((product) => (
//               <Tr key={product.id}>
//                 <Td>{product.id}</Td>
//                 <Td>{product.title}</Td>
//                 <Td>${product.price}</Td>
//                 <Td>{product.category}</Td>
//                 <Td>
//                   <Button
//                     size="sm"
//                     colorScheme="blue"
//                     width={20}
                    
//                     margin={1}
//                     onClick={() => handleUpdate(product.id)}
//                   >
//                     Update
//                   </Button>
//                   <Button
//                     size="sm"
//                     colorScheme="red"
//                     width={20} margin={1}
//                     onClick={() => handleDelete(product.id)}
//                   >
//                     Delete
//                   </Button>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       )}
//     </Box>
//     </Box>
//   );
// };

// export default ProductsTable;

// import { chakra, useDisclosure, useToast } from "@chakra-ui/react";
// import { useEffect, useState } from "react";

// const AdminPanelProductsList = () =>{
//     const [products,setProducts] = useState([]);
//     const{isOpen,onOpen,onClose}=useDisclosure();
//     const{loading,setLoading}=usestate(true);
//     const toast = useToast();

//     const API_URL = "https://fakestoreapi.com/products"; // Replace with your API
//     const fetchProducts = async()=>{
//         setLoading(true);
//         try{
//             const response = await axios.get(API_URL);
//             setProducts(response.data);
//         }catch(error){
//              toast({
//                 title:"Error fetching products",
//                 description:error.message,
//                 status:"error",
//                 isClosable:true,

//              })
//         }finally{
//             setLoading(false);
//         }

//     };
//     useEffect(()=>{
//        fetchProducts();
//     },[]);



// }

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

  const API_URL = "https://fakestoreapi.com/products"; // Replace with your API

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

  // Handle delete (mock)
  const handleDelete = (id) => {
    toast({
      title: `Deleted product with ID ${id}`,
      status: "warning",
      isClosable: true,
    });
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  // Handle update: open modal
  const handleUpdate = (id) => {
    const product = products.find((p) => p.id === id);
    setSelectedProduct(product);
    setUpdatedProduct({
      title: product.title,
      price: product.price,
      category: product.category,
    });
    onOpen();
  };

  // Save changes
  const handleSaveUpdate = () => {
    const updatedList = products.map((prod) =>
      prod.id === selectedProduct.id
        ? { ...prod, ...updatedProduct }
        : prod
    );
    setProducts(updatedList);

    toast({
      title: "Product updated",
      status: "success",
      isClosable: true,
    });

    onClose();
  };

  return (
    <Box display="flex">
      <Box position="fixed" w="40" h="100vh" bg="gray.200">
        <SideBar />
      </Box>

      <Box flex={1} marginLeft={40} p={8} minH="100vh" bg="gray.50" align="center">
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
                  <Td>{product.category}</Td>
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

