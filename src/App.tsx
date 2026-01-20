import { Outlet, ScrollRestoration } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { useCart } from "./context/CartContext";

function App() {
  const {
    cartCount,
    cartItems,
    isDrawerOpen,
    closeDrawer,
    openDrawer,
    removeFromCart,
  } = useCart();

  return (
    <div className="min-h-screen bg-white w-full">
      <ScrollRestoration />

      <Header cartCount={cartCount} onCartClick={openDrawer} />

      <main className="bg-white min-h-screen w-full">
        <Outlet />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        items={cartItems}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;
