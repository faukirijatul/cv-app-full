import React, { useEffect, useState } from "react";
import { useFormArray, useFormInput } from "../hooks/useInputForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const ExperienceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const isEdit = !!id;

  const title = useFormInput("");
  const date = useFormInput("");
  const company = useFormInput("");
  const description = useFormArray([]);

  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:5000/api/experiences/${id}`
          );

          description.setValue(response.data.data.description);
          title.setValue(response.data.data.title);
          date.setValue(response.data.data.date);
          company.setValue(response.data.data.company);
        } catch (error) {
          console.error("Error fetching experience details:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDetails();
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedDescription = description.value.filter(
      (item) => item.trim() !== ""
    );

    const payload = {
      title: title.value.trim(),
      company: company.value.trim(),
      date: date.value.trim(),
      description: cleanedDescription,
    };

    const request = isEdit
      ? axios.put(`http://localhost:5000/api/experiences/${id}`, payload)
      : axios.post("http://localhost:5000/api/experiences", payload);

    request
      .then(() => navigate("/"))
      .catch((err) => console.error("Error saving experience:", err));
  };

  const addBullet = () => description.addItem("");

  const removeBullet = (index) => {
    if (description.value.length > 1) {
      description.removeItem(index);
    }
  };

  if (isLoading) {
    return (
      <p style={{ textAlign: "center", padding: "100px 0", color: "#60a5fa" }}>
        Memuat data...
      </p>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        py: { xs: 4, md: 8 },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 560,
          mx: "auto",
          px: { xs: 3, sm: 5 },
          py: 5,
          backgroundColor: "rgba(30, 41, 59, 0.65)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          border: "1px solid rgba(59, 130, 246, 0.18)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.55)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#60a5fa",
            textAlign: "center",
            mb: 5,
          }}
        >
          {isEdit ? "Edit Pengalaman Kerja" : "Tambah Pengalaman Kerja"}
        </Typography>

        <TextField
          label="Jabatan"
          fullWidth
          variant="outlined"
          {...title}
          margin="normal"
          required
          autoFocus
          sx={{ mb: 3 }}
        />

        <TextField
          label="Perusahaan"
          fullWidth
          variant="outlined"
          {...company}
          margin="normal"
          required
          sx={{ mb: 3 }}
        />

        <TextField
          label="Periode"
          fullWidth
          variant="outlined"
          {...date}
          margin="normal"
          required
          sx={{ mb: 4 }}
        />

        <Divider sx={{ my: 4, borderColor: "rgba(147, 197, 253, 0.2)" }} />

        <Typography
          variant="subtitle1"
          sx={{
            color: "#94a3b8",
            fontWeight: 500,
            mb: 2,
          }}
        >
          Deskripsi
        </Typography>

        {description?.value.map((bullet, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <TextField
              placeholder={`Poin ${index + 1}...`}
              fullWidth
              variant="outlined"
              size="small"
              value={bullet}
              onChange={(e) => description.updateItem(index, e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(15, 23, 42, 0.4)",
                },
              }}
            />
            {description.value.length > 1 && (
              <IconButton
                onClick={() => removeBullet(index)}
                sx={{ ml: 1, color: "#94a3b8" }}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addBullet}
          sx={{
            mt: 1,
            mb: 4,
            borderColor: "#60a5fa",
            color: "#60a5fa",
            "&:hover": {
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.08)",
            },
          }}
          fullWidth
        >
          Tambah Deskripsi
        </Button>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{
            py: 1.8,
            background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)",
            fontSize: "1.1rem",
            fontWeight: 600,
            borderRadius: "12px",
            boxShadow: "0 4px 14px rgba(59, 130, 246, 0.35)",
            "&:hover": {
              background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
              boxShadow: "0 6px 20px rgba(59, 130, 246, 0.5)",
            },
          }}
        >
          {isEdit ? "Update Pengalaman" : "Simpan Pengalaman"}
        </Button>

        <Button
          variant="text"
          onClick={() => navigate("/")}
          sx={{
            mt: 3,
            color: "#94a3b8",
            display: "block",
            mx: "auto",
            textTransform: "none",
          }}
        >
          Batal / Kembali
        </Button>
      </Box>
    </Box>
  );
};

export default ExperienceForm;
