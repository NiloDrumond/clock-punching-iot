import React from "react";
import { ListItem, Text } from "@chakra-ui/react";
import { Employee } from "@/modules/shared/interfaces";

const EmployeeItem: React.FC<Employee> = ({ name }) => {
  return (
    <ListItem
      p={4}
      border="gray.100"
      borderWidth="2px"
      borderStyle="solid"
      rounded="md"
      mb={2}
    >
      <Text>{name}</Text>
    </ListItem>
  );
};

export default EmployeeItem;
