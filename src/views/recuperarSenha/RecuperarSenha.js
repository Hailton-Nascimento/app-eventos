import React, { useState } from "react";
import "./recuperarSenha.css";
import Navbar from "../../components/navbar";

import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function RecuperarSenha() {
	const [email, setEmail] = useState();
	const [msg, setMsg] = useState();

	function recuperarSenha() {
		sendPasswordResetEmail(auth,email)
			.then((resultado) => {
				setMsg("Enviamos um link no seu email para você redefinir sua senha!");
			})
			.catch((erro) => {
				setMsg("Verifique se o email está correto!");
			});
	}

	return (
		<>
			<Navbar />
			<form className="text-center form-login mx-auto mt-5">
				<h3 className="mb-3 font-weight-bold">Recuperar Senha</h3>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					className="form-control my-2"
					placeholder="Email"
				/>

				<div className="msg my-4 text-center">
					<span>{msg}</span>
				</div>

				<button
					onClick={recuperarSenha}
					type="button"
					className="btn btn-lg btn-block btn-enviar"
				>
					Recuperar Senha
				</button>
			</form>
		</>
	);
}

export default RecuperarSenha;
