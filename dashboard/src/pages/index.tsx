import EmployeeItem from "@/components/EmployeeItem/EmployeeItem";
import { config } from "@/config";
import api from "@/modules/shared/http/ApiHelper";
import { Employee } from "@/modules/shared/interfaces";
import { validateResponse } from "@/utils/validateResponse";
import { Center, Heading, List, Spinner, VStack } from "@chakra-ui/react";
import moment from "moment";
import type { NextPage } from "next";
import useSWR from "swr";
import { useAuthenticated } from "../hooks/Auth/useAuthenticated";

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
    { refreshInterval: 5000, revalidateOnFocus: true }
  );

  console.log(data);

  return (
    <Center h="100vh" bg="gray.50">
      <VStack bg="white" boxShadow={"lg"} p={8} rounded="lg">
        <Heading mb={2}>{moment(new Date()).format("LL [-] dddd")}</Heading>
        {isValidating && <Spinner />}
        {!isValidating && data && data.length > 0 ? (
          <List w="80%">
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
