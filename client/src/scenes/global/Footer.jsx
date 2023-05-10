import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const { palette: { neutral } } = useTheme();
  return (
      <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
        <Box
            width="85%"
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            rowGap="30px"
            columnGap="clamp(20px, 30px, 40px)"
        >
          <Box width="clamp(10%, 20%, 30%)">
            <Box
                onClick={() => {
                  navigate("/");
                }}
                sx={{
                  "&:hover": { cursor: "pointer" },
                  color: shades.secondary[500],
                  mb: "20px",
                  fontWeight: "bold"
                }}
            >
              BAKE MY DAY
            </Box>
            <div>
              Selling baked sweets since 2015
            </div>
          </Box>

          <Box>
            <Typography variant="h4" fontWeight="bold" mb="30px">
              About Us
            </Typography>
            <Typography mb="30px">Careers</Typography>
            <Typography mb="30px">Terms & Conditions</Typography>
            <Typography mb="30px">Privacy Policy</Typography>
          </Box>

          <Box>
            <Typography variant="h4" fontWeight="bold" mb="30px">
              Customer Care
            </Typography>
            <Typography mb="30px">Help Center</Typography>
            <Typography mb="30px">Track Your Order</Typography>
            <Typography mb="30px">Returns & Refunds</Typography>
          </Box>

          <Box width="clamp(10%, 20%, 30%)">
            <Typography variant="h4" fontWeight="bold" mb="30px">
              Contact Us
            </Typography>
            <Typography mb="30px">Str. Mureș 123, Timișoara 300425</Typography>
            <Typography mb="30px">Email: bakemyday@gmail.com</Typography>
            <Typography mb="30px">Phone: +40 712 345 678</Typography>
          </Box>
        </Box>
      </Box>
  );
}

export default Footer;
