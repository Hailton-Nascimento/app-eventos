import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./cadastroEvento.css";

import { storage, db } from "../../config/firebase";

import { ref, uploadBytes } from "firebase/storage";
import {
	collection,
	addDoc,
	doc,
	getDoc,
	writeBatch,
} from "firebase/firestore";
import Navbar from "../../components/navbar";

function CadastroEvento(props) {
	const [redirecionar, setRedirecionar] = useState();
	const [loading, setLoading] = useState();
	const [msgTipo, setMsgTipo] = useState();
	const [titulo, setTitulo] = useState();
	const [tipo, setTipo] = useState();
	const [detalhes, setDetalhes] = useState();
	const [data, setData] = useState();
	const [hora, setHora] = useState();
	const [visualizacoes, setVisualizacoes] = useState(0);
	const [fotoAtual, setFotoAtual] = useState();
	const [fotoNova, setFotoNova] = useState();
	const usuarioEmail = useSelector((state) => state.usuarioEmail);
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			setLoading(true);

			const docRef = doc(db, "eventos", id);
			getDoc(docRef).then((doc) => {
				const { titulo, tipo, detalhes, data, hora, foto, visualizacoes } =
					doc.data();
				setTitulo(titulo);
				setTipo(tipo);
				setDetalhes(detalhes);
				setData(data);
				setHora(hora);
				setFotoAtual(foto);
				setVisualizacoes(visualizacoes);
				setLoading(false);
				console.log("evento");
			});
		}
	}, [id]);

	function atualizar() {
		const batch = writeBatch(db);
		const docRef = doc(db, "eventos", id);
		setMsgTipo(null);
		setLoading(1);
		if (fotoNova) {
			const storageRef = ref(storage, `imagens/${fotoNova.name}`);
			uploadBytes(storageRef, fotoNova);
		}

		batch.update(docRef, {
			titulo,
			tipo,
			detalhes,
			data,
			hora,
			usuario: usuarioEmail,
			visualizacoes,
			foto: fotoNova ? fotoNova.name : fotoAtual,
			publico: true,
			created_at: new Date(),
		});
		batch
			.commit()
			.then(() => {
				setMsgTipo("sucesso");
				setLoading(0);
				setTimeout(() => {
					setRedirecionar(true);
				}, 1000);
			})
			.catch((erro) => {
				setMsgTipo("erro");
				setLoading(0);
			});
	}

	function cadastrar() {
		setMsgTipo(null);
		setLoading(1);

		const storageRef = ref(storage, `imagens/${fotoNova.name}`);
		uploadBytes(storageRef, fotoNova)
			.then(() => {
				addDoc(collection(db, "eventos"), {
					titulo: titulo,
					tipo: tipo,
					detalhes: detalhes,
					data: data,
					hora: hora,
					usuario: usuarioEmail,
					visualizacoes,
					foto: fotoNova.name,
					publico: 1,
					criacao: new Date(),
				});
			})
			.then(() => {
				setMsgTipo("sucesso");
				setLoading(0);
				setTimeout(() => {
					setRedirecionar(true);
				}, 1000);
			})
			.catch((erro) => {
				setMsgTipo("erro");
				setLoading(0);
			});
	}

	return (
		<>
	
			{redirecionar && <Navigate to="/eventos/:id" />}
			<Navbar />
			<div className="cadastro-evento-container col-12 mt-5">
				<div className=" text-center row">
					<h3 className=" font-weight-bold">
						{id ? "Atualizar Evento" : "Novo Evento"}
					</h3>
				</div>

				<form>
					<div className="form-group">
						<label>Título:</label>
						<input
							onChange={({ target: { value } }) => setTitulo(value)}
							type="text"
							className="form-control"
							value={titulo}
						/>
					</div>

					<div className="form-group">
						<label>Tipo do Evento:</label>
						<select
							onChange={({ target: { value } }) => setTipo(value)}
							className="form-control"
							value={tipo && tipo}
						>
							<option disabled selected>
								-- Selecione um tipo --
							</option>
							<option>Festa</option>
							<option>Teatro</option>
							<option>Show</option>
							<option>Evento</option>
						</select>
					</div>

					<div className="form-group">
						<label>Descrição do Evento:</label>
						<textarea
							onChange={({ target: { value } }) => setDetalhes(value)}
							className="form-control"
							rows="3"
							value={detalhes && detalhes}
						/>
					</div>

					<div className="form-group row">
						<div className="col-6">
							<label>Data:</label>
							<input
								onChange={({ target: { value } }) => setData(value)}
								type="date"
								className="form-control"
								value={data && data}
							/>
						</div>

						<div className="col-6">
							<label>Hora:</label>
							<input
								onChange={({ target: { value } }) => setHora(value)}
								type="time"
								className="form-control"
								value={hora && hora}
							/>
						</div>
					</div>

					<div className="form-group">
						<label>
							Upload da Foto{" "}
							{id &&
								"(caso queira manter a mesma foto, não precisa escolher uma nova imagem!)"}
							:
						</label>
						<input
							onChange={({ target: { files } }) => setFotoNova(files[0])}
							type="file"
							className="form-control"
						/>
					</div>

					<div className="row">
						{loading > 0 ? (<div className=" text-center">
							<div className="spinner-border text-warning" role="status">
								<span className="sr-only"></span>
							</div>
							</div>
						) : (
							<button
								onClick={id ? atualizar : cadastrar}
								type="button"
								className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
							>
								{id ? "Atualizar Evento" : "Publicar Evento"}
							</button>
						)}
					</div>
				</form>

				<div className="msg-login text-center mt-2">
					{msgTipo === "sucesso" && (
						<span>
							<strong>WoW!</strong> Evento Publicado &#128526;
						</span>
					)}

					{msgTipo === "erro" && (
						<span>
							<strong>Ops!</strong> Não foi possível publicar o evento!
							&#128546;
						</span>
					)}
				</div>
			</div>
		</>
	);
}

export default CadastroEvento;
