import React, { useState, ChangeEvent, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "react-qr-code";
import { saveAs } from "file-saver";
import { toPng } from "html-to-image";
import { BackgroundLines } from "../components/ui/BackgroundLines";

// Predefined list of colors

const fgColors = ["Black", "Red", "Blue", "Green"]; // Foreground colors
const bgColors = ["White", "Pink", "Yellow", "Lavender", "Honeydew"]; // Background colors


const QRCodeGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [fgColor, setFgColor] = useState<string>("black");
  const [bgColor, setBgColor] = useState<string>("white");
  const qrRef = useRef<HTMLDivElement>(null);

  // Handle input text change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };


  const handleFgColorChange = (color: string): void => {
    setFgColor(color);
  };


  const handleBgColorChange = (color: string): void => {
    setBgColor(color);
  };

  // Random color generator
  const getRandomColor = (colorArray: string[]): string => {
    const randomIndex = Math.floor(Math.random() * colorArray.length);
    return colorArray[randomIndex];
  };

  // Handle random color selection for both fg and bg
  const handleRandomColors = () => {
    const randomFgColor = getRandomColor(fgColors);
    const randomBgColor = getRandomColor(bgColors);

    setFgColor(randomFgColor);
    setBgColor(randomBgColor);
  };

  const notify = () => {
    toast("QR Downloaded!");
  };

  const handleDownloadClick = () => {
    if (!qrRef.current) {
      console.error("QR code reference is null.");
      return;
    }

    toPng(qrRef.current)
      .then((dataUrl) => {
        saveAs(dataUrl, "qr-code.png");
        notify();
      })
      .catch((err) => {
        console.error("Error generating image", err);
      });
  };

  // Share the QR code image using the Web Share API
  const handleShareClick = async () => {
    if (!qrRef.current) {
      console.error("QR code reference is null.");
      return;
    }

    try {
      const dataUrl = await toPng(qrRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "qr-code.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Share QR Code",
          text: "Check out this QR code!",
          files: [file], // Share the image file
        });
      } else {
        console.error("Sharing not supported or image could not be shared.");
        alert("Sharing is not supported on this device.");
      }
    } catch (error) {
      console.error("Error sharing image", error);
    }
  };

  return (
    <BackgroundLines>
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          <div className="flex space-x-2">
            <span className="animate-rgb-1">QR</span>
            <span className="animate-rgb-2">Code</span>
            <span className="animate-rgb-3">Generator</span>
          </div>
        </h1>

        <input
          type="text"
          placeholder="Enter text or URL"
          value={inputText}
          onChange={handleInputChange}
          className="p-2 mb-4 border border-gray-400 rounded-md w-full sm:max-w-xs"
        />


        <div className="flex gap-4 mb-4">
          <div>
            <label htmlFor="fgColor">Foreground Color:</label>
            <div className="flex space-x-2">
              {fgColors.map((color) => (
                <button
                  key={color}
                  value={color}
                  onClick={() => handleFgColorChange(color)}
                  className={`p-2 rounded-full border border-gray-400 ${color === fgColor ? 'bg-gray-200' : 'bg-gray-300'}`}

                  style={{ backgroundColor: color }} // Set button background to color
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="bgColor">Background Color:</label>
            <div className="flex space-x-2">
              {bgColors.map((color) => (
                <button
                  key={color}
                  value={color}
                  onClick={() => handleBgColorChange(color)}
                  className={`p-2 rounded-full border border-gray-400 ${color === bgColor ? 'bg-gray-200' : 'bg-gray-300'}`}
                  style={{ backgroundColor: color }} // Set button background to color
                />
              ))}
            </div>
          </div>
        </div>

        {inputText && (
          <div className="bg-white p-4 rounded-md shadow-md" ref={qrRef}>
            <QRCode value={inputText} fgColor={fgColor} bgColor={bgColor} />
          </div>
        )}

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleRandomColors}
            className="p-2 bg-blue-500 text-white rounded-md ml-2"
          >
            Random Colors
          </button>
          <button
            onClick={handleDownloadClick}
            className="p-2 bg-blue-500 text-white rounded-md ml-2"
          >
            Download QR
          </button>
          <button
            onClick={handleShareClick}
            className="p-2 bg-green-500 text-white rounded-md ml-2"
          >
            Share QR
          </button>
        </div>
      </div>

      <ToastContainer />
    </BackgroundLines>
  );
};

export default QRCodeGenerator;