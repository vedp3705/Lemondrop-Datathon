// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const Results = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const mitigation_plan = location.state?.mitigation_plan || "No data available.";

//   return (
//     <div style={styles.container}>
//       <div style={styles.contentWrapper}>
//         <h1 style={styles.header}>Fire Mitigation Plan</h1>
//         <div style={styles.contentBox}>
//           <p style={styles.content}>{mitigation_plan}</p>
//         </div>
//         <button style={styles.button} onClick={() => navigate("/")}>
//           ⬅️ Go Back
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     height: "100vh",
//     background: "linear-gradient(to right, #141e30, #243b55)",
//     padding: "2rem",
//     overflow: "auto",
//   },
//   contentWrapper: {
//     backgroundColor: "white",
//     padding: "2rem",
//     borderRadius: "12px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//     maxWidth: "900px",
//     width: "100%",
//     minHeight: "80vh",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },
//   header: {
//     fontSize: "24px",
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//     marginBottom: "1rem",
//   },
//   contentBox: {
//     flexGrow: 1,
//     overflowY: "auto",
//     maxHeight: "60vh",
//     padding: "1rem",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     backgroundColor: "#f9f9f9",
//   },
//   content: {
//     fontSize: "16px",
//     color: "#555",
//     textAlign: "left",
//     lineHeight: "1.6",
//     whiteSpace: "pre-wrap",
//   },
//   button: {
//     marginTop: "1rem",
//     padding: "12px 20px",
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "16px",
//     cursor: "pointer",
//     transition: "0.3s",
//     alignSelf: "center",
//   },
// };

// export default Results;





// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import "./Results.css"; // Import the CSS file

// const Results = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const mitigation_plan = location.state?.mitigationPlan || "No data available.";

//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(mitigationPlan);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="container">
//       <div className="contentWrapper">
//         <h1 className="header">🔥 Fire Mitigation Plan 🔥</h1>
//         <div className="contentBox">
//           {/* Wrap ReactMarkdown in a container with class "content" for markdown styling */}
//           <div className="content">
//             <ReactMarkdown>{mitigationPlan}</ReactMarkdown>
//           </div>
//         </div>
//         <div className="buttonContainer">
//           <button className="button" onClick={handleCopy}>
//             {copied ? "✅ Copied!" : "📋 Copy Plan"}
//           </button>
//           <button className="backButton" onClick={() => navigate("/")}>
//             ⬅️ Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;




// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import "./Results.css"; // Import the CSS file

// const Results = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Expecting these values from the prediction API
//   // const {
//   //   mitigationPlan = "No data available.",
//   //   predicted_fire_size_class = "N/A",
//   //   predicted_confidence = 0,
//   // } = location.state || {};

//   // const [copied, setCopied] = useState(false);

//   // const handleCopy = () => {
//   //   navigator.clipboard.writeText(mitigationPlan);
//   //   setCopied(true);
//   //   setTimeout(() => setCopied(false), 2000);
//   // };

//   const Results = () => {
//     const location = useLocation();
  
//     useEffect(() => {
//       console.log("Received state:", location.state);
//     }, [location]);
  
//     return <div>Check Console</div>;
//   };
  

//   return (
//     <div className="container">
//       <div className="contentWrapper">
//         {/* Prediction Summary Section */}
//         <div className="predictionSummary">
//           <h2 className="predictionHeader">
//             Peak Fire Class: <span>{predicted_fire_size_class}</span>
//           </h2>
//           <p className="confidenceText">
//             Confidence: <strong>{Math.round(predicted_confidence * 100)}%</strong>
//           </p>
//         </div>

//         <h1 className="header">🔥 Fire Mitigation Plan 🔥</h1>

//         <div className="contentBox">
//           {}
//           <div className="content">
//             <ReactMarkdown>{mitigationPlan}</ReactMarkdown>
//           </div>
//         </div>
//         <div className="buttonContainer">
//           <button className="button" onClick={handleCopy}>
//             {copied ? "✅ Copied!" : "📋 Copy Plan"}
//           </button>
//           <button className="backButton" onClick={() => navigate("/")}>
//             ⬅️ Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;





// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import "./Results.css";

// const Results = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     mitigationPlan = "No data available.",
//     predicted_fire_size_class = "N/A",
//     predicted_confidence = 0
//   } = location.state || {};

//   const [copied, setCopied] = useState(false);

//   // useEffect(() => {
//   //   console.log("Received state:", location.state);
//   // }, [location]);

//   useEffect(() => {
//     console.log("Received state:", JSON.stringify(location.state, null, 2));
//   }, [location]);
  

//   const handleCopy = () => {
//     navigator.clipboard.writeText(mitigationPlan);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };
  

//   return (
//     <div className="container">
//       <div className="contentWrapper">
//         <div className="predictionSummary">
//           <h2 className="predictionHeader">
//             Peak Fire Class: <span>{predicted_fire_size_class}</span>
//           </h2>
//           <p className="confidenceText">
//             Confidence: <strong>{Math.round(predicted_confidence * 100)}%</strong>
//           </p>
//         </div>

//         <h1 className="header">🔥 Fire Mitigation Plan 🔥</h1>

//         <div className="contentBox">
//           <div className="content">
//             <ReactMarkdown>{mitigationPlan}</ReactMarkdown>
//           </div>
//         </div>
//         <div className="buttonContainer">
//           <button className="button" onClick={handleCopy}>
//             {copied ? "✅ Copied!" : "📋 Copy Plan"}
//           </button>
//           <button className="backButton" onClick={() => navigate("/")}>
//             ⬅️ Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;



// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import "./Results.css";

// const Results = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     mitigationPlan = "No data available.",
//     predicted_fire_size_class = "N/A",
//     predicted_confidence = 0
//   } = location.state || {};

//   const [copied, setCopied] = useState(false);

//   // useEffect(() => {
//   //   console.log("🔥 Received state:", JSON.stringify(location.state, null, 2));
//   //   console.log("📊 Fire Size Class:", predicted_fire_size_class);
//   //   console.log("📈 Confidence:", predicted_confidence);
//   // }, [location]);

//   useEffect(() => {
//     console.log("🔥 Received state:", JSON.stringify(location.state, null, 2));
//     console.log("📊 Fire Size Class:", predicted_fire_size_class);
//     console.log("📈 Confidence:", predicted_confidence);
//   }, [location.state, predicted_fire_size_class, predicted_confidence]);  // ✅ FIXED: Include missing dependencies
  

//   const handleCopy = () => {
//     navigator.clipboard.writeText(mitigationPlan);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="container">
//       <div className="contentWrapper">
//         <div className="predictionSummary">
//           <h2 className="predictionHeader">
//             🔥 Peak Fire Class: <span>{predicted_fire_size_class}</span>
//           </h2>
//           <p className="confidenceText">
//             🔥 Confidence: <strong>{(predicted_confidence * 100).toFixed(2)}%</strong>
//           </p>
//         </div>

//         <h1 className="header">🔥 Fire Mitigation Plan 🔥</h1>

//         <div className="contentBox">
//           <div className="content">
//             <ReactMarkdown>{mitigationPlan}</ReactMarkdown>
//           </div>
//         </div>
//         <div className="buttonContainer">
//           <button className="button" onClick={handleCopy}>
//             {copied ? "✅ Copied!" : "📋 Copy Plan"}
//           </button>
//           <button className="backButton" onClick={() => navigate("/")}>
//             ⬅️ Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;




// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import "./Results.css";

// const Results = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Destructure state; if state is missing, defaults are used.
//   const {
//     mitigationPlan = "No data available.",
//     predicted_fire_size_class = "N/A",
//     predicted_confidence = 0
//   } = location.state || {};

//   const [copied, setCopied] = useState(false);

