import { Button, InputBase } from "@mui/material";
import theme from "../../../AppTheme";
import { styled } from "@mui/system";

export const StyledTextArea = styled(InputBase)`
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  color: ${theme.palette.text.primary};
  background-color: ${theme.palette.background.paper};
  border-radius: 0.5rem;
  font-size: 1.5rem;
  padding: 1rem;
  &:focus {
    outline: none;
  }
`;

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0DB5F9",
  color: "#FFFFFF",
  borderRadius: "0.5rem",
  fontSize: "1.2rem",
  padding: "0.5rem",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "&:focus": {
    outline: "none",
  },
  width: "10vw",
  marginRight: "1rem",
}));

export const StyledDeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FF7E04",
  color: "#fff",
  borderRadius: "0.5rem",
  fontSize: "1.2rem",
  padding: "0.5rem",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "&:focus": {
    outline: "none",
  },
  width: "10vw",
  marginRight: "1rem",
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#CF3403",
  color: "#fff",
  borderRadius: "0.5rem",
  fontSize: "1.2rem",
  padding: "0.5rem",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "&:focus": {
    outline: "none",
  },
  width: "10vw",
  marginRight: "1rem",
}));
