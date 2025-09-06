import React, { useState, useRef } from "react";
import { Camera, Upload, Scan, CheckCircle, Info } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useNotifications } from "../context/NotificationContext";

const WasteScanner: React.FC = () => {
  const [scannedItem, setScannedItem] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateGreenCoins } = useUser();
  const { addNotification } = useNotifications();

  // ✅ Waste database (local reference)
  const wasteDatabase = [
    {
      name: "Plastic Bottle",
      category: "Recyclable",
      bin: "Blue Bin",
      tips: "Remove cap and labels before disposal",
      coins: 5,
      icon: "🍾",
      severity: "low",
    },
    {
      name: "Aluminum Can",
      category: "Recyclable",
      bin: "Blue Bin",
      tips: "Clean the can before disposal",
      coins: 3,
      icon: "🥤",
      severity: "low",
    },
    {
      name: "Food Waste",
      category: "Organic",
      bin: "Green Bin",
      tips: "Compost or dispose in organic waste bin",
      coins: 2,
      icon: "🍎",
      severity: "medium",
    },
    {
      name: "Electronic Device",
      category: "E-Waste",
      bin: "Special Collection",
      tips: "Take to designated e-waste collection center",
      coins: 10,
      icon: "📱",
      severity: "high",
    },
    {
      name: "Glass Bottle",
      category: "Recyclable",
      bin: "Blue Bin",
      tips: "Clean thoroughly before disposal",
      coins: 4,
      icon: "🍾",
      severity: "low",
    },
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setPreviewUrl(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("🔑 Using HF Token:", import.meta.env.VITE_HF_API_TOKEN);

      const response = await fetch(
        "https://api-inference.huggingface.co/models/kendrickfff/waste-classification-yolov8-ken",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HF_API_TOKEN}`,
          },
          body: formData,
        }
      );

      console.log("📡 Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ HuggingFace API Error:", errorText);
        addNotification(
          `AI Model request failed (${response.status}): ${errorText}`,
          "error"
        );
        setIsScanning(false);
        return;
      }

      const data = await response.json();
      console.log("✅ YOLOv8 Response Data:", data);

      if (!Array.isArray(data) || data.length === 0) {
        addNotification("⚠️ No object detected in the image.", "warning");
        setIsScanning(false);
        return;
      }

      // Get highest confidence result
      const topResult = data.sort((a, b) => b.score - a.score)[0];
      const label = topResult.label.toLowerCase();

      console.log("🎯 Detected Label:", label);

      // ✅ Fuzzy match with waste database
      const matchedItem =
        wasteDatabase.find((item) =>
          item.name.toLowerCase().includes(label)
        ) || {
          name: label,
          category: "Unknown",
          bin: "General Waste",
          tips: "Dispose responsibly",
          coins: 1,
          icon: "🗑️",
          severity: "low",
        };

      const scanResult = {
        ...matchedItem,
        timestamp: new Date(),
        id: Date.now(),
      };

      setScannedItem(scanResult);
      setScanHistory((prev) => [scanResult, ...prev.slice(0, 9)]);
      updateGreenCoins(matchedItem.coins);

      addNotification(
        `✅ Detected ${matchedItem.name}! +${matchedItem.coins} Green Coins earned.`,
        "success"
      );
    } catch (error) {
      console.error("🚨 handleFileUpload Error:", error);
      addNotification("Failed to scan item. Please try again.", "error");
    } finally {
      setIsScanning(false);
    }
  };

  const getBinColor = (bin: string) => {
    switch (bin) {
      case "Blue Bin":
        return "text-blue-600 bg-blue-100";
      case "Green Bin":
        return "text-green-600 bg-green-100";
      case "Special Collection":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scan className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            AI Waste Scanner
          </h1>
          <p className="text-gray-600">
            Scan items to learn proper disposal methods and earn Green Coins
          </p>
        </div>

        {/* Scanning Interface */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center">
            {isScanning ? (
              <div className="py-16">
                <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-lg font-medium text-gray-700">
                  Analyzing item...
                </p>
                <p className="text-sm text-gray-500">
                  AI is identifying waste type and disposal method
                </p>
              </div>
            ) : (
              <div className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center space-y-3 p-6 border-2 border-dashed border-green-300 rounded-xl hover:border-green-400 hover:bg-green-50 transition-colors"
                  >
                    <Camera className="w-8 h-8 text-green-500" />
                    <span className="font-medium text-gray-700">Take Photo</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center space-y-3 p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-blue-500" />
                    <span className="font-medium text-gray-700">
                      Upload Image
                    </span>
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <p className="text-sm text-gray-500 mt-4">
                  Supports JPG, PNG formats. AI powered by YOLOv8.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scan Result */}
        {scannedItem && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-start space-x-4">
              <div className="text-6xl">{scannedItem.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {scannedItem.name}
                  </h2>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getBinColor(
                      scannedItem.bin
                    )}`}
                  >
                    {scannedItem.bin}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                    {scannedItem.category}
                  </span>
                  <span
                    className={`text-sm font-medium ${getSeverityColor(
                      scannedItem.severity
                    )}`}
                  >
                    Priority: {scannedItem.severity.toUpperCase()}
                  </span>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800 mb-1">
                        Disposal Instructions
                      </h3>
                      <p className="text-blue-700">{scannedItem.tips}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🪙</span>
                    <span className="font-bold text-green-600">
                      +{scannedItem.coins} Green Coins
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Scanned {scannedItem.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scan History */}
        {scanHistory.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Recent Scans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scanHistory.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getBinColor(
                          item.bin
                        )}`}
                      >
                        {item.bin}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600 font-medium">
                      +{item.coins} coins
                    </span>
                    <span className="text-gray-500">
                      {item.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WasteScanner;
