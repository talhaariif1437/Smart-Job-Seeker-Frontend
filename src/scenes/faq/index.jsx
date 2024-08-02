import { Box, useTheme } from "@mui/material";
import Header from "../../Components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MainPage from "../../Components/MainPage/mainPage";
import { tokens } from "../../theme";

const Faq = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MainPage>
      <Box m="20px">
        <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

        {/* FAQ Accordion Items */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              What payment methods do you accept?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We accept payments via credit/debit cards, PayPal, and bank
              transfers.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              How can I track my order?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Once your order is shipped, you will receive a tracking number via
              email. You can use this tracking number to monitor the status of
              your shipment.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Can I cancel or modify my order?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Orders can be canceled or modified before they are processed for
              shipping. Please contact our customer support for assistance.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              What is your return policy?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We offer a 30-day return policy for most products. Items must be
              unused and in their original packaging for a full refund.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              How can I contact customer support?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You can reach our customer support team via email at
              support@example.com or by phone at +123456789.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </MainPage>
  );
};

export default Faq;
