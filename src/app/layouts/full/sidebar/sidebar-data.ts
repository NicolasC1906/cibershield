import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Inicio',
    iconName: 'layout-dashboard',
    route: '/home',
  },
  // {
  //   displayName: 'Dashboard',
  //   iconName: 'layout-dashboard',
  //   route: '/dashboard',
  // },
  {
    navCap: "Análisis de Seguridad"
  },
  {
    displayName: "CyberSec Toolkit",
    iconName: "tool",
    route: "/cibershield/cybersec-toolkit"
  },
  {
    displayName: "WebVuln Report",
    iconName: "shield-off",
    route: "/cibershield/webvuln-report"
  },
  {
    displayName: "Security Checker",
    iconName: "file-check",
    route: "/cibershield/compliance-checker"
  },
  {
    displayName: "SecureAPI Builder",
    iconName: "cloud",
    route: "/cibershield/secure-api"
  },
  {
    navCap: "Simulación y Respuesta"
  },
  {
    displayName: "SimulAttacker Pro",
    iconName: "target",
    route: "/cibershield/simul-attacker"
  },
  {
    displayName: "Incident Simulator",
    iconName: "file-alert",
    route: "/cibershield/incident-response"
  },
  {
    navCap: "Monitoreo de Amenazas"
  },
  {
    displayName: "ThreatAlert 360",
    iconName: "alert-triangle",
    route: "/cibershield/threat-alert"
  },
  {
    navCap: "Aprendizaje y Desarrollo"
  },
  {
    displayName: "SecureTraining Academy",
    iconName: "school",
    route: "/cibershield/secure-training"
  }
];
