import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import PropTypes from "prop-types";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        fontFamily="Source Sans Pro,sans-serif"
        fontSize="32px"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        fontSize="16px"
        fontWeight="400"
        fontFamily="Source Sans Pro,sans-serif"
        color={colors.greenAccent[400]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
export default Header;
