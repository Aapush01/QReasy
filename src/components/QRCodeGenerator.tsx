import React, { useState, ChangeEvent, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QRCode from 'react-qr-code';
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';
import { BackgroundLines } from "../components/ui/BackgroundLines";

const QRCodeGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const qrRef = useRef<HTMLDivElement>(null);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };

  const notify = () => {
    console.log("Notify function called"); // Debugging log
    toast("QR Downloaded!"); // Show toast notification
  };

  const handleDownloadClick = () => {
    if (!qrRef.current) {
      console.error("QR code reference is null.");
      return;
    }

    toPng(qrRef.current)
      .then((dataUrl) => {
        saveAs(dataUrl, 'qr-code.png');
        notify(); // Notify after successful download
      })
      .catch((err) => {
        console.error('Error generating image', err);
      });
  };

  return (
    <BackgroundLines>
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>

        <input
          type="text"
          placeholder="Enter text or URL"
          value={inputText}
          onChange={handleInputChange}
          className="p-2 mb-4 border border-gray-400 rounded-md w-full sm:max-w-xs"
        />

        {inputText && (
          <div className="bg-white p-4 rounded-md shadow-md" ref={qrRef}>
            <QRCode value={inputText} />
          </div>
        )}

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleDownloadClick}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Download QR
          </button>
        </div>
      </div>

      {/* ToastContainer is placed at the root of the component */}
      <ToastContainer />
    </BackgroundLines>
  );
};

export default QRCodeGenerator;