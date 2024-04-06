import React, { useState } from "react";
import { ChakraProvider, Box, VStack, FormControl, FormLabel, Input, Button, Heading, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [bankDetails, setBankDetails] = useState("");
  const [cardDetails, setCardDetails] = useState("");

  const apiUrl = "https://backengine-6g39.fly.dev";

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Failed",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while logging in.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, bank_details: bankDetails, card_details: cardDetails }),
      });
      if (response.ok) {
        toast({
          title: "Signup Successful",
          description: "You have successfully signed up.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsSignup(false);
      } else {
        const data = await response.json();
        toast({
          title: "Signup Failed",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while signing up.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Box p={8} maxW="sm" borderWidth={1} borderRadius={8} boxShadow="lg" m="20px auto">
        <VStack spacing={4} align="flex-start">
          <Heading>{isSignup ? "Signup" : "Login"}</Heading>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          {isSignup && (
            <>
              <FormControl isRequired>
                <FormLabel>Bank Details</FormLabel>
                <Input type="text" value={bankDetails} onChange={(e) => setBankDetails(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Card Details</FormLabel>
                <Input type="text" value={cardDetails} onChange={(e) => setCardDetails(e.target.value)} />
              </FormControl>
            </>
          )}
          <Button leftIcon={isSignup ? <FaUserPlus /> : <FaSignInAlt />} colorScheme="teal" width="full" isLoading={isLoading} onClick={isSignup ? handleSignup : handleLogin}>
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button variant="link" colorScheme="blue" width="full" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
