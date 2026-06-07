import type { Response } from "express";

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
}

export const ok = <T>(res: Response, data: T, status = 200) =>
  res.status(status).json({ success: true, data } satisfies ApiSuccess<T>);

export const fail = (res: Response, status: number, message: string, details?: unknown) =>
  res.status(status).json({
    success: false,
    error: { message, ...(details !== undefined ? { details } : {}) },
  } satisfies ApiError);
