import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GraduationCap, Moon, Sun, Menu, X } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { href: "/", label: "Home", id: "home" },
    { href: "/#about", label: "About", id: "about" },
    { href: "/#resources", label: "Resources", id: "resources" },
    { href: "/#contact", label: "Contact", id: "contact" },
  ];

  return (
    <nav className="bg-background shadow-sm sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center"
              data-testid="logo-link"
            >
              <GraduationCap className="text-primary-600 text-2xl mr-2" />
              <span className="text-xl font-bold text-foreground">Grammar Master</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`nav-${link.id}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              data-testid="theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button variant="ghost" data-testid="dashboard-link">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  Logout
                </Button>
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.firstName?.[0] || "U"}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" data-testid="login-button">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button data-testid="signup-button">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-muted-foreground block px-3 py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${link.id}`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 px-3 pt-2">
                  <Link href="/dashboard">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="mobile-dashboard-link"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                    data-testid="mobile-logout-button"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2 px-3 pt-2">
                  <Link href="/login">
                    <Button 
                      variant="ghost" 
                      className="flex-1"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="mobile-login-button"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button 
                      className="flex-1"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="mobile-signup-button"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
