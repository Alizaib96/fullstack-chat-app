import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Settings } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <header className="fixed top-0 z-40 w-full border-b bg-base-100 backdrop-blur-lg bg-base100/80">
      <div className="container h-16 px-4 mx-auto">
        <div className="flex items-center justify-between h-full">
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="flex items-center justify-center rounded-full w-9 h-9 bg-primary">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Chatty</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/settings"
            className="transition-colors btn btn-sm hover:opacity-80"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
