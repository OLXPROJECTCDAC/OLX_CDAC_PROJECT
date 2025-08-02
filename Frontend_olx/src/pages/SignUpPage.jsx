import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "profilePic" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data: ", formData);
    // TODO: send data to backend here
    navigate("/");
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100">
      <Box
        as="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        bg="white"
        p={6}
        rounded="md"
        shadow="md"
        w="350px"
      >
        <VStack spacing={4}>
          <Heading size="md" textAlign="center">
            Sign Up
          </Heading>

          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            isRequired
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            isRequired
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            isRequired
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            isRequired
          />
          <Input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            isRequired
          />
          <Input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
            variant="unstyled"
            p={1}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
          />

          <Button type="submit" colorScheme="blue" w="full">
            Register
          </Button>
          <Button variant="link" w="full" onClick={() => navigate("/")}>
            Already have an account? Login
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Signup;
