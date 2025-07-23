import {
  Box,
  Button,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import SlideBar from '../components/SideBar';

const AdminPanelOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenProducts, onOpen: openProducts, onClose: closeProducts } = useDisclosure();

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    owner: '',
  });

  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);

  const categories = ['Electronics', 'Books', 'Clothing'];
  const allProducts = {
    Electronics: ['Phone', 'Laptop'],
    Books: ['Novel', 'Comics'],
    Clothing: ['T-Shirt', 'Jeans'],
  };

  const handleCategorySelect = (e) => {
    const selected = e.target.value;
    setCategory(selected);
    setProducts(allProducts[selected] || []);
  };

  return (
    <Box display="flex">
       <Box>
      <SlideBar/>
       </Box>
       <Box flex={1}>
           
       </Box>
    </Box>
   

  );
};

export default AdminPanelOrders;
