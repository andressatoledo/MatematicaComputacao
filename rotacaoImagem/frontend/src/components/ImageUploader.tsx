import React, { useState } from "react";

function ImageUploadRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [originalFilename, setOriginalFilename] = useState<string>("");
  const [rotatedFilename, setRotatedFilename] = useState<string>("");
  const [angle, setAngle] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const backendUrl = "http://localhost:3001"; // URL do backend

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage("");
      setOriginalFilename("");
      setRotatedFilename("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Selecione um arquivo antes de enviar.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${backendUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setOriginalFilename(data.filename);
        setMessage("Upload realizado com sucesso!");
      } else {
        setMessage("Erro no upload: " + data.error);
      }
    } catch (error) {
      setMessage("Erro na requisição: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleRotate = async () => {
    if (!originalFilename) {
      setMessage("Faça o upload antes de rotacionar.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${backendUrl}/api/rotate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: originalFilename, degrees: angle }),
      });

      const data = await res.json();

      if (res.ok) {
        setRotatedFilename(data.filename);
        setMessage("Imagem rotacionada com sucesso!");
      } else {
        setMessage("Erro ao rotacionar: " + data.error);
      }
    } catch (error) {
      setMessage("Erro na requisição: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Rotação de imagem</h2>

      <div style={styles.uploadSection}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          style={styles.fileInput}
        />
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          style={{
            ...styles.button,
            backgroundColor: loading || !file ? "#ccc" : "orange",
          }}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>

      <div style={styles.rotateSection}>
        <label style={styles.label}>
          Ângulo de rotação (graus):
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            disabled={loading}
            style={styles.angleInput}
          />
        </label>
        <button
          onClick={handleRotate}
          disabled={loading || !originalFilename}
          style={{
            ...styles.button,
            backgroundColor: loading || !originalFilename ? "#ccc" : "orange",
          }}
        >
          {loading ? "Processando..." : "Rotacionar"}
        </button>
      </div>

      <p style={styles.message}>{message}</p>

      <div style={styles.imageContainer}>
        {originalFilename && (
          <div style={styles.imageSection}>
            <h4 style={styles.imageHeading}>Imagem original</h4>
            <img
              src={`${backendUrl}/uploads/${originalFilename}`}
              alt="Original"
              style={styles.image}
            />
          </div>
        )}
        {rotatedFilename && (
          <div style={styles.imageSection}>
            <h4 style={styles.imageHeading}>Imagem rotacionada</h4>
            <img
              src={`${backendUrl}/rotated/${rotatedFilename}`}
              alt="Rotacionada"
              style={styles.image}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center" as const,
    color: "black"
  },
  uploadSection: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    color: "black"
  },
  fileInput: {
    flex: "1",
    marginRight: "10px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  rotateSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  },
  label: {
    flex: "1",
    marginRight: "10px",
    fontSize: "16px",
    color: "black"
  },
  angleInput: {
    width: "60px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    
  },
  message: {
    margin: "20px 0",
    textAlign: "center" as const,
    color: "orange",
  },
  imageContainer: {
    display: "flex",
    gap: "20px",
  },
  imageSection: {
    flex: "1",
    textAlign: "center" as const,
  },
  imageHeading: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "black"
  },
  image: {
    maxWidth: "100%",
    maxHeight: "300px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
};

export default ImageUploadRotate;
