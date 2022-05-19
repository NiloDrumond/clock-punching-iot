import EmployeeItem from "@/components/EmployeeItem/EmployeeItem";
import { config } from "@/config";
import api from "@/modules/shared/http/ApiHelper";
import { Employee } from "@/modules/shared/interfaces";
import { validateResponse } from "@/utils/validateResponse";
import { Center, Heading, List, Spinner, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import { useAuthenticated } from "../hooks/Auth/useAuthenticated";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  useAuthenticated();
  const { data, isValidating } = useSWR<Employee[]>(
    config.EMPLOYEES_URL,
    async (url) => {
      const response = await api.get<Employee[]>({ url });
      console.log(response);
      if (validateResponse(response)) {
        return response.body;
      }
      return [];
    },
    { refreshInterval: 5000 }
  );

  console.log(data);

  return (
    <Center h="100vh" bg="gray.50">
      <VStack bg="white" boxShadow={"lg"} p={8} rounded="lg">
        {isValidating && <Spinner />}
        {!isValidating && data && data.length > 0 ? (
          <List>
            {data.map((item) => (
              <EmployeeItem key={item.cpf} {...item} />
            ))}
          </List>
        ) : (
          <Heading>Nenhum empregado encontrado</Heading>
        )}
      </VStack>
    </Center>
  );
};

export default Home;
