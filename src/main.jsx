import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/draggable"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// T006: Register GSAP plugins safely to handle missing plugins or SSR gracefully
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, ScrollToPlugin);

  // Configure GSAP ScrollTrigger global defaults
  ScrollTrigger.defaults({
    markers: false,
    toggleActions: "play none none reverse",
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
