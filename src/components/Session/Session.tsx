
import React, {createContext, useContext, useEffect, useState} from 'react'
import netlifyIdentity from 'netlify-identity-widget'

const SessionContext = createContext(null);

// Create a provider component
export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const currentUser = netlifyIdentity.currentUser();
    setUser(currentUser);
    setIsLoading(false);

    // Listen for login events
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Listen for logout events
    netlifyIdentity.on('logout', () => {
      setUser(null);
      setIsLoading(false);
    });

    // Cleanup listeners on unmount
    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);

  const login = () => {
    netlifyIdentity.open('login');
  };

  const signup = () => {
    netlifyIdentity.open('signup');
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
