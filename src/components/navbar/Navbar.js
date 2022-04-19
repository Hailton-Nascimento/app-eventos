import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
	const isLogado = useSelector((state) => state.usuarioLogado);
	const dispatch = useDispatch();
	return (
		<nav className="navbar navbar-expand-lg text-white">
			<i className="far fa-smile-wink text-white fa-2x mx-2"></i>
			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<i className="fas fa-bars text-white"></i>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav me-auto mb-2 mb-lg-0">
					<li className="nav-item">
						<Link className="nav-link" to="/">
							Home
						</Link>
					</li>
					{!isLogado ? (
						<>
							<li className="nav-item">
								<Link className="nav-link" to="/novousuario">
									Cadastrar
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/login">
									Login
								</Link>
							</li>
						</>
					) : (
						<>
							<li className="nav-item">
								<Link className="nav-link" to="/cadastroevento">
									Publicar Eventos
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/eventos/meus">
									Meus Eventos
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/"
									onClick={() => dispatch({ type: "LOG_OUT" })}
								>
									Sair
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
