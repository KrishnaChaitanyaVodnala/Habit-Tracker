import api from './client';

export const getHabits = () => api.get('/habits').then((r) => r.data);
export const createHabit = (data) => api.post('/habits', data).then((r) => r.data);
export const updateHabit = (id, data) => api.put(`/habits/${id}`, data).then((r) => r.data);
export const deleteHabit = (id) => api.delete(`/habits/${id}`).then((r) => r.data);
export const trackHabit = (id) => api.post(`/habits/${id}/track`).then((r) => r.data);
export const getDashboard = () => api.get('/dashboard/dashboard').then((r) => r.data);
