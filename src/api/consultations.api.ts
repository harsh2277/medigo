import { api } from './client';
import type { Doctor, Consultation, BookConsultationPayload, TimeSlot } from '../types';

export const consultationsApi = {
  listDoctors: (specialization?: string, page = 1, limit = 20) =>
    api.get<{ data: Doctor[]; total: number }>('consultations/doctors', {
      ...(specialization && { specialization }),
      page,
      limit,
    }),

  getDoctorById: (id: string) =>
    api.get<Doctor>(`consultations/doctors/${id}`),

  getAvailableSlots: (doctor_id: string, date: string) =>
    api.get<TimeSlot[]>('consultations/slots', { doctor_id, date }),

  book: (payload: BookConsultationPayload) =>
    api.post<Consultation>('consultations/book', payload as unknown as Record<string, unknown>),

  list: (page = 1, limit = 10) =>
    api.get<{ data: Consultation[]; total: number }>('consultations', { page, limit }),

  getById: (id: string) =>
    api.get<Consultation>(`consultations/${id}`),

  cancel: (id: string) =>
    api.patch<Consultation>('consultations/cancel', { id }),
};
