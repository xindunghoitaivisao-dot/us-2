import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

export default function AuthCallback() {
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const hash = window.location.hash || "";
    const m = hash.match(/session_id=([^&]+)/);
    if (!m) {
      navigate("/admin", { replace: true });
      return;
    }
    const sessionId = decodeURIComponent(m[1]);

    (async () => {
      try {
        await axios.post(
          `${API}/auth/session`,
          { session_id: sessionId },
          { withCredentials: true }
        );
        await refresh();
      } catch (e) {
        console.error("auth exchange failed", e);
      }
      window.history.replaceState({}, "", "/admin");
      navigate("/admin", { replace: true });
    })();
  }, [navigate, refresh]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-body">
      <div className="liquid-glass rounded-3xl px-8 py-6 text-sm text-white/70 relative z-10">
        Signing you in…
      </div>
    </div>
  );
}
