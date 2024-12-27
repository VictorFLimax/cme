import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Substitua pela URL do seu backend

// Função para buscar rastreabilidade
export const fetchTraceability = async (serial = "") => {
  const url = serial ? `${API_BASE_URL}/traceability/?serial=${serial}` : `${API_BASE_URL}/traceability/`;
  const response = await axios.get(url);
  return response.data;
};

// Função para baixar relatórios
export const downloadReport = async (format) => {
  const url = `${API_BASE_URL}/traceability/report.${format}`;
  const response = await axios.get(url, { responseType: "blob" });
  const blob = new Blob([response.data], { type: format === "pdf" ? "application/pdf" : "application/vnd.ms-excel" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `report.${format}`;
  link.click();
};
