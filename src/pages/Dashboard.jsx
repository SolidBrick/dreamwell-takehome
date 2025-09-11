import "../css/Dashboard.css";
import { client, databases } from "../lib/appwrite";
import { useState, useEffect, React } from "react";

export default function Dashboard() {
  const [items, setItems] = useState([]);

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
        <div className="dashboard-item-list-container">
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
        <div className="dashboard-main-content"></div>
        <div className="dashboard-secondary-content"></div>
      </div>
    </div>
  );
}
