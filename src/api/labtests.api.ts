import { api } from './client';
import type { LabTest, LabTestBooking, BookLabTestPayload } from '../types';

export const labtestsApi = {
  list: (category?: string, page = 1, limit = 20) =>
    api.get<{ data: LabTest[]; total: number }>('lab-tests', {
      ...(category && { category }),
      page,
      limit,
    }),

  getById: (id: string) =>
    api.get<LabTest>(`lab-tests/${id}`),

  book: (payload: BookLabTestPayload) =>
    api.post<LabTestBooking>('lab-tests/book', payload as unknown as Record<string, unknown>),

  getBookings: (page = 1, limit = 10) =>
    api.get<{ data: LabTestBooking[]; total: number }>('lab-tests/bookings', { page, limit }),

  getBookingById: (id: string) =>
    api.get<LabTestBooking>(`lab-tests/bookings/${id}`),

  cancelBooking: (id: string) =>
    api.patch<LabTestBooking>('lab-tests/cancel', { id }),
};
