import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {store,persistor} from "./store";
import { PersistGate } from "redux-persist/integration/react";
import './App.css'


// PAGINAS
import Login from "./views/login";
import NovoUsuario from "./views/novoUsuario";
import RecuperarSenha from "./views/recuperarSenha";
import Home from "./views/home";
import { Provider } from "react-redux";
import CadastroEvento from "./views/cadastroEvento";
import EventoDetalhes from "./views/eventoDetalhes";





function App() {
	
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/eventos/:user" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/novousuario" element={<NovoUsuario />} />
						<Route exact path="/recuperarsenha" element={<RecuperarSenha />} />
						<Route exact path="/cadastroevento" element={<CadastroEvento />} />
						<Route path="/eventodetalhes/:id" element={<EventoDetalhes />} />
						<Route path="/editarevento/:id" element={<CadastroEvento />} />

					</Routes>
				</Router>
			</PersistGate>
		</Provider>
	);
}

export default App;
