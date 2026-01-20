import { Link } from "react-router";
import BagIcon from "./icons/BagIcon";

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export function Header({ cartCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm w-full">
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="group">
            <h1 className="text-xl sm:text-2xl font-light tracking-[0.3em] text-neutral-800 group-hover:text-neutral-600 transition-colors">
              MOBILE
            </h1>
          </Link>

          <button
            onClick={onCartClick}
            className="relative group flex items-center gap-3 cursor-pointer"
          >
            <span className="text-xs uppercase tracking-wider text-neutral-600 hidden sm:block font-light">
              My cart
            </span>
            <div className="relative">
              <BagIcon className="w-5 h-5 text-neutral-800 group-hover:text-neutral-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-400 text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
