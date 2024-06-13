import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./features/App";

const theme: MantineThemeOverride = {
  // ブランドカラーを追加
  colors: {
    brand: [
      "#fef9e5",
      "#faf1d3",
      "#f1e2a9",
      "#ead27b",
      "#e4c454",
      "#dfbb3b",
      "#ddb72d",
      "#c4a01f",
      "#ae8e16",
      "#977b05",
    ],
  },
  // ブランドカラーをデフォルトカラーにする
  primaryColor: "brand",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
