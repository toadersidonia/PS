import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import "./App.css";

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  const navItem = (path: string, label: string) => (
    <Link
      to={path}
      className={location.pathname === path ? "nav-active" : "nav-item"}
    >
      {label}
    </Link>
  );

  return (
    <div className="app">

      <header className="navbar">
        <div className="nav-left">InstaClone</div>

        <nav className="nav-center">
          {navItem("/", "Feed")}
          {navItem("/moderator", "Moderator")}
        </nav>

        <div className="nav-right">
          <div className="avatar">U</div>
        </div>
      </header>

      <main className="content">{children}</main>

    </div>
  );
}