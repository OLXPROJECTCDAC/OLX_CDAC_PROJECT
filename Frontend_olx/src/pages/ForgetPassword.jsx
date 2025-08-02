<<<<<<< HEAD
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

function ForgetPassword() {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Mobile Number: ", mobileNumber);
    // You can trigger OTP logic here
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
          <Heading size="sm" textAlign="center">
            Enter Mobile Number
          </Heading>

          <Input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            isRequired
          />

          <Button type="submit" colorScheme="blue" w="full">
            Send OTP
          </Button>

          <Button variant="link" w="full" onClick={() => navigate("/")}>
            Login Page
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default ForgetPassword;
=======
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
function ForgetPassword(){
    const [mobileNumber,setMobileNumber] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Mobile Number:  ",mobileNumber);
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form className="p-4 bg-white rounded shadow" style={{ width: '300px' }} onSubmit={handleLogin}>
                <h3 className="mb-4 text-center">Enter Mobile Number</h3>
                <input type="tel" name="mobileNumber" className="form-control mb-3" placeholder="Mobile Number" required />
                <button className="btn btn-primary w-100 mb-2" type="submit">Send OTP</button>
                <button className="btn btn-link w-100" type="button" onClick={() => navigate('/login')}>
                Login Page
                </button>
            </form>
        </div>
    );
}
export default ForgetPassword;
>>>>>>> dev