//   // Optional: If no state is passed, perform a prediction fetch
//   useEffect(() => {
//     // If location.state is not provided, fetch the prediction and navigate with the state.
//     if (!location.state) {
//       const fetchPrediction = async () => {
//         // Build your data payload here. Adjust these values as needed.
//         const data = {
//           county: "SomeCounty",
//           month: 7,
//           year: 2025,
//           cause: "Lightning",
//           latitude: 34.0522,
//           longitude: -118.2437
//         };

//         try {
//           const response = await fetch("http://localhost:5002/predict", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//           });

//           const result = await response.json();
//           // Navigate to the same page but with state so that the results are displayed.
//           navigate("/results", { state: result });
//         } catch (error) {
//           console.error("Error fetching prediction:", error);
//         }
//       };

//       fetchPrediction();
//     }
//   }, [location.state, navigate]);

//   useEffect(() => {
//     console.log("🔥 Received state:", JSON.stringify(location.state, null, 2));
//     console.log("📊 Fire Size Class:", predicted_fire_size_class);
//     console.log("📈 Confidence:", predicted_confidence);
//   }, [location.state, predicted_fire_size_class, predicted_confidence]);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(mitigationPlan);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="container">
//       <div className="contentWrapper">
//         <div className="predictionSummary">
//           <h2 className="predictionHeader">
//             🔥 Peak Fire Class: <span>{predicted_fire_size_class}</span>
//           </h2>
//           <p className="confidenceText">
//             🔥 Confidence:{" "}
//             <strong>{(predicted_confidence * 100).toFixed(2)}%</strong>
//           </p>
//         </div>

//         <h1 className="header">🔥 Fire Mitigation Plan 🔥</h1>

//         <div className="contentBox">
//           <div className="content">
//             <ReactMarkdown>{mitigationPlan}</ReactMarkdown>
//           </div>
//         </div>
//         <div className="buttonContainer">
//           <button className="button" onClick={handleCopy}>
//             {copied ? "✅ Copied!" : "📋 Copy Plan"}
//           </button>
//           <button className="backButton" onClick={() => navigate("/")}>
//             ⬅️ Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;



// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import "./Results.css";

// const Results = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     mitigationPlan = "No data available.",
//     predicted_fire_size_class = "N/A",
//     predicted_confidence = 0
//   } = location.state || {};

//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     console.log("🔥 Received state:", JSON.stringify(location.state, null, 2));
//     console.log("📊 Fire Size Class:", predicted_fire_size_class);
//     console.log("📈 Confidence:", predicted_confidence);
//   }, [location.state, predicted_fire_size_class, predicted_confidence]);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(mitigationPlan);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="container">
//       <div className="contentWrapper">
//         <div className="predictionSummary">
//           <h2 className="predictionHeader">
//             🔥 Peak Fire Class: <span>{predicted_fire_size_class}</span>
//           </h2>
//           <p className="confidenceText">
//             🔥 Confidence: <strong>{(predicted_confidence * 100).toFixed(2)}%</strong>
//           </p>
//         </div>

//         <h1 className="header">🔥 Fire Mitigation Plan 🔥</h1>

//         <div className="contentBox">
//           <div className="content">
//             <ReactMarkdown>{mitigationPlan}</ReactMarkdown>
//           </div>
//         </div>
//         <div className="buttonContainer">
//           <button className="button" onClick={handleCopy}>
//             {copied ? "✅ Copied!" : "📋 Copy Plan"}
//           </button>
//           <button className="backButton" onClick={() => navigate("/")}>
//             ⬅️ Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;




// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import "./Results.css";

// const Results = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Grab the data that was passed via `navigate(..., { state: {...} })`
//   const {
//     mitigationPlan = "No data available.",
//     predicted_fire_size_class = "N/A",
//     predicted_confidence = 0,
//   } = location.state || {};

//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     console.log("🔥 Received state:", JSON.stringify(location.state, null, 2));
//     console.log("📊 Fire Size Class:", predicted_fire_size_class);
//     console.log("📈 Confidence:", predicted_confidence);
//   }, [location.state, predicted_fire_size_class, predicted_confidence]);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(mitigationPlan);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="container">
//       <div className="contentWrapper">
//         <div className="predictionSummary">
//           <h2 className="predictionHeader">
//             🔥 Peak Fire Class: <span>{predicted_fire_size_class}</span>
//           </h2>
//           <p className="confidenceText">
//             🔥 Confidence:{" "}
//             <strong>{(predicted_confidence * 100).toFixed(2)}%</strong>
//           </p>
//         </div>

