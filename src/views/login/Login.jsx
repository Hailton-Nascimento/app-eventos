import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./login.css";

import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";

function Login() {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [msgTipo, setMsgTipo] = useState("");
	const [loading, setLoading] = useState("");

	const dispatch = useDispatch();
	const isLogado = useSelector((state) => state.usuarioLogado);

	function logar() {
		if (!email || !senha) {
			return
		}

		setLoading(true)

		signInWithEmailAndPassword(auth, email, senha)
			.then((_) => {
				setMsgTipo("sucesso");
				setTimeout(() => {
					dispatch({ type: "LOG_IN", usuarioEmail: email });
				}, 500);
			})
			.catch((erro) => {
				setMsgTipo("erro");
			});
	}

	return (
		<>
			{isLogado && <Navigate to="/" />}
			<div className="login-content d-flex align-items-center">
				<form className="form-signin mx-auto">
					<div className="text-center mb-4">
						<i className="far fa-smile-wink text-white fa-5x"></i>
						<h3 className=" mb-3 font-weight-normal text-white font-weight-bold">
							Login
						</h3>
					</div>

					<input
						onChange={({ target: { value } }) => setEmail(value)}
						type="email"
						id="inputEmail"
						className="form-control my-2"
						placeholder="Email"
					/>
					<input
						onChange={({ target: { value } }) => setSenha(value)}
						type="password"
						id="inputPassword"
						className="form-control my-2"
						placeholder="Senha"
					/>



					<button
						onClick={logar}
						className={`btn btn-lg btn-block btn-login ${loading && "disabled"}`}
						type="button"
					>
						Logar
					</button>
					{

						loading &&
						<div className=" text-center container-spinner">
							<div className="spinner-border text-warning" role="status">
								<span className="sr-only"></span>
							</div>
						</div>
					}

					<div className="msg-login text-white text-center my-5">
						{msgTipo === "sucesso" && (
							<span>
								<strong>WoW!</strong> Você está conectado! &#128526;{" "}
							</span>
						)}
						{msgTipo === "erro" && (
							<span>
								<strong>Ops!</strong> Verifique se a senha ou usuário estão
								corretos! &#128546;{" "}
							</span>
						)}
					</div>

					<div className="opcoes-login mt-5 text-center">
						<Link to="/recuperarsenha" className="mx-2">
							Recuperar Senha
						</Link>
						<span className="text-white">&#9733;</span>
						<Link to="/novousuario" className="mx-2">
							Quero Cadastrar
						</Link>
					</div>
				</form>
			</div>
		</>
	);
}

export default Login;
