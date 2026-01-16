import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#1e40af",
      contrastText: "#ffffff",
    },

    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },

    text: {
      primary: "#e2e8f0",
      secondary: "#94a3b8",
    },

    divider: "rgba(226, 232, 240, 0.12)",
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(30, 41, 59, 0.6)",
            backdropFilter: "blur(4px)",
            borderRadius: "12px",
            "& fieldset": {
              borderColor: "rgba(147, 197, 253, 0.3)",
            },
            "&:hover fieldset": {
              borderColor: "#60a5fa",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3b82f6",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#94a3b8",
          },
          "& .MuiInputBase-input": {
            color: "#e2e8f0",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 20px",
        },
        contained: {
          background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
          "&:hover": {
            background: "linear-gradient(90deg, #2563eb, #3b82f6)",
            boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#94a3b8",
          "&:hover": {
            color: "#60a5fa",
          },
        },
      },
    },
  },
});

export default theme;
