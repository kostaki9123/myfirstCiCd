"use client"; // Make the whole page a client component

import { useEffect, useState } from "react";

type AffiliateLink = {
  id: number;
  place_id: string;
  affiliate_url: string;
  source?: string;
};

export default function AdminPage() {
  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [loading, setLoading] = useState(false);

  const [placeId, setPlaceId] = useState("");
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");

  // -------------------------
  // FETCH ALL
  // -------------------------
  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/links");
      if (!res.ok) throw new Error("Failed to fetch links");
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // -------------------------
  // CREATE
  // -------------------------
  const addLink = async () => {
    if (!placeId || !url) return alert("Missing fields");

    try {
      await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          place_id: placeId,
          affiliate_url: url,
          source,
        }),
      });

      setPlaceId("");
      setUrl("");
      setSource("");
      fetchLinks();
    } catch (err) {
      console.error(err);
      alert("Failed to add link");
    }
  };

  // -------------------------
  // UPDATE
  // -------------------------
  const updateLink = async (placeIdParam: string, field: string, value: string) => {
    try {
      const body: any = {};
      body[field] = value;

      await fetch(`/api/links/${placeIdParam}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      fetchLinks();
    } catch (err) {
      console.error(err);
      alert("Failed to update link");
    }
  };

  // -------------------------
  // DELETE
  // -------------------------
  const deleteLink = async (placeIdParam: string) => {
    if (!confirm("Delete this link?")) return;

    try {
      await fetch(`/api/links/${placeIdParam}`, {
        method: "DELETE",
      });

      fetchLinks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete link");
    }
  };

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <div className="p-6 mt-20 text-white max-w-4xl">
      <h1 className="text-xl font-bold mb-6">Affiliate Links Admin</h1>

      {/* CREATE FORM */}
      <div className="flex gap-2 mb-6">
        <input
          className="p-2 rounded text-black w-[200px]"
          placeholder="Google place_id"
          value={placeId}
          onChange={(e) => setPlaceId(e.target.value)}
        />
        <input
          className="p-2 rounded text-black flex-1"
          placeholder="Affiliate URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          className="p-2 rounded text-black w-[120px]"
          placeholder="source (gyg)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <button onClick={addLink} className="bg-green-600 px-4 rounded">
          Add
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <div>Loading...</div>
      ) : links.length === 0 ? (
        <div>No links found</div>
      ) : (
        <table className="w-full border border-gray-600 text-sm">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2">place_id</th>
              <th className="p-2">affiliate_url</th>
              <th className="p-2">source</th>
              <th className="p-2">actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id} className="border-t border-gray-700">
                <td className="p-2">{link.place_id}</td>
                <td className="p-2">
                  <input
                    className="w-full p-1 text-black rounded"
                    defaultValue={link.affiliate_url}
                    onBlur={(e) =>
                      updateLink(link.place_id, "affiliate_url", e.target.value)
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    className="w-full p-1 text-black rounded"
                    defaultValue={link.source || ""}
                    onBlur={(e) =>
                      updateLink(link.place_id, "source", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => deleteLink(link.place_id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
