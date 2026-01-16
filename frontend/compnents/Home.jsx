import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/experiences`
        );

        setExperiences(response.data.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/experiences/${id}`);
    setExperiences(experiences.filter((exp) => exp._id !== id));
  }

  if (isLoading) {
    return (
      <p style={{ textAlign: "center", padding: "100px 0", color: "#60a5fa" }}>
        Memuat data...
      </p>
    );
  }

  return (
    <main className="container">
      <div className="left-panel">
        <div className="profile-img-wrapper">
          <img
            src="profile.png"
            alt="Fauki Rijatul H"
            className="profile-img"
          />
        </div>
        <h1>Fauki Rijatul H</h1>
        <p className="title">Software Engineer</p>
        <div className="contact-info">
          <p>
            <strong>Bogor, Jawa Barat</strong>
          </p>
          <p>Indonesia</p>
        </div>
        <div className="section">
          <h3>Hobi & Minat</h3>
          <ul>
            <li>Belajar teknologi terbaru</li>
            <li>Jalan-jalan & street photography</li>
            <li>Membaca buku teknologi, agama & psikologi</li>
            <li>Nongkrong sambil ngopi & ngoding di cafe</li>
          </ul>
        </div>
        <div className="section">
          <h3>Kontak</h3>
          <p>
            Email:{" "}
            <a href="mailto:faukirijatul42@gmail.com">
              faukirijatul42@gmail.com
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/faukirijatulh" target="_blank">
              linkedin.com/in/faukirijatulh
            </a>
          </p>
          <p>
            GitHub:{" "}
            <a href="https://github.com/faukirijatul" target="_blank">
              github.com/faukirijatul
            </a>
          </p>
        </div>
      </div>

      <div className="right-panel">
        <div className="header-gradient"></div>
        <section className="about">
          <h2>Tentang Saya</h2>
          <p>
            Software Engineer dengan pengalaman lebih dari 2 tahun yang sangat
            antusias membangun aplikasi web modern, scalable, dan mudah
            dipelihara. Saya menyukai tantangan teknis, clean code, serta terus
            belajar hal-hal baru setiap hari.
          </p>
          <p>
            Saat ini fokus pada ekosistem JavaScript/TypeScript (React, Next.js,
            Node.js), arsitektur cloud, serta optimalisasi performa. Di luar
            coding, saya senang menjelajah tempat baru dan mengabadikan momen
            lewat fotografi.
          </p>
        </section>
        <section className="experience">
          <div className="experience-header">
            <h2>Pengalaman Kerja</h2>
            <Link to="/form" className="add-btn">
              +
            </Link>
          </div>

          {experiences.length === 0 ? (
            <p
              style={{
                color: "#94a3b8",
                textAlign: "center",
                padding: "40px 0",
              }}
            >
              Belum ada pengalaman kerja ditambahkan.
            </p>
          ) : (
            experiences.map((exp) => (
              <div key={exp._id} className="exp-item">
                <div className="exp-header">
                  <h3>{exp.title}</h3>
                  <div className="exp-actions">
                    <span className="exp-date">{exp.date}</span>
                    <Link to={`/form/${exp._id}`} className="edit-btn">
                      <EditIcon fontSize="small" />
                    </Link>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="delete-btn"
                      title="Hapus"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </button>
                  </div>
                </div>
                <p className="company">{exp.company}</p>
                <ul>
                  {exp.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </section>
        <section className="education">
          <h2>Pendidikan</h2>
          <div className="edu-item">
            <h3>Sarjana Informatika</h3>
            <p>Universitas Insan Cita Indonesia • 2023 - Sekarang</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
