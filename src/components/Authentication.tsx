import { useEffect, useState } from 'react';
import { Navbars } from './Navbar';
import { UserNavbar } from './UserNavbar';
import { onAuthStateChanged, User } from 'firebase/auth';
//@ts-ignore
import { auth } from "../config/firebase";

const Authentication = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  useEffect(() => {
    const listenerAuth = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setAuthenticatedUser(user);
      } else {
        setAuthenticatedUser(null);
      }
    });

    return () => {
      listenerAuth();
    };
  }, []);

  return (
    <>
      {authenticatedUser === null ? (
        <>
          <Navbars />
        </>
      ) : (
        <>
          {authenticatedUser.emailVerified ? (
            <UserNavbar />
          ) : (
            <Navbars />
          )}
        </>
      )}
    </>
  );
};

export default Authentication;
