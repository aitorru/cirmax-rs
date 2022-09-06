import { Routes, Route } from '@solidjs/router';
import { lazy } from 'solid-js';

const LoginPage = lazy(() => import('../login/Login'));

export default function AppRoutes() {
	return <>
		<Routes>
			<Route path="/" component={LoginPage} />
			<Route path="/about" element={<div>This site was made with Solid</div>} />
		</Routes>
	</>;
}