import { invoke } from '@tauri-apps/api';
import { onMount } from 'solid-js';
import EmpresaClass from '../models/empresa.class';

export default function Empresa(props : {isEditing: boolean, ref: HTMLButtonElement | undefined}) {

	let empresa: EmpresaClass;

	onMount(async () => {
		invoke('log', {data: 'Entrando en onmount'});
		const result = await invoke('get_empresa_by_id', {id_empresa : 0});
		invoke('log', {data: result});
		empresa = {
			id: '',
			nif: '',
			razonsocial: ''

		};
	});

	return (
		<>
			<form class='grid grid-flow-row grid-cols-7 gap-2 items-center'>
				<label class="col-span-1 text-right after:content-[':']">N.I.F.</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
				<label class="col-span-1 text-right after:content-[':']">Razón social</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
				<label class="col-span-1 text-right after:content-[':']">Domicilio</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
				<label class="col-span-1 text-right after:content-[':']">Codigo Postal</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
				<label class="col-span-1 text-right after:content-[':']">Población</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
				<label class="col-span-1 text-right after:content-[':']">Provincia</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
				<label class="col-span-1 text-right after:content-[':']">Teléfono</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
				<label class="col-span-1 text-right after:content-[':']">Teléfono Móvil</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
				<label class="col-span-1 text-right after:content-[':']">Fax</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
				<label class="col-span-1 text-right after:content-[':']">Correo Electrónico</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
				<label class="col-span-1 text-right after:content-[':']">Coletilla RGPD</label>
				<textarea rows="3" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} ></textarea>
				<button class="hidden" ref={props.ref}></button>
			</form>
		</>
	);
}