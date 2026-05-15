import api from './client';
export const getMotivation = () => api.get('/ai/motivation').then((r) => r.data);
export const getCoach = () => api.get('/ai/coach').then((r) => r.data);
export const getRiskAnalysis = () => api.get('/ai/risk-analysis').then((r) => r.data);
