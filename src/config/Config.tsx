import { createSignal, lazy, Match, Switch } from 'solid-js';

const Empresa = lazy(() => import('./Empresa'));

export default function Config() {

	const [isEditing, setIsEditing] = createSignal(false);
	const [showEmpresa, setShowEmpresa] = createSignal(true); // Mostrar empresa de default
	const [showPresupuesto, setShowPresupuestos] = createSignal(false);
	const [showFactura, setShowFactura] = createSignal(false);

	const handleEditing = () => {
		setIsEditing(true);
	};

	return (
		<div>
			{/* Header */}
			<div class='border-b-2 border-gray-500/20 w-screen h-fit'>
				<div class="flex flex-row p-5">
					<button class="rounded p-2 px-5 bg-teal-700 disabled:bg-teal-700/50 text-white font-bold" 
						disabled={isEditing() ? true : false} 
						onclick={() => handleEditing()}>
						Editar
					</button>
					<div class="flex-grow"></div>
					<button class="rounded-l p-2 bg-teal-700 disabled:bg-teal-700/50 text-white font-bold" disabled={!isEditing() ? true : false}>Validar</button>
					<button class="rounded-r p-2 bg-red-700 disabled:bg-red-700/50 text-white font-bold" 
						disabled={!isEditing() ? true : false} 
						onclick={() => setIsEditing(false)}>
						Cancelar
					</button>
					<button class="ml-5 p-2 px-5 float-right rounded text-white font-bold bg-red-700 disabled:bg-red-700/50" disabled={isEditing() ? true : false}>Salir</button>
				</div>
			</div>
			{/* main body */}
			<div class="container mx-auto mt-5">
				<div class='grid grid-flow-col'>
					<h2 class={`${showEmpresa() ? 'font-bold' : 'border-b-2'} text-center border-t-2 border-x-2 rounded-t-lg`}>Empresa</h2>
					<h2 class={`${showPresupuesto() ? 'font-bold' : 'border-b-2'} text-center border-t-2 border-x-2 rounded-t-lg`}>Presupuesto</h2>
					<h2 class={`${showFactura() ? 'font-bold' : 'border-b-2'} text-center border-t-2 border-x-2 rounded-t-lg`}>Facturas</h2>
				</div>
				<div class='rounded-b-lg border-x-2 border-b-2 p-2'>
					<Switch>
						<Match when={showEmpresa()}>
							<Empresa isEditing={isEditing()} />
						</Match>
					</Switch>
				</div>
			</div>
		</div>
	);
}