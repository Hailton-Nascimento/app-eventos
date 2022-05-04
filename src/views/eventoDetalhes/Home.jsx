import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import { useSelector } from "react-redux";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

import "./home.css";
import CardEvento from "../../components/cardEvento";

function Home() {
	const { user } = useParams();
	const [eventos, setEventos] = useState([]);
	const [pesquisa, setPesquisa] = useState("");

	const { usuarioEmail } = useSelector((state) => state);
	

	useEffect(() => {
		const listaEventos = [];

		if (user) {
		
			const q = query(
				collection(db, "eventos"),
				where("usuario", "==", usuarioEmail)
			);
			getDocs(q).then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					if (
						doc.data().titulo.toLowerCase().indexOf(pesquisa.toLowerCase()) >= 0
					) {
						listaEventos.push({
							id: doc.id,
							...doc.data(),
						});
					}
				});
				setEventos(listaEventos);
			});
		} else {
			const q = query(collection(db, "eventos"));
			getDocs(q).then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					if (
						doc.data().titulo.toLowerCase().indexOf(pesquisa.toLowerCase()) >= 0
					) {
						listaEventos.push({
							id: doc.id,
							...doc.data(),
						});
					}
				});
				setEventos(listaEventos);
			});
		}

	}, [pesquisa, user,usuarioEmail]);

	return (
		<>
			<Navbar />
			<div className="row p-3 ">
				<h2 className="mx-auto p-3">Eventos Publicados</h2>
				<input
					onChange={({ target: { value } }) => setPesquisa(value)}
					type="text"
					className="form-control text-center"
					placeholder="Pesquisar evento pelo título..."
				/>
			</div>

			<div className="row p-3">
				{eventos.map((item) => (
					<CardEvento
						key={item.id}
						id={item.id}
						img={item.foto}
						titulo={item.titulo}
						detalhes={item.detalhes}
						visualizacoes={item.visualizacoes}
					/>
				))}
			</div>
		</>
	);
}
export default Home;
