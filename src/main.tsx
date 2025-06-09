import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import './style.css'
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Report from "./pages/Report";
import Movement from "./pages/Movement";
import Store from "./pages/Store";
import VehicleManager from "./pages/VehicleManager";
import Brand from "./pages/register/Brand";
import Car from "./pages/register/Car";
import Categoy from "./pages/register/Category";
import City from "./pages/register/City";
import Client from "./pages/register/Client";
import Color from "./pages/register/Color";
import Model from "./pages/register/Model";
import Type from "./pages/register/Type";
import AddMovement from "./pages/movement/AddMovement";
import SalesContract from "./pages/report/SalesContract";
import ConsignmentContract from "./pages/report/ConsignmentContract";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/home" element={<Home />} />
					<Route path="/register">
						<Route index element={<Register />} />
						<Route path="brand" element={<Brand />} />
						<Route path="car" element={<Car />} />
						<Route path="category" element={<Categoy />} />
						<Route path="city" element={<City />} />
						<Route path="client" element={<Client />} />
						<Route path="color" element={<Color />} />
						<Route path="model" element={<Model />} />
						<Route path="type" element={<Type />} />
					</Route>
					<Route path="/report">
						<Route index element={<Report />} />
						<Route path="sales-contract" element={<SalesContract />} />
						<Route path="consignment-contract" element={<ConsignmentContract />} />
					</Route>
					<Route path="/movement">
						<Route index element={<Movement />} />
						<Route path="add" element={<AddMovement />} />
					</Route>
					<Route path="/store" element={<Store />} />
					<Route path="/vehicle-manager" element={<VehicleManager />} />
				</Route>
			</Routes>
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 2000,
					style: {
						backgroundColor: "white",
						fontWeight: "500",
						color: 'black',
						borderRadius: '8px'
					},
				}}
			/>
		</AuthProvider>
	</BrowserRouter>
);
