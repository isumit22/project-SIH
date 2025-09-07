import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type?: "success" | "error" | "info" | "warning") => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // ✅ Add new notification
  const addNotification = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date(),
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  // ✅ Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // (Optional) Demo rotating notifications — keep if you want auto notifications
  useEffect(() => {
    const demoNotifications: Notification[] = [
      { id: "1", message: "Your garbage collection was successful today!", type: "success", timestamp: new Date() },
      { id: "2", message: "Reminder: Waste pickup scheduled for 6 PM.", type: "info", timestamp: new Date() },
      { id: "3", message: "You earned 10 Green Coins for recycling!", type: "success", timestamp: new Date() },
      { id: "4", message: "Join the Plastic-Free Week challenge starting tomorrow!", type: "warning", timestamp: new Date() },
    ];

    let currentIndex = 0;
    setNotifications(demoNotifications.slice(0, 2));

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 2) % demoNotifications.length;
      setNotifications(demoNotifications.slice(currentIndex, currentIndex + 2));
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

// ✅ Hook
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
