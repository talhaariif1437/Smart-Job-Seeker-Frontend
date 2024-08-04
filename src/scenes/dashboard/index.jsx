
import { useState, useEffect } from "react";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import MainPage from "../../Components/MainPage/mainPage";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import StatBox from "../../Components/StatBox";
import Header from "../../Components/Header";
import LineChart from "../../Components/LineChart";
import Timelined from "../../Components/Timeline";
import ProgressCircle from "../../Components/PrograssCircle";
import BarChart from "../../Components/BarChart";
import axios from "axios";
import GeographyChart from "../../Components/GeographyChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [companyCount, setCompanyCount] = useState(null); 
  const [jobSeekerCount, setJobSeekerCount] = useState(null); 
  const [jobPostedCount, setJobPostedCount] = useState(null); 
  const token = localStorage.getItem("token");


  const statBoxData = [
    {
      title: companyCount !== null ? companyCount.toString() : "Loading...",
      subtitle: "Companies",
      progress: 0.75,
      increase: "+60%",
      icon: (
        <BusinessIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
      ),
    },
    {
      title: jobPostedCount !== null ? jobPostedCount?.toString() : "Loading...",
      subtitle: "Total Jobs Posted",
      progress: 0.5,
      increase: "+30%",
      icon: (
        <WorkIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
    },
    {
      title: jobSeekerCount !== null ? jobSeekerCount.toString() : "Loading...",
      subtitle: "Job Seekers",
      progress: 0.3,
      increase: "+5%",
      icon: (
        <PersonAddIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
    },
    {
      title: "1,325",
      subtitle: "Traffic Received",
      progress: 0.8,
      increase: "+43%",
      icon: (
        <TrafficIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
    },
  ];

  useEffect(() => {
    axios.get("https://smartjobseeker-fe218b533e4f.herokuapp.com/api/user/companyList")
      .then((response) => {
        // Assuming response.data is an array of companies
        setCompanyCount(response.data.users.length);
      })
      .catch((error) => {
        console.error("Error fetching company list:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("https://smartjobseeker-fe218b533e4f.herokuapp.com/api/user/jobSeekerList")
      .then((response) => {
        // Assuming response.data is an array of companies
        setJobSeekerCount(response.data.users.length);
      })
      .catch((error) => {
        console.error("Error fetching job seeker list:", error);
      });
  }, []);
  useEffect(() => {
    axios.get("https://smartjobseeker-fe218b533e4f.herokuapp.com/api/job/jobsList"
      ,{
        headers: {
          'Content-Type': 'multipart/form-data', // Use multipart/form-data for image uploads
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        console.log(response)
        // Assuming response.data is an array of companies
        setJobPostedCount(response.data.result.data.length);
        console.log("Talha posted jobs are here",setJobPostedCount);
      })
      .catch((error) => {
        console.error("Error fetching company list:", error);
      });
  }, []);

  return (
    <MainPage>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
        {/* GRID & CHARTS */}
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px" >
          {/* Stat Boxes */}
          {statBoxData.map((data, index) => (
        <Box
          height="20vh"
          borderRadius="5px"
          key={index}
          gridColumn={{ xs: "span 12", md: "span 3" }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox {...data} />
        </Box>
      ))}
          {/* Revenue Generated */}
          <Box
            gridColumn={{ xs: "span 12", md: "span 8" }}
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Revenue Generated
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  $59,342.32
                </Typography>
              </Box>
              <IconButton mt="15px">
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
            <Box height="250px" width="100%">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
          {/* Timeline */}
          <Box
            gridColumn={{ xs: "span 12", md: "span 4" }}
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Timeline
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="15px"
            >
              <Timelined />
            </Box>
          </Box>
          {/* Campaign */}
          <Box
            gridColumn={{ xs: "span 12", md: "span 4" }}
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle percentage={45} size={125} />

              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                $48,352 revenue generated
              </Typography>
              <Typography textAlign="center">
                Includes extra misc expenditures and costs
              </Typography>
            </Box>
          </Box>
          {/* Sales Quantity */}
          <Box
            gridColumn={{ xs: "span 12", md: "span 4" }}
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Sales Quantity
            </Typography>
            <Box height="250px" width="100%" mt="20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
          {/* Geography Based Traffic */}
          <Box
            gridColumn={{ xs: "span 12", md: "span 4" }}
            backgroundColor={colors.primary[400]}
            padding="30px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
            >
              Geography Based Traffic
            </Typography>
            <Box height="200px" width="100%" mt="20px">
              <GeographyChart isDashboard={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    </MainPage>
  );
};

export default Dashboard;
