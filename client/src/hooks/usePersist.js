import { useState, useEffect } from "react";

const usePersist = () => {
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(true));
    console.log("🚀 ~ file: usePersist.js:8 ~ useEffect ~ persist", persist);
  }, [persist]);

  return [persist, setPersist];
};
export default usePersist;
