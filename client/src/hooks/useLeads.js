"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function useLeads(statusFilter = "") {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const endpoint = statusFilter ? `/leads?status=${statusFilter}` : "/leads";
      const data = await api.get(endpoint);
      setLeads(data.leads || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const updated = await api.put(`/leads/${leadId}`, { status: newStatus });
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, ...updated.lead } : l)));
    } catch (err) {
      setError(err.message);
    }
  };

  return { leads, loading, error, refetch: fetchLeads, updateLeadStatus };
}