//         <h1 className="header">🔥 Fire Mitigation Plan 🔥</h1>

//         <div className="contentBox">
//           <div className="content">
//             <ReactMarkdown>{mitigationPlan}</ReactMarkdown>
//           </div>
//         </div>
//         <div className="buttonContainer">
//           <button className="button" onClick={handleCopy}>
//             {copied ? "✅ Copied!" : "📋 Copy Plan"}
//           </button>
//           <button className="backButton" onClick={() => navigate("/")}>
//             ⬅️ Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;




// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import "./Results.css";

// const Results = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     mitigationPlan = "No data available.",
//     predicted_fire_size_class = "N/A",
//     predicted_confidence = 0,
//   } = location.state || {};

//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     console.log("🔥 Received state:", JSON.stringify(location.state, null, 2));
//     console.log("📊 Fire Size Class:", predicted_fire_size_class);
//     console.log("📈 Confidence:", predicted_confidence);
//   }, [location.state, predicted_fire_size_class, predicted_confidence]);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(mitigationPlan);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Format values for display
//   const displayFireClass = predicted_fire_size_class;
//   const displayConfidence = (predicted_confidence * 100).toFixed(2);

//   // Explanation for fire class sizes along with an additional note for authorities
//   const fireClassExplanation = `**Fire Size Class Definition:**  
// - **A:** >0 and ≤0.25 acres  
// - **B:** 0.26 – 9.9 acres  
// - **C:** 10.0 – 99.9 acres  
// - **D:** 100 – 299 acres  
// - **E:** 300 – 999 acres  
// - **F:** 1000 – 4999 acres  
// - **G:** 5000+ acres  

// *Note:* In similar scenarios, authorities have historically referenced fires of comparable scale and environmental factors—such as notable incidents with extensive perimeters and rapid spread—to guide their emergency response and resource allocation strategies.
// `;

//   return (
//     <div className="container">
//       <div className="contentWrapper">
//         <div 
//           className="predictionSummary" 
//           style={{
//             backgroundColor: "rgba(30, 30, 30, 0.85)", // dark, slightly transparent
//             color: "white",
//             padding: "1.5rem",
//             borderRadius: "8px",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
//             marginBottom: "1.5rem"
//           }}
//         >
//           <h2 className="predictionHeader" style={{ marginBottom: "0.5rem" }}>
//             🔥 Peak Fire Class: <span>{displayFireClass}</span>
//           </h2>
//           <p className="confidenceText" style={{ marginBottom: "1rem", fontSize: "16px" }}>
//             🔥 Confidence: <strong>{displayConfidence}%</strong>
//           </p>
//           <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
//             Based on the prediction, <strong>Class {displayFireClass}</strong> indicates a wildfire that would reach a maximum perimeter covering{" "}
//             {displayFireClass === "A" && "greater than 0 but less than or equal to 0.25 acres"}
//             {displayFireClass === "B" && "between 0.26 and 9.9 acres"}
//             {displayFireClass === "C" && "between 10.0 and 99.9 acres"}
//             {displayFireClass === "D" && "between 100 and 299 acres"}
//             {displayFireClass === "E" && "between 300 and 999 acres"}
//             {displayFireClass === "F" && "between 1000 and 4999 acres"}
//             {displayFireClass === "G" && "5000 or more acres"}. The confidence level suggests there is a <strong>{displayConfidence}%</strong> probability that this prediction is accurate.
//           </p>
//           <div style={{ marginTop: "1rem", fontSize: "13px", opacity: 0.9 }}>
//             <ReactMarkdown>{fireClassExplanation}</ReactMarkdown>
//           </div>
//         </div>

//         <h1 className="header">🔥 Fire Mitigation Plan 🔥</h1>

