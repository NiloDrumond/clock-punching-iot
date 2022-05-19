import React from "react";
import { Badge, HStack, ListItem, Text, VStack } from "@chakra-ui/react";
import { Employee } from "@/modules/shared/interfaces";
import moment from "moment";

const EmployeeItem: React.FC<Employee> = ({ name, atOffice, timestamps }) => {
  return (
    <ListItem
      p={4}
      border="gray.100"
      borderWidth="2px"
      borderStyle="solid"
      rounded="md"
      mb={2}
      w="full"
    >
      <VStack spacing={2} alignItems="flex-start">
        <Text fontWeight={600}>{name}</Text>
        <Badge colorScheme={atOffice ? "green" : "orange"}>
          {atOffice ? "No escritório" : "Fora do escritório"}
        </Badge>
        {atOffice && timestamps.length === 1 && (
          <Text>
            Entrou às {moment(timestamps[timestamps.length - 1]).format("LT")}
          </Text>
        )}
        {!atOffice && timestamps.length > 1 && (
          <Text>
            Entrou às {moment(timestamps[timestamps.length - 2]).format("LT")}
          </Text>
        )}
        {!atOffice && timestamps.length > 1 && (
          <Text>
            Saiu às {moment(timestamps[timestamps.length - 1]).format("LT")}
          </Text>
        )}
      </VStack>
    </ListItem>
  );
};

export default EmployeeItem;
