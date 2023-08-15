import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Doughnut, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LineElement,
  LinearScale,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
);

export default function PieChart() {
  const orders = useSelector((state) => state.orders);
  const allProducts = useSelector((state) => state.allProducts);

  const categories = allProducts.map((product) => product.category);

  const categoryCount = {};
  categories.forEach((category) => {
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const sortedCategories = Object.entries(categoryCount).sort(
    (a, b) => b[1] - a[1]
  );

  const topCategoriesWithCount = sortedCategories.slice(0, 3).map(category => {
    return {
      category: category[0],
      count: category[1]
    };
  });
  
  console.log(topCategoriesWithCount);

  const categoria1 = topCategoriesWithCount[0]
  const categoria2 = topCategoriesWithCount[1]
  const categoria3 = topCategoriesWithCount[2]

  console.log(categoria1)
  


  const [cantidadDelivered, setCantidadDelivered] = useState(0);
  const [cantidadInProcess, setCantidadInProcess] = useState(0);

  useEffect(() => {
    let deliveredCount = 0;
    let inProcessCount = 0;

    orders.forEach((orden) => {
      if (orden.order_status === "Delivered") {
        deliveredCount++;
      } else if (orden.order_status === "in process") {
        inProcessCount++;
      }
    });

    setCantidadDelivered(deliveredCount);
    setCantidadInProcess(inProcessCount);
  }, [orders]);

  const pieData = {
    labels: ["Ventas Entregadas", "Ventas en Proceso"],
    datasets: [
      {
        label: "Count",
        data: [cantidadDelivered, cantidadInProcess],
        backgroundColor: ["black", "white"],
        // borderColor: ['black', 'red'],
      },
    ],
  };
  const barData = {
    labels: [categoria1.category, categoria2.category, categoria3.category],
    datasets: [
      {
        label: "Juguetes por Categoria",
        data: [categoria1.count, categoria2.count, categoria3.count],
        backgroundColor: ["black", "white"],
        // borderColor: ['black', 'red'],
      },
    ],
  };
  // const lineData = {
  //   labels: ["January", "February", "March"],
  //   datasets: [
  //     {
  //       label: "Sales per Month",
  //       data: [3, 6, 5],
  //       backgroundColor: ["black", "white"],
  //       fill: true,
  //       tension: 0.4,
  //       pointBorderColor: "white",
  //       borderColor: ["white", "red"],
  //     },
  //   ],
  // };

  const options = {};

  const optionsLine = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {},
    },
  };

  return (
    <div>
      <Box>
        <Flex>
          <Box boxSize={"240px"}>
            <Doughnut data={pieData} options={options}></Doughnut>
          </Box>
          <Box boxSize={"500px"}>
            <Bar data={barData} option={options}></Bar>
          </Box>
          {/* <Box boxSize={"400px"}>
            <Line data={lineData} options={optionsLine}></Line>
          </Box> */}
        </Flex>
      </Box>
    </div>
  );
}
