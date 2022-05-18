import EmployeeItem from "@/components/EmployeeItem/EmployeeItem";
import { config } from "@/config";
import api from "@/modules/shared/http/ApiHelper";
import { Employee } from "@/modules/shared/interfaces";
import { validateResponse } from "@/utils/validateResponse";
import { Center, List, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import { useAuthenticated } from "../hooks/Auth/useAuthenticated";
import styles from "../styles/Home.module.css";

const MOCK: Employee[] = [
  { id: "1", name: "Fulano", role: "manager" },
  { id: "2", name: "Deutrano", role: "worker" },
];

const Home: NextPage = () => {
  useAuthenticated();
  const { data } = useSWR<Employee[]>(
    config.EMPLOYEES_URL,
    async (url) => {
      const response = await api.get<Employee[]>({ url });
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
        <List>
          {MOCK.map((item) => (
            <EmployeeItem key={item.id} {...item} />
          ))}
        </List>
      </VStack>
    </Center>
  );
};

export default Home;
