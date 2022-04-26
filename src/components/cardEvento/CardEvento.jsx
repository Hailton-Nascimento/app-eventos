import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { storage } from "../../config/firebase";
import { ref,getDownloadURL } from "firebase/storage";

import "./cardEvento.css";

function CardEvento({ id, img, titulo, detalhes, visualizacoes }) {
	const [urlImagem, setUrlImagem] = useState();

	useEffect(() => {
        getDownloadURL(ref(storage,`imagens/${img}`))
        .then((url) => {
            setUrlImagem(url);
        });

	}, [urlImagem]);

	return (
		<div className=" card col-md-3 col-sm-12" key={id}>
			<img
				src={urlImagem}
				className="card-img-top img-cartao"
				alt="Imagem do Evento"
			/>

			<div className="card-body">
				<h5>{titulo}</h5>
				<p className="card-text text-justify">{detalhes}</p>

				<div className="rodape-card">
					<div className="">
						<Link
							to={"/eventodetalhes/" + id}
							className="btn btn-sm btn-detalhes"
						>
							+ detalhes
						</Link>
					</div>

					<div className="">
						<i className="fas fa-eye"></i> <span>{visualizacoes}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardEvento;
