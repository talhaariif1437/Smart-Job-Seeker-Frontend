import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./PrograssCircle";
import PropTypes from "prop-types";

const StatBox = ({ title, subtitle, icon, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const percentageIncrease = parseFloat(
    increase.replace("+", "").replace("%", "")
  );

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle percentage={percentageIncrease} size={40} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[550] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

StatBox.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  increase: PropTypes.string.isRequired,
};

export default StatBox;
