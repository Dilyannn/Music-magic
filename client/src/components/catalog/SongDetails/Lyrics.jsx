import { useState, useEffect } from "react";

const Lyrics = ({ title, artist }) => {
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!title || !artist) return;

    const fetchLyrics = async () => {
      try {
        const response = await fetch(
          `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
        );
        const data = await response.json();
        if (data.lyrics) {
          setLyrics(data.lyrics);
        }
      } catch (error) {
        console.error("Failed to fetch lyrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();
  }, [title, artist]);

  if (loading || !lyrics) return null;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
        Lyrics
      </h3>
      <div className="text-gray-300 space-y-6 leading-relaxed text-lg font-serif whitespace-pre-line">
        {lyrics}
      </div>
    </div>
  );
};

export default Lyrics;
