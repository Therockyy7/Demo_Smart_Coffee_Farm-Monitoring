import React, { useEffect } from "react";

const WindyMap = () => {
  useEffect(() => {
    const initWindy = () => {
      const checkWindyReady = setInterval(() => {
        if (window.windyInit && window.L) {
          clearInterval(checkWindyReady);
          console.log("✅ Windy script ready — initializing...");
          window.windyInit(
            {
              key: "BRRF6SysrcBj6Fb8V659mxPl9BzrsNwJ",
              lat: 16.05,
              lon: 108.2,
              zoom: 6,
              overlay: "wind",
            },
            (windyAPI) => {
              console.log("✅ Windy map initialized successfully!", windyAPI);
            }
          );
        }
      }, 300);
    };

    // Thêm script nếu chưa có
    if (!document.getElementById("windy-script")) {
      const script = document.createElement("script");
      script.id = "windy-script";
      script.src = "https://api.windy.com/assets/map-forecast/libBoot.js";
      script.async = true;
      script.addEventListener("load", initWindy);
      document.body.appendChild(script);
    } else {
      // Nếu script đã load trước đó
      initWindy();
    }

    return () => {
      const windyEl = document.getElementById("windy");
      if (windyEl) windyEl.innerHTML = "";
    };
  }, []);

  return (
    <div
      id="windy"
      style={{
        width: "100%",
        height: "80vh",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
};

export default WindyMap;
