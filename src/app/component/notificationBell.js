"use client";
import { useEffect, useState } from 'react';
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {useRouter} from 'next/navigation';
import { onSnapshot } from "firebase/firestore";

const NotificationBell = ({ userId }) => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userNotificationsRef = collection(db, userId);

    const unsubscribe = onSnapshot(userNotificationsRef, (snapshot) => {
      const newNotifications = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return { id: doc.id, otp: docData.otp, clicked: docData.clicked || false };
      });

      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, [userId]);

  const unreadNotifications = notifications.filter((notification) => !notification.clicked);
  const newNotificationCount = unreadNotifications.length;

  const handleBellClick = async () => {
    // Mark all unread notifications as clicked
    const updatePromises = unreadNotifications.map((notification) => {
      const notificationRef = doc(db, userId, notification.id);

      return updateDoc(notificationRef, { clicked: true });
    });

    await Promise.all(updatePromises);
    router.push('/Notifications');
  };

  return (
    <div className="notification-bell" onClick={handleBellClick}>
      <i className="fa fa-bell"></i>
      <h1>notification</h1>
      {newNotificationCount > 0 && <span className="notification-count bg-red-400 rounded-full px-2">{newNotificationCount}</span>}
    </div>
  );
};

export default NotificationBell;
