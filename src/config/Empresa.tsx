import { Accessor } from 'solid-js';

export default function Empresa(props : {isEditing: boolean}) {
	return (
		<>
			<form class='grid grid-flow-row grid-cols-7 gap-2 items-center'>
				<label class="col-span-1 text-right after:content-[':']">N.I.F.</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
				<label class="col-span-1 text-right after:content-[':']">Razón social</label>
				<input type="text" class="col-span-6 p-1 border-2 border-gray-500 disabled:border-gray-300 rounded-lg" disabled={props.isEditing ? false : true} />
			</form>
		</>
	);
}