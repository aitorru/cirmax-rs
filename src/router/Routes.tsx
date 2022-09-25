import { Routes, Route, useNavigate } from '@solidjs/router';
import { listen } from '@tauri-apps/api/event';
import { createSignal } from 'solid-js';
import { lazy, onMount } from 'solid-js';

const LoginPage = lazy(() => import('../login/Login'));
const Home = lazy(() => import('../home/Home'));
const Config = lazy(() => import('../config/Config'));

export default function AppRoutes() {

	const navigate = useNavigate();
	const [showLoginToast, setShowLoginToast] = createSignal(false);

	onMount(() => {
		listen('config', () => navigate('/config'));
		listen('NOT-LOGGED', () => {
			setShowLoginToast(true);
			setTimeout(() => setShowLoginToast(false), 1500);
			navigate('/');
		});
	});

	const ErrorToastLoginError = () => {
		return (
			<div class='absolute min-w-[100vm] w-screen -z-10'>
				<div class={`${showLoginToast() ? 'translate-y-24': ''} relative top-[-6rem] duration-700 w-fit bg-red-700 h-fit transition-all z-10 p-5 rounded-b-lg mx-auto`}>
					<h1 class='text-xl font-extrabold text-white text-center'>No ha iniciado sesión</h1>
					<h2 class='text-lg font-bold text-white text-center'>Inicie sesión para poder continuar.</h2>
				</div>
			</div>
		);
	};

	return <div class='overflow-hidden'>
		<ErrorToastLoginError/>
		<Routes>
			<Route path="/" component={LoginPage} />
			<Route path="/home" component={Home}/>
			<Route path="/config" component={Config} />
		</Routes>
	</div>;
}