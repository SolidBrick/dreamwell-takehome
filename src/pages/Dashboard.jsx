import "../css/Dashboard.css";
import { client, databases, fetchBrandInfo } from "../lib/appwrite";
import { useState, useEffect, React } from "react";
import { useBrandSearch } from "./useBrandSearch";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [brandInput, setBrandInput] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTextareaValue("");
    setProductsList([]);
    try {
      const data = await fetchBrandInfo(brandInput);
      setTextareaValue(data.description || "");
      setProductsList(data.products || []);
    } catch (err) {
      setError(err.message || "Failed to fetch brand info.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_COLLECTION_ID
        );
        setItems(response.documents);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="dashboard-background">
      <h6 className="dashboard-title">Welcome to my app :D</h6>
      <div className="dashboard-container">
        <div className="dashboard-secondary-content">
          <form className="brand-search-bar" onSubmit={handleBrandSubmit}>
            <input
              type="text"
              placeholder="What's your company name?"
              value={brandInput}
              onChange={(e) => setBrandInput(e.target.value)}
              disabled={loading}
            />
          </form>
          <div className="brand-description-div">
            <textarea
              className="brand-description-textarea"
              value={textareaValue ? textareaValue : "No brand found"}
              placeholder={
                loading ? "Loading..." : "Brand description will appear here"
              }
              style={{ minHeight: "4rem", height: "auto", overflow: "hidden" }}
              ref={(el) => {
                if (el) {
                  el.style.height = "auto";
                  el.style.height = el.scrollHeight + 5 + "px";
                }
              }}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="dashboard-item-list-container"></div>
        <div className="dashboard-main-content">
          <div className="list-search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <table className="item-list">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.$id}>
                  <td>{item.name}</td>
                  <td>{item.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
