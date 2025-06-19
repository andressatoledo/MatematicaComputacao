import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import App from "./App.tsx";
import Filtro from "./components/Filtro";
import Mapa from "./components/Mapa";
import { FiltroProvider } from "./context/FiltroContext";
import { CSSProperties } from "react";

const containerStyle: CSSProperties = {
  display: "flex",
  height: "100vh",
  width: "100vw",
};

const filtroStyle: CSSProperties = {
  width: "300px",
  backgroundColor: "#1e1e1e",
  padding: "16px",
  overflowY: "auto",
  color: "white",
};

const mapaWrapperStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const mapaStyle: CSSProperties = {
  flex: 1,
  width: "100%",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={containerStyle}>
      <div style={filtroStyle}>
        <FiltroProvider>
          <Filtro />
        </FiltroProvider>
      </div>
      <Mapa />
    </div>
  </StrictMode>
);
