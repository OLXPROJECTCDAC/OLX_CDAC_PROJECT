// import { Box, Text,VStack,Link} from "@chakra-ui/react"
// import profilePic from '../assets/profilepic.jpg';
// import { Link as RouterLink } from "react-router-dom";
// const SlideBar=()=>{

//     return(<>
//     <Box display="flex" width="40" backgroundColor="black" color="white" flexDirection="column" height="100vh" margin="0" padding="1.5rem" justifyContent={"space-evenly"}  boxShadow="lg"> 
       
//   <Box   display="flex" flexDirection="column" alignItems="center" className="adminpanel-img" ><img  src={profilePic} alt="profile pic" />
//    <Text fontSize="lg" fontWeight="bold">Your Name</Text>
//   </Box>
//      <VStack spacing={6} align="center" mt="8">
//        <Link as={RouterLink} to="/AdminPanel/categories" ><Text cursor="pointer" _hover={{ color: "teal.300" }}> 🏷️Categories</Text></Link> 
//         <Link as={RouterLink} to="/AdminPanel/orders"><Text cursor="pointer" _hover={{ color: "teal.300" }}>📦 Products</Text></Link>
//         <Link as={RouterLink}
//               to = "/AdminPanel/Settings"  
//         ><Text cursor="pointer" _hover={{ color: "teal.300" }}>⚙ Settings</Text></Link>
//       </VStack>
//       <Box mt="auto" pt="10">
//         <Text fontSize="sm" color="gray.400">© 2025 YourCompany</Text>
//       </Box>

//     </Box>
   
// </>
//     )
// }

// export default SlideBar;


import {
  Box,
  Text,
  VStack,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import profilePic from "../assets/profilepic.jpg";

// Helper for consistent icon + text alignment
const menuItem = (icon, label) => (
  <Box display="flex" alignItems="center" gap={3}>
    <Box
      fontSize="20px" // uniform icon size
      w="28px"
      h="28px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      lineHeight="1"
    >
      <span style={{ fontSize: "20px" }}>{icon}</span>
    </Box>
    <Text
      mb= "0"
      fontSize="md"
      fontWeight="medium"
      display="flex"
      alignItems="center"
    >
      {label}
    </Text>
  </Box>
);

const SlideBar = () => {
  return (
    <Box
      display="flex"
      width="250px"
      backgroundColor="#1A202C"
      color="white"
      flexDirection="column"
      height="100vh"
      padding="1.5rem"
      boxShadow="xl"
    >
      {/* Profile */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={6}>
        <img
          src={profilePic}
          alt="profile pic"
          style={{ borderRadius: "50%", width: "90px", height: "90px" }}
        />
        <Text fontSize="lg" fontWeight="bold" mt={3}>
          Your Name
        </Text>
      </Box>

      {/* Navigation */}
      <VStack spacing={4} align="stretch" flex="1">
        {/* Categories */}
        <Accordion allowToggle>
          <AccordionItem border="none">
            <h2>
              <AccordionButton
                _hover={{ bg: "gray.600" }}
                display="flex"
                alignItems="center"
                py={2}
              >
                <Box flex="1">{menuItem("🏷️", "Categories")}</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2}>
              <VStack align="start" spacing={2} pl={6}>
                <Link
                  as={RouterLink}
                  to="/AdminPanel/categories/list"
                  _hover={{ color: "teal.300" }}
                >
                  📋 List
                </Link>
                <Link
                  as={RouterLink}
                  to="/AdminPanel/categories/analytics"
                  _hover={{ color: "teal.300" }}
                >
                  📊 Analytics
                </Link>
                <Link
                  as={RouterLink}
                  to="/AdminPanel/categories/search"
                  _hover={{ color: "teal.300" }}
                >
                  🔍 Search
                </Link>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* Products */}
        <Accordion allowToggle>
          <AccordionItem border="none">
            <h2>
              <AccordionButton
                _hover={{ bg: "gray.600" }}
                display="flex"
                alignItems="center"
                py={2}
              >
                <Box flex="1">{menuItem("📦", "Products")}</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2}>
              <VStack align="start" spacing={2} pl={6}>
                <Link
                  as={RouterLink}
                  to="/AdminPanel/products/list"
                  _hover={{ color: "teal.300" }}
                >
                  📋 List
                </Link>
                <Link
                  as={RouterLink}
                  to="/AdminPanel/products/analytics"
                  _hover={{ color: "teal.300" }}
                >
                  📊 Analytics
                </Link>
                <Link
                  as={RouterLink}
                  to="/AdminPanel/products/search"
                  _hover={{ color: "teal.300" }}
                >
                  🔍 Search
                </Link>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* Settings */}
        <Accordion allowToggle>
          <AccordionItem border="none">
            <h2>
              <AccordionButton
                _hover={{ bg: "gray.600" }}
                display="flex"
                alignItems="center"
                py={2}
              >
                <Box flex="1" >{menuItem("⚙️", "Settings")}</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2}>
              <VStack align="start" spacing={2} pl={6}>
                <Link
                  as={RouterLink}
                  to="/AdminPanel/settings/edit-profile"
                  _hover={{ color: "teal.300" }}
                >
                  📝 Edit Profile
                </Link>
                <Link
                  as={RouterLink}
                  to="/AdminPanel/settings/preferences"
                  _hover={{ color: "teal.300" }}
                >
                  🔧 Preferences
                </Link>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>

      {/* Footer */}
      <Box mt="auto" pt="10" textAlign="center">
        <Text fontSize="sm" color="gray.400">
          © 2025 YourCompany
        </Text>
      </Box>
    </Box>
  );
};

export default SlideBar;
