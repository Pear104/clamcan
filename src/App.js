import React, { useEffect } from "react";
import MainRoutes from "./app/routes/MainRoutes";
import { App as AntApp, ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./app/stores/AuthProvider";
import { sConfig } from "app/stores/configStore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement
);

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const config = sConfig.use();
  return (
    <BrowserRouter>
      <AuthProvider>
        <AntApp component={false}>
          <ConfigProvider
            tag={{ className: "text-[14px] font-semibold py-1 px-2" }}
            // componentSize="large"
            theme={{
              algorithm: config.isDarkMode ? darkAlgorithm : defaultAlgorithm,
              token: {
                colorPrimary: "#00b96b",
                colorLink: "#02cf5b",
                borderRadius: 4,
              },
            }}
          >
            <MainRoutes />
          </ConfigProvider>
        </AntApp>
      </AuthProvider>
    </BrowserRouter>
  );
}
