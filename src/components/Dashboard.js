"use client";

import { useState } from "react";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  const createShort = async () => {
    try {
      const response = await fetch("/api/shorts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: "news",
          title: "adjfbkj",
          author: "yash",
          content: "ahbfuia",
          actualContentLink: "jkbfjabdf",
          imageLink: "adfvakf",
        }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error creating short:", error);
      setMessage("Failed to create short");
    }
  };

  return (
    <div>
      <div>Dashboard</div>
      <button onClick={createShort}>Create Short</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Dashboard;
