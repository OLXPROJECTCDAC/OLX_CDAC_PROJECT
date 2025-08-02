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

const UpdateUser = () => {
  const navigate = useNavigate();

  const existingUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    profilePic: null,
  };

  const [formData, setFormData] = useState(existingUser);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "profilePic" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Data: ", formData);
    // TODO: Send data to backend here
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
            Update User
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
            Save Changes
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default UpdateUser;
