import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar2 from "./NavBar2";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Button,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";

function UsersData() {
  const users = useSelector((state) => state.users);

  return (
    <Box bg={'blue.900'} h={'100vh'} pl={'1%'} pr={'1%'}>
        <NavBar2></NavBar2>
    <TableContainer bg={"gray.200"} overflowY="auto" maxHeight="780px">
      <Table
        variant="striped"
        colorScheme="blue.900"
        overflowY="auto"
        maxHeight="230px"
      >
        <Thead>
          <Tr>
            <Th>Id Usuario</Th>
            <Th>Nombre</Th>
            <Th>Apellido</Th>
            <Th>Genero</Th>
            <Th>Email</Th>
            <Th>Rol</Th>
            <Th isNumeric>Celular</Th>
          </Tr>
        </Thead>
        {users !== undefined && users.length > 0 && (
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.first_name}</Td>
                <Td>{user.last_name}</Td>
                <Td>{user.gender}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role_id}</Td>
                <Td isNumeric>{user.mobile}</Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </TableContainer>
    <Link to={"/admin"} href={"/admin"}>
            <Button _hover={'none'} bg={"white"} color={"blue.900"} ml={'48%'} mt={'0.5%'}>
              Volver
            </Button>
          </Link>
    </Box>
  );
}

export default UsersData;
