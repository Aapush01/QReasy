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
  const [fgColor, setFgColor] = useState<string>("black"); // Foreground color default
  const [bgColor, setBgColor] = useState<string>("white"); // Background color default
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);

  // Handle input text change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };

  // Handle foreground color change
  const handleFgColorChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFgColor(e.target.value);
  };

  // Handle background color change
  const handleBgColorChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setBgColor(e.target.value);
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

  // Generate the image for sharing
  const handleShareClick = () => {
    if (!qrRef.current) {
      console.error("QR code reference is null.");
      return;
    }

    toPng(qrRef.current)
      .then((dataUrl) => {
        setQrImageUrl(dataUrl); // Store the generated QR image URL for sharing
      })
      .catch((err) => {
        console.error("Error generating image for sharing", err);
      });
  };

  // Function to share on different platforms
  const shareQrCode = (platform: string) => {
    if (!qrImageUrl) {
      console.error("QR code image URL is null.");
      return;
    }

    const encodedQrUrl = encodeURIComponent(qrImageUrl);
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedQrUrl}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodedQrUrl}&text=Check out this QR code!`;
        break;
      case "instagram":
        alert("Instagram sharing is not supported via direct link. You can share the link manually.");
        return;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedQrUrl}`;
        break;
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedQrUrl}&text=Check out this QR code!`;
        break;
      default:
        alert("Platform not supported!");
        return;
    }

    window.open(shareUrl, "_blank");
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
            <select
              id="fgColor"
              value={fgColor}
              onChange={handleFgColorChange}
              className="ml-2"
            >
              {fgColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bgColor">Background Color:</label>
            <select
              id="bgColor"
              value={bgColor}
              onChange={handleBgColorChange}
              className="ml-2"
            >
              {bgColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
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

        {qrImageUrl && (
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={() => shareQrCode("whatsapp")}
              className="p-2 bg-green-500 text-white rounded-md"
            >
              WhatsApp
            </button>
            <button
              onClick={() => shareQrCode("telegram")}
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Telegram
            </button>
            <button
              onClick={() => shareQrCode("facebook")}
              className="p-2 bg-blue-800 text-white rounded-md"
            >
              Facebook
            </button>
            <button
              onClick={() => shareQrCode("x")}
              className="p-2 bg-black text-white rounded-md"
            >
              X (Twitter)
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </BackgroundLines>
  );
};

export default QRCodeGenerator;
