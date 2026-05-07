export interface ContactFormData {
  name: string;
  email: string;
  reason: string;
  message: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role?: string;
  description?: string;
  githubUrl?: string;
}

export type FormErrors = {
  name?: string;
  email?: string;
  reason?: string;
  message?: string;
};

// Para el historial de mensajes
export interface StoredMessage extends ContactFormData {
  id: string; 
  date: string;
}
