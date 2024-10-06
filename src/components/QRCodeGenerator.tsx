import React, { useState, ChangeEvent } from 'react';
import QRCode from 'react-qr-code';
import { BackgroundLines } from "../components/ui/BackgroundLines"

const QRCodeGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
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
        className="p-2 mb-4 border border-gray-400 rounded-md w-full max-w-xs"
      />

      {inputText && (
        <div className="bg-white p-4 rounded-md shadow-md">
          <QRCode value={inputText} />
        </div>
      )}
    </div>
      </BackgroundLines>
  );
};

export default QRCodeGenerator;
