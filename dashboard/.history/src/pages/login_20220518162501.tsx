import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useAuth } from "../hooks/Auth/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";


Import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { SignInData } from "../hooks/Auth/Auth.types";
import React from "react";

const validationSchema = yup.object().shape({
  username: yup.string().required("Usuário é obrigatório"),
  password: yup.string().required("Senha é obrigatório"),
});
const formOptions = { resolver: yupResolver(validationSchema) };

// get functions to build form with useForm() hook

const Login: NextPage = () => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInData>(formOptions);

  const onSubmit = React.useCallback(
    (data: SignInData) => {
      signIn(data);
    },
    [signIn]
  );

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>
            Faça login para ter acesso ao Dashboard
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
