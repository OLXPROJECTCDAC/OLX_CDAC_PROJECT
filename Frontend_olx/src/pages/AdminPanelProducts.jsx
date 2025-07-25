
    // <Box display="flex">
    //    <Box>
    //   <SlideBar/>
    //    </Box>
    //    <Box flex={1}>
           
    //    </Box>
    // </Box>
import SideBar from "../components/SideBar";
  


import {Box, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";


const AdminPanelProducts = ()=>{
const navigate = useNavigate();
  return (
    <Box  display="flex" >
      <Box >
        <SideBar/>
      </Box>
      <Box  display="flex"  flex={1}>
       <Box flex={1}  margin={5}
      display="flex"
      justifyContent="center"
      alignItems="center" > 
          <Button _hover={{
          boxShadow: "lg",
          bg: "gray.100",
          transform: "scale(1.03)",
          transition: "0.2s",
        }}  onClick={() => navigate("/AdminPanel/Products/List")} > List Of Products </Button>
       </Box>
       <Box flex={1}  margin={5}
      display="flex"
      justifyContent="center"
      alignItems="center" > 
        <Button 
        _hover={{
          boxShadow: "lg",
          bg: "gray.100",
          transform: "scale(1.03)",
          transition: "0.2s",
        }}  onClick={()=>navigate("/AdminPanel/Products/search")}>Search Products</Button> 
       </Box>
      </Box>
    
      </Box>
      
  );
  };



export default AdminPanelProducts;
