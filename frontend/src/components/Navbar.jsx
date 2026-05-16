import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const logoutHandler = async () => {
    await logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 shadow-md absolute top-0 left-0 w-full z-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <Link to="/" className="text-xl font-bold tracking-wide">
            ShopEase
          </Link>
          <p className="text-sm text-slate-300">
            Easy shopping with product images and cart support.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-slate-700" to="/">
            Home
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-slate-700" to="/cart">
            Cart
          </Link>
          {user?.role === "admin" && (
            <Link className="rounded-md px-3 py-2 text-sm hover:bg-slate-700" to="/add-product">
              Add Product
            </Link>
          )}
          {!user ? (
            <>
              <Link className="rounded-md px-3 py-2 text-sm hover:bg-slate-700" to="/login">
                Login
              </Link>
              <Link className="rounded-md px-3 py-2 text-sm hover:bg-slate-700" to="/signup">
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-300">
                {user.name}
              </span>
              <button
                onClick={logoutHandler}
                className="rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
       