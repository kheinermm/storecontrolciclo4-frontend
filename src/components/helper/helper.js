import { isUndefined } from 'util';
import axios from 'axios';
import Cookies from 'universal-cookie/es6';
import { APIHOST as host } from '../../App.json';

const cookies = new Cookies();

export function calculaExpiracionSesion() {
	const now = new Date().getTime();
	const newDate = now + 60 * 30 * 1000;
	return new Date(newDate);
}

export function getSession() {
	return isUndefined(cookies.get('_s')) ? false : cookies.get('_s');
}

function renewSession() {
	const session = getSession();
	if (!session) { window.location.href = '/login'; }

	cookies.set('_s', session, {
		path: '/',
		expires: calculaExpiracionSesion()
	});
}

export const request = {
	get: function (services) {
		renewSession();
		return axios.get(`${host}${services}`);
		// return axios.get(`${host}/${services}`);
	}
};