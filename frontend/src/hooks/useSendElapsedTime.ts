import axios, { type AxiosResponse } from "axios";
import { useState } from "react";
import type { Register } from "../@types/Register";

export function useSendElapsedTime() {
  const URL = "http://localhost:8080/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendElapsedTime(ms: number) {
    setLoading(true);
    setError(null);
    const body: Register = {
      interval: ms,
      date: new Date().toLocaleDateString("pt-br"),
      time: new Date().toLocaleTimeString("pt-br"),
    };
    try {
      const response: AxiosResponse = await axios.post(URL, body);
      return response.data;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { sendElapsedTime, loading, error };
}

export function useGetRecords() {
  const URL = "http://localhost:8080/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getAll() {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse = await axios.get(URL);
      return response.data;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { getAll, loading, error };
}
