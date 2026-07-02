import { api } from './client';
import type { Medicine, MedicineFilters, MedicinesResponse, Category } from '../types';

export const medicinesApi = {
  list: (filters?: MedicineFilters) =>
    api.get<MedicinesResponse>('medicines', filters as Record<string, string>),

  getById: (id: string) =>
    api.get<Medicine>(`medicines/${id}`),

  search: (query: string, page = 1, limit = 20) =>
    api.get<MedicinesResponse>('medicines', { search: query, page, limit }),

  getCategories: () =>
    api.get<Category[]>('medicines/categories'),

  getFeatured: () =>
    api.get<Medicine[]>('medicines/featured'),
};
