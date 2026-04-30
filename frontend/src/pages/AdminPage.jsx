import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight, LogOut, Mail, Building2, MessageSquare, Shield } from "lucide-react";
import { useAuth } from "@/auth/AuthProvider";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

export default function AdminPage() {
  const { user, loading, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  const handleGoogleSignIn = () => {
    const redirectUrl = window.location.origin + "/auth/callback";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  useEffect(() => {
    if (!user || !user.is_admin) return;
    setFetching(true);
    axios
      .get(`${API}/leads`, { withCredentials: true })
      .then((r) => setLeads(r.data))
      .catch((e) => setError(e.response?.data?.detail || "Failed to load leads"))
      .finally(() => setFetching(false));
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-body">
        <div className="text-white/60 text-sm">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white font-body flex items-center justify-center px-6">
        <div className="liquid-glass rounded-3xl p-10 max-w-md w-full text-center">
          <div className="relative z-10">
            <div className="liquid-glass-strong rounded-full w-12 h-12 mx-auto flex items-center justify-center">
              <Shield className="h-5 w-5 text-white relative z-10" />
            </div>
            <h1 className="mt-6 font-heading italic text-3xl md:text-4xl tracking-tight">
              Admin sign-in
            </h1>
            <p className="mt-3 text-white/60 font-light text-sm">
              Sign in with the Google account on the allowlist to view captured leads.
            </p>
            <button
              onClick={handleGoogleSignIn}
              data-testid="admin-google-signin"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-5 py-3 text-sm font-medium hover:bg-white/90 transition"
            >
              Continue with Google
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <a
              href="/"
              className="block mt-6 text-white/40 hover:text-white text-xs transition"
            >
              ← Back to site
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!user.is_admin) {
    return (
      <div className="min-h-screen bg-black text-white font-body flex items-center justify-center px-6">
        <div className="liquid-glass rounded-3xl p-10 max-w-md w-full text-center">
          <div className="relative z-10">
            <h1 className="font-heading italic text-3xl tracking-tight">Not authorised</h1>
            <p className="mt-3 text-white/60 font-light text-sm">
              {user.email} isn't on the admin allowlist for this workspace.
            </p>
            <button
              onClick={logout}
              data-testid="admin-logout"
              className="mt-6 liquid-glass-strong rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2"
            >
              <LogOut className="h-4 w-4 relative z-10" />
              <span className="relative z-10">Sign out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-body">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest">Workspace</p>
            <h1 className="mt-1 font-heading italic text-4xl md:text-5xl tracking-tight">
              Leads
            </h1>
            <p className="mt-2 text-white/50 text-sm">
              {leads.length} captured · admin {user.email}
            </p>
          </div>
          <button
            onClick={logout}
            data-testid="admin-logout"
            className="liquid-glass-strong self-start rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2"
          >
            <LogOut className="h-4 w-4 relative z-10" />
            <span className="relative z-10">Sign out</span>
          </button>
        </div>

        {/* Body */}
        <div className="mt-10">
          {error && (
            <div className="liquid-glass rounded-2xl p-5 text-sm text-white/80 mb-6">
              <span className="relative z-10">{error}</span>
            </div>
          )}
          {fetching && (
            <div className="text-white/50 text-sm">Loading leads…</div>
          )}
          {!fetching && leads.length === 0 && !error && (
            <div className="liquid-glass rounded-2xl p-10 text-center">
              <p className="relative z-10 text-white/60 text-sm">
                No leads yet. As soon as someone books a call, they'll show up here.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                data-testid={`lead-row-${lead.id}`}
                className="liquid-glass rounded-2xl p-6"
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading italic text-2xl text-white leading-tight">
                        {lead.name}
                      </h3>
                      <p className="text-white/40 text-xs mt-1">
                        {new Date(lead.created_at).toLocaleString()}
                      </p>
                    </div>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-xs text-white/70 hover:text-white inline-flex items-center gap-1.5 shrink-0"
                    >
                      Reply <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2 text-white/70">
                      <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                      <span className="break-all">{lead.email}</span>
                    </div>
                    <div className="flex items-start gap-2 text-white/70">
                      <Building2 className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{lead.company || "—"}</span>
                    </div>
                  </div>
                  {lead.message && (
                    <div className="mt-4 flex items-start gap-2 text-white/80">
                      <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-white/50" />
                      <p className="text-sm font-light leading-relaxed whitespace-pre-wrap">
                        {lead.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
