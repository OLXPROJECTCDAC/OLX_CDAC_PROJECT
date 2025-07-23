import { Box, Text,VStack,Link} from "@chakra-ui/react"
import profilePic from '../assets/profilepic.jpg';
import { Link as RouterLink } from "react-router-dom";
const SlideBar=()=>{

    return(<>
    <Box display="flex" width="40" backgroundColor="black" color="white" flexDirection="column" height="100vh" margin="0" padding="1.5rem" justifyContent={"space-evenly"}  boxShadow="lg"> 
       
  <Box   display="flex" flexDirection="column" alignItems="center" className="adminpanel-img" ><img  src={profilePic} alt="profile pic" />
   <Text fontSize="lg" fontWeight="bold">Your Name</Text>
  </Box>
     <VStack spacing={6} align="center" mt="8">
       <Link as={RouterLink} to="/AdminPanel/categories" ><Text cursor="pointer" _hover={{ color: "teal.300" }}>🏷 Categories</Text></Link> 
        <Link as={RouterLink} to="/AdminPanel/orders"><Text cursor="pointer" _hover={{ color: "teal.300" }}>📦 Products</Text></Link>
        <Link href="..."><Text cursor="pointer" _hover={{ color: "teal.300" }}>⚙ Settings</Text></Link>
      </VStack>
      <Box mt="auto" pt="10">
        <Text fontSize="sm" color="gray.400">© 2025 YourCompany</Text>
      </Box>

    </Box>
   
</>
    )
}

export default SlideBar;