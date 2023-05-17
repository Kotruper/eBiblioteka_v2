import { Link } from "react-router-dom"
import AuthService from "../services/auth.service"

export default function Navbar({user}){
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          E-Biblioteka v2
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/books"} className="nav-link">
              Books
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/author"} className="nav-link">
              Authors
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/tag"} className="nav-link">
              Tags
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/category"} className="nav-link">
              Categories
            </Link>
          </li>

          {(user?.role == "employee") && ( //Przykładowo
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {(user?.role == "admin") && ( //Przykładowo
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {user?.role && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {user ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {user.email}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={AuthService.logout}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    )
}