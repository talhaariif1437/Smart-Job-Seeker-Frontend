import { Box } from "@mui/material";
import Header from "../../Components/Header";
import LineChart from "../../Components/LineChart";
import MainPage from "../../Components/MainPage/mainPage";

const Line = () => {
  return (
    <MainPage>
      <Box m="20px">
        <Header title="Line Chart" subtitle="Simple Line Chart" />
        <Box height="75vh">
          <LineChart />
        </Box>
      </Box>
    </MainPage>
  );
};

export default Line;
