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
	return session;
}

export const request = {
	get: function (services) {
		let token = renewSession();
		return axios.get(`${host}${services}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	},

	post: function (services, data) {
		let token = renewSession();
		return axios.post(`${host}${services}`, data, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	},
};