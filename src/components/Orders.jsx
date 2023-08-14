import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as randomId } from "uuid";
import NavBar2 from "./NavBar2";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Button,
  Th,
  Select,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { getAllOrders } from "../redux/actions";
import {Link} from "react-router-dom";

function OrdersData() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [ordersPerPage, setOrdersPerPage] = useState(15);
  // const indexOfLastOrder = currentPage * ordersPerPage;
  // const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  // const ordersStatus = ["success", "failed", "in process"];
  // const [status, setStatus] = useState("");
  // const [mailSearch, setMailSearch] = useState("");

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <Box bg={'blue.900'} h={'100vh'} pl={'1%'} pr={'1%'}>
      <NavBar2></NavBar2>
      <TableContainer bg={"gray.200"} overflowY="auto" maxHeight="780px">
        <Table
          overflowY="auto"
          maxHeight="230px"
          variant="striped"
          colorScheme="blue.900"
        >
          <TableCaption></TableCaption>
          <Thead>
            <Tr>
              <Th>Id Usuario</Th>
              <Th>Id Orden</Th>
              <Th>Id Producto</Th>
              <Th isNumeric>Cantidad</Th>
              <Th isNumeric>Cantidad Total</Th>
              <Th>Estado</Th>
            </Tr>
          </Thead>
          {orders !== undefined && orders.length > 0 && (
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.userId}</Td>
                  <Td>{order.id}</Td>
                  <Td>
                    {" "}
                    {order.detailorders.map((product) => {
                      return (
                        <Box
                          key={randomId()}
                          className={"admin-purchases-detail"}
                        >
                          <p>{product.productId}</p>
                        </Box>
                      );
                    })}
                    {order.productId}
                  </Td>
                  <Td isNumeric>
                    {order.detailorders.map((product) => {
                      return (
                        <Box
                          key={randomId()}
                          className={"admin-purchases-detail"}
                        >
                          <p>{product.quantity}</p>
                        </Box>
                      );
                    })}
                    {order.quantity}
                  </Td>
                  <Td isNumeric>{order.totalprice}</Td>
                  {/* <Td>{order.order_status}</Td> */}
                  {/* <Td w={'15%'}>
                    <Select placeholder='Estado de la Orden' bg={'blue.200'}>
                    <option>Entregado</option>
                    <option>En Proceso</option>
                    </Select>
                  </Td> */}
                  <Td>{order.order_status}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      <Link to={"/admin"} href={"/admin"}>
        <Button  _hover={'none'} bg={"white"} color={"blue.900"} ml={'48%'} mt={'0.5%'}>
          Volver
        </Button>
      </Link>
    </Box>
  );
}

export default OrdersData;
