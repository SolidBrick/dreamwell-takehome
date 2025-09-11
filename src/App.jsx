import { useState, useRef, useEffect, useCallback } from "react";
import "./css/App.css";
import { client, account } from "./lib/appwrite";
import { AppwriteException } from "appwrite";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  useEffect(() => {
    const signOutOnRefresh = async () => {
      try {
        // Deletes the current session (logs out the user)
        await account.deleteSession("current");
        console.log("User signed out on refresh");
      } catch (error) {
        console.log("No active session or already signed out", error);
      }
    };

    signOutOnRefresh();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
