import { NextResponse } from "next/server";

export type ApiSuccess<T> = { success: true; data: T; message: null };
export type ApiFailure = { success: false; error: { code: string; message: string } };
export function apiSuccess<T>(data: T, status = 200): NextResponse<ApiSuccess<T>> {
  return NextResponse.json({ success: true, data, message: null }, { status });
}
export function apiError(code: string, message: string, status: number): NextResponse<ApiFailure> {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}
