import { Box } from "@mui/material";
import Header from "../../Components/Header";
import BarChart from "../../Components/BarChart";
import MainPage from "../../Components/MainPage/mainPage";

const Bar = () => {
  return (
    <MainPage>
      <Box m="20px">
        <Header title="Bar Chart" subtitle="Simple Bar Chart" />
        <Box height="75vh">
          <BarChart />
        </Box>
      </Box>
    </MainPage>
  );
};

export default Bar;
