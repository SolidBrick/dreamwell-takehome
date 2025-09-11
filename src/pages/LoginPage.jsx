import { useState, useRef, useEffect, useCallback } from "react";
import LoginForm from "./LoginForm";
import "../css/LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-background">
      <div className="login-center-container">
        <LoginForm />
      </div>
    </div>
  );
}
