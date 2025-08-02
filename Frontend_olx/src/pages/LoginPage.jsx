import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Input,
  Heading,
  VStack,
} from "@chakra-ui/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100">
      <Box
        as="form"
        onSubmit={handleLogin}
        bg="white"
        p={6}
        rounded="md"
        shadow="md"
        w="300px"
      >
        <VStack spacing={4}>
          <Heading size="md" textAlign="center">
            Login
          </Heading>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />
          <Button colorScheme="blue" type="submit" w="full">
            Login
          </Button>
          <Button variant="link" w="full" onClick={() => navigate("/signup")}>
            New user? Sign Up
          </Button>
          <Button variant="link" w="full" onClick={() => navigate("/forgetPassword")}>
            Forget Password
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default LoginPage;
