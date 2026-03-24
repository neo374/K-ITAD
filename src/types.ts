/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'EMITTER' | 'TRANSPORTER' | 'PROCESSOR' | 'GOVERNMENT' | 'ADMIN';

export interface Asset {
  id: string;
  serialNumber: string;
  tagNumber: string;
  type: 'SERVER' | 'PC' | 'NETWORK' | 'MOBILE' | 'OTHER';
  status: 'REGISTERED' | 'IN_TRANSIT' | 'PROCESSING' | 'DISPOSED' | 'RECYCLED';
  emissionDate: string;
  location: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  updatedAt: string;
}

export interface DashboardStats {
  totalAssets: number;
  inTransit: number;
  disposed: number;
  recycledRate: number;
  carbonReduced: number; // in kg
}
