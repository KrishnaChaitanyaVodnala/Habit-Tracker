import api from './client';
export const getTimeline = () => api.get('/analytics/timeline').then((r) => r.data);
