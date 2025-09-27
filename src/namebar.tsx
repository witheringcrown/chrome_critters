import { useEffect, useState } from "react";

export default function Namebar() {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    chrome.storage.local.get("creatureName", (result) => {
      if (result.creatureName) {
        setName(result.creatureName);
      }
    });
  }, []);

  return <h2>Name: {name || "No name yet"}</h2>;
}