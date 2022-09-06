/* @refresh reload */
import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import AppRoutes from './router/Routes';

import './style.css';

render(() => <Router><AppRoutes /></Router>, document.getElementById('root') as HTMLElement);
