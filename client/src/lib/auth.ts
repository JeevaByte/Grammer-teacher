import { type User } from "@shared/schema";

interface AuthState {
  user: User | null;
  token: string | null;
}

class AuthManager {
  private state: AuthState = {
    user: null,
    token: null,
  };

  private listeners: Array<(state: AuthState) => void> = [];

  constructor() {
    // Load from localStorage on initialization
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("auth_user");
    
    if (token && user) {
      try {
        this.state = {
          token,
          user: JSON.parse(user),
        };
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    }
  }

  getState(): AuthState {
    return this.state;
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  login(user: User, token: string) {
    this.state = { user, token };
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));
    this.notify();
  }

  logout() {
    this.state = { user: null, token: null };
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    this.notify();
  }

  getAuthHeaders() {
    if (!this.state.token) {
      return {};
    }
    
    return {
      Authorization: `Bearer ${this.state.token}`,
    };
  }

  isAuthenticated(): boolean {
    return !!this.state.token && !!this.state.user;
  }

  isTeacher(): boolean {
    return this.state.user?.role === "teacher";
  }

  isStudent(): boolean {
    return this.state.user?.role === "student";
  }
}

export const authManager = new AuthManager();

// React hook for using auth state
import { useState, useEffect } from "react";

export function useAuth() {
  const [authState, setAuthState] = useState(authManager.getState());

  useEffect(() => {
    const unsubscribe = authManager.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  return {
    user: authState.user,
    token: authState.token,
    isAuthenticated: authManager.isAuthenticated(),
    isTeacher: authManager.isTeacher(),
    isStudent: authManager.isStudent(),
    login: authManager.login.bind(authManager),
    logout: authManager.logout.bind(authManager),
    getAuthHeaders: authManager.getAuthHeaders.bind(authManager),
  };
}
