import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetchTickets = (initialUrl) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationResult, setPaginationResult] = useState(null);

  const fetchTickets = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const fetchUrl = new URL(initialUrl, window.location.origin);
        fetchUrl.searchParams.set("page", page);

        console.log("Fetching from URL:", fetchUrl.toString());

        const response = await axios.get(fetchUrl.toString());

        if (page === 1) {
          setTickets(response.data.data || []);
        } else {
          setTickets((prevTickets) => [
            ...prevTickets,
            ...(response.data.data || []),
          ]);
        }

        setPaginationResult(response.data.paginationResult || null);
        setError(null);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError(err.message || "An error occurred while fetching tickets");
      } finally {
        setLoading(false);
      }
    },
    [initialUrl] // react to changes in initialUrl
  );

  useEffect(() => {
    setTickets([]);
    fetchTickets(1);
  }, [fetchTickets]);

  return { tickets, loading, error, fetchTickets, paginationResult };
};
