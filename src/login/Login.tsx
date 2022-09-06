import Logo from '../assets/logo.webp';

import { exit } from '@tauri-apps/api/process';
import { invoke } from '@tauri-apps/api/tauri';
import { createSignal } from 'solid-js';
import { Spinner } from '../assets/Spinner';
import { sendNotification } from '@tauri-apps/api/notification';

export default function LoginPage() {

	const [user, setUser] = createSignal('');
	const [password, setPassword] = createSignal('');
	const [loading, setLoading] = createSignal(false);

	const sendLogin = async () => {


		setLoading(true);
		const response = await invoke('login', {username: user(), password: password()});
		if (!response) {
			sendNotification('Identificación fallida.');
		}
		setLoading(false);
		await invoke('log', {data: `${response}`});
	};
	return (
		<div class="container md:mx-auto flex w-screen h-screen justify-center content-center items-center">
			<img src={Logo} alt="Logo" class="p-5 absolute left-5 top-5" />
			<div class='shadow-2xl rounded-lg min-w-[256px] w-fit min-h-[256px]'>
				<h1 class='text-center text-2xl font-black pt-5 text-teal-800'>CLÍNICA DENTAL</h1>
				<h2 class='text-center text-xl font-bold px-5 pt-1 pb-5 text-teal-600'>GARCÍA RUIZ & IGLESIAS ESQUIROZ</h2>
				<div class='w-10/12 mx-auto my-5'>
					<form onsubmit={(e) => e.preventDefault()} class='flex gap-5 justify-center flex-col'>
						<div class='flex gap-3 justify-center flex-col'>
							<h3>Usuario</h3>
							<input type="text" class='invalid:border-red-500 invalid:text-red-600 border-2 focus:border-sky-400 p-2 rounded' placeholder='Usuario...' maxLength={8} required value={user()} oninput={(e) => setUser(e.currentTarget.value)}  />
							{/* Logitud de 8 caratecteres */}
						</div>
						<div class='flex gap-3 justify-center flex-col border-t-2 pt-2'>
							<h3>Contraseña</h3>
							<input type="password" class='invalid:border-red-500 invalid:text-red-600 border-2 focus:border-sky-400 p-2 rounded' placeholder='Contraseña...' required value={password()} oninput={(e) => setPassword(e.currentTarget.value)} />
						</div>
						<div class='flex flex-col w-full gap-3'>
							<button class='bg-sky-400 py-3 rounded text-white font-bold hover:scale-105 transition-transform ease-in-out flex flex-row gap-5 justify-center' type='submit' onclick={() => sendLogin()}>Iniciar sesión {loading() ? <Spinner/> : null}</button>
							<div class='grid grid-cols-2 gap-2'>
								<button class='bg-red-400 py-1 rounded text-white font-bold hover:scale-105 transition-transform ease-in-out' onclick={() => exit(0)}>Cancelar</button>
								<button disabled class='bg-teal-400/50 py-1 rounded text-white font-bold transition-transform ease-in-out cursor-not-allowed'>Cambiar contraseña</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}