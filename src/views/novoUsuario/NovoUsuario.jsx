import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import Navbar from '../../components/navbar/';

import "./novoUsuario.css";
import Navbar from "../../components/navbar";

function NovoUsuario() {
	const [email, setEmail] = useState();
	const [senha, setSenha] = useState();
	const [msgTipo, setMsgTipo] = useState();
	const [msg, setMsg] = useState();
	const [carregando, setCarregando] = useState();

	function cadastrar() {
		setCarregando(true);
		setMsgTipo(null);

		if (!email || !senha) {
			setMsgTipo("erro");
			setMsg("Você precisa informar o email e senha para fazer o cadastro!");
			setCarregando(false);
			return;
		}

		createUserWithEmailAndPassword(auth, email, senha)
			.then((resultado) => {
				setCarregando(false);
				setMsgTipo("sucesso");
			})
			.catch((erro) => {
				setCarregando(false);
				setMsgTipo("erro");

				switch (erro.message) {
					case "Firebase: Password should be at least 6 characters (auth/weak-password).":
						setMsg("A senha deve ter pelo menos 6 caracteres!");
						break;
					case "Firebase: The email address is already in use by another account. (auth/email-already-in-use).":
						setMsg("Este email já está sendo utilizado por outro usuário!");
						break;
					case "Firebase: The email address is badly formatted. (auth/invalid-email).":
						setMsg("O formato do seu email é inválido!");
						break;
					default:
						setMsg("Não foi possível cadastrar. Tente novamente mais tarde!");
						break;
				}
			});
	}

	return (
		<>
			<Navbar />
			<div className="form-cadastro">
				<form className="text-center form-login mx-auto mt-5">
					<h3 className="h3 mb-3  font-weight-bold">Cadastro</h3>

					<input
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						className="form-control my-3"
						placeholder="Email"
					/>
					<input
						onChange={(e) => setSenha(e.target.value)}
						type="password"
						className="form-control my-3"
						placeholder="Senha"
					/>

					{carregando ? (
						<div className=" text-center container-spinner">
							<div className="spinner-border text-warning" role="status">
								<span className="sr-only"></span>
							</div>
						</div>
					) : (
						<button
							onClick={cadastrar}
							type="button"
							className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
						>
							Cadastrar
						</button>
					)}

					<div className="msg-login text-black text-center my-5">
						{msgTipo === "sucesso" && (
							<span>
								<strong>WoW!</strong>Usuário cadastrado com sucesso! &#128526;{" "}
							</span>
						)}
						{msgTipo === "erro" && (
							<span>
								<strong>Ops!</strong> {msg} &#128546;{" "}
							</span>
						)}
					</div>
				</form>
			</div>
		</>
	);
}

export default NovoUsuario;
