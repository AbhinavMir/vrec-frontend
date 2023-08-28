import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import LoginOrSignUp from "./components/LoginOrSignup";
import Notes from "./components/Notes";
import FAQ from "./components/FAQ";
import Insights from "./components/Insights";
import PricingPage from "./components/Pricing";
import Paypal from "./components/Paypal";
import Stripe from "./components/Stripe";
import LandingPage from "./components/LandingPage";
import SettingsPage from "./components/Settings";
import VerificationComponent from "./components/emailVerification";
import { theme as saasTheme } from "@saas-ui/theme-glass"; // Import the theme from the package
const customTheme = extendTheme({
  ...saasTheme,
});
function App() {
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // You might want to perform additional validation of the token here
      setIsValidToken(true);
    } else {
      setIsValidToken(false);
    }
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isValidToken ? (
                <Dashboard />
              ) : (
                <LandingPage setIsValidToken={setIsValidToken} />
              )
            }
          />
          <Route path="/notes" element={<Notes />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/pricing/stripe" element={<Stripe />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/verification" element={<VerificationComponent />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
