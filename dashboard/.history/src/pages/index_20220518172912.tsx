import { config } from "@/config";
import api from "@/modules/shared/http/ApiHelper";
import { Employee } from "@/modules/shared/interfaces";
import { Center, List } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import { useAuthenticated } from "../hooks/Auth/useAuthenticated";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  useAuthenticated();
  const {} = useSWR<Employee[]>(
    config.EMPLOYEES_URL,
    async (url) => {
      return api.get<Employee[]>({ url });
    },
    { refreshInterval: 5000 }
  );

  return (
    <Center>
      <List></List>
    </Center>
  );
};

export default Home;
