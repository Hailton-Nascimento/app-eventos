import React, { useState, useEffect } from "react";
import "./eventoDetalhes.css";
import { Link, Navigate, useParams } from "react-router-dom";
import { db, storage } from "../../config/firebase";
import { useSelector } from "react-redux";
import { ref, getDownloadURL } from "firebase/storage";

import { doc, getDoc, writeBatch } from "firebase/firestore";
import Navbar from "../../components/navbar";

function EventoDetalhes(props) {
	const [evento, setEvento] = useState({});
	const [urlImg, setUrlImg] = useState("");
	const usuario = useSelector((state) => state.usuarioEmail);

	const [loading, setLoading] = useState(true);
	const [excluido, setExcluido] = useState(false);
	const { id } = useParams();

	const batch = writeBatch(db);
	const docRef = doc(db, "eventos", id);

	useEffect(() => {
		setLoading(true)
		getDoc(docRef).then((doc) => {
			const data = doc.data();
			setEvento({ ...data });
			batch.update(docRef, { visualizacoes: ++data.visualizacoes });
			batch.commit();

			getDownloadURL(ref(storage, `imagens/${data.foto}`)).then((url) => {
				setUrlImg(url);
				setLoading(false);
			});

			console.log(evento);
		});
	}, [id]);

	if (loading) {
		return (
			<>
				<Navbar />
				<div className="text-center">
					<div className="spinner spinner-border  text-warning  m-5" role="status">
						<span className="sr-only"></span>
					</div>
				</div>
			</>
		);
	}

	if (excluido) {
		return <Navigate replace to="/" />;
	}

	return (
		<>
			<Navbar />
			{/* <Toaster /> */}

			<div className="container-fluid">
				<div className="row">
					<img src={urlImg} className="img-banner" alt="Foto" />
					<div className="eye">
						<i className="fas fa-eye" />
						<span>{evento.visualizacoes+1}</span>
					</div>
				</div>

				<div className="row  d-flex justify-content-around">
					<h3 className="text-center   titulo">
						<strong>{evento.titulo}</strong>
					</h3>
					<div className="col-md-3 col-sm-12 box-info p-3 my-2">
						<i className="fas fa-ticket-alt fa-2x"></i>
						<h4>
							<strong>Tipo</strong>
						</h4>
						<span className="mt-3">{evento.tipo}</span>
					</div>

					<div className="col-md-3 col-sm-12 box-info p-3 my-2">
						<i className="fas fa-calendar-alt fa-2x"></i>
						<h4>
							<strong>Data</strong>
						</h4>
						<span className="mt-3">{evento.data}</span>
					</div>

					<div className="col-md-3 col-sm-12 box-info p-3 my-2">
						<i className="fas fa-clock fa-2x"></i>
						<h4>
							<strong>Hora</strong>
						</h4>
						<span className="mt-3">{evento.hora}</span>
					</div>
				</div>

				<div className=" row box-detalhes my-5">
					<div className="col-12 text-center">
						<h5 className=" detalhes">
							<strong>Detalhes do Evento</strong>
						</h5>
					</div>
					<div className="col-12 text-center">
						<p>{evento.detalhes}</p>
					</div>
				</div>

				{usuario === evento.usuario && (
					<Link to={`/editarevento/${id}`} className="btn-editar">
						<i className="fas fa-pen-square fa-3x"></i>
					</Link>
				)}

				{usuario === evento.usuario && (
					<button type="button" className="btn btn-lg  mt-3 mb-5 btn-deletar">
						Remover Evento
					</button>
				)}
			</div>
		</>
	);
}

export default EventoDetalhes;
