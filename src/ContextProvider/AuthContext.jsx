import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);

        const docRef = doc(db, "USERS", user.uid);
        // const snapshot = await getDoc(docRef);
        const unsubscribeDoc = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            const userProfile = doc.data();
            // Assuming the user's picture URL is stored under the field "pic"
            const userWithPic = {
              ...user,
              pic: userProfile.Pic, // Add the picture URL to the user object
            };
            setCurrentUser(userWithPic);
          } else {
            // Handle the case where the user document does not exist
            setCurrentUser(user);
          }
        });

        setLoading(false);

        return () => unsubscribeDoc();
      } else {
        setLoading(false);
        setCurrentUser(null);
      }

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, isNewUser, setIsNewUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