//         <div 
//           className="contentBox" 
//           style={{
//             backgroundColor: "rgba(240, 240, 240, 0.9)", // light, slightly transparent
//             padding: "1.5rem",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
//             marginTop: "1rem"
//           }}
//         >
//           <div className="content">
//             <ReactMarkdown>{mitigationPlan}</ReactMarkdown>
//           </div>
//         </div>

//         <div className="buttonContainer" style={{ marginTop: "1.5rem" }}>
//           <button className="button" onClick={handleCopy}>
//             {copied ? "✅ Copied!" : "📋 Copy Plan"}
//           </button>
//           <button className="backButton" onClick={() => navigate("/")}>
//             ⬅️ Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;





import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./Results.css";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    mitigationPlan = "No data available.",
    predicted_fire_size_class = "N/A",
    predicted_confidence = 0,
  } = location.state || {};

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.log("🔥 Received state:", JSON.stringify(location.state, null, 2));
    console.log("📊 Fire Size Class:", predicted_fire_size_class);
    console.log("📈 Confidence:", predicted_confidence);
  }, [location.state, predicted_fire_size_class, predicted_confidence]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mitigationPlan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format values for display
  const displayFireClass = predicted_fire_size_class;
  const displayConfidence = (predicted_confidence * 100).toFixed(2);

  // Determine the acreage description using a proper conditional (if/else or ternary)
  let acreageDescription = "";
  if (displayFireClass === "A") {
    acreageDescription = "greater than 0 but less than or equal to 0.25 acres";
  } else if (displayFireClass === "B") {
    acreageDescription = "between 0.26 and 9.9 acres";
  } else if (displayFireClass === "C") {
    acreageDescription = "between 10.0 and 99.9 acres";
  } else if (displayFireClass === "D") {
    acreageDescription = "between 100 and 299 acres";
  } else if (displayFireClass === "E") {
    acreageDescription = "between 300 and 999 acres";
  } else if (displayFireClass === "F") {
    acreageDescription = "between 1000 and 4999 acres";
  } else if (displayFireClass === "G") {
    acreageDescription = "5000 or more acres";
  }

  // Explanation for fire class sizes with context
  const fireClassContext = `Based on the prediction, **Class ${displayFireClass}** indicates a wildfire that, at its expected maximum extent, would cover ${acreageDescription}. The confidence level of **${displayConfidence}%** suggests that there is a high probability that this prediction is accurate.
  
  `;

  return (
    <div className="container">
      <div className="contentWrapper">
        {/* Main Box containing all details */}
        <div 
          className="contentBox" 
          style={{
            backgroundColor: "rgba(240, 240, 240, 0.9)", // light, slightly transparent background
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
          }}
        >
          {/* Header Section with Fire Class and Confidence */}
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "22px", color: "#333" }}>
              Expected Max Fire Classification: <span>{displayFireClass}</span>
            </h2>
            <p style={{ margin: 0, fontSize: "18px", color: "#555" }}>
              Confidence: <strong>{displayConfidence}%</strong>
            </p>
          </div>

          {/* Context / Explanation Section */}
          <div style={{ fontSize: "14px", lineHeight: "1.6", color: "#444", marginTop: "1rem" }}>
            <ReactMarkdown>{fireClassContext}</ReactMarkdown>
          </div>

          {/* Mitigation Plan Section */}
          <div style={{ marginTop: "2rem" }}>
            <h1 style={{ fontSize: "20px", color: "#333", marginBottom: "0.5rem" }}>
                Recommended Optimal Fire Mitigation Plan 
            </h1>
            <div style={{ fontSize: "14px", lineHeight: "1.6", color: "#444" }}>
              <ReactMarkdown>{mitigationPlan}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Button Container */}
        <div className="buttonContainer" style={{ marginTop: "1.5rem" }}>
          <button className="button" onClick={handleCopy}>
            {copied ? "✅ Copied!" : "📋 Copy Plan"}
          </button>
          <button className="backButton" onClick={() => navigate("/")}>
            ⬅️ Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
