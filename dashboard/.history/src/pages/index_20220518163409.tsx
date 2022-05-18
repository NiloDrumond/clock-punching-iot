import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAuthenticated } from "../hooks/Auth/useAuthenticated";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  useAuthenticated();

  return (
    <VStack>
      )
};

export default Home;
