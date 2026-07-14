"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists on boot
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    // Fetch profile
    api.get("/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password, role) => {
    setLoading(true);
    try {
      const data = await api.post("/auth/login", { email, password, role });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return { user, loading, login, logout, isAuthenticated: !!user };
}
