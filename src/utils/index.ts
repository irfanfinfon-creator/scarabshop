import { Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { ORDER_STATUS } from '../constants';

/**
 * Format currency amount
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date and time to readable string
 */
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US');
}

/**
 * Get status icon for order status
 */
export function getStatusIcon(status: string) {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return Package;
    case ORDER_STATUS.PROCESSING:
      return Package;
    case ORDER_STATUS.SHIPPED:
      return Truck;
    case ORDER_STATUS.DELIVERED:
      return CheckCircle;
    case ORDER_STATUS.CANCELLED:
      return XCircle;
    default:
      return Package;
  }
}

/**
 * Get status color class for order status
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    case ORDER_STATUS.PROCESSING:
      return 'bg-blue-100 text-blue-800';
    case ORDER_STATUS.SHIPPED:
      return 'bg-blue-100 text-blue-800';
    case ORDER_STATUS.DELIVERED:
      return 'bg-green-100 text-green-800';
    case ORDER_STATUS.CANCELLED:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Get product image URL with fallback
 */
export function getProductImage(images: string[] | string | null | undefined): string {
  if (!images) {
    return 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400';
  }

  if (Array.isArray(images)) {
    return images.length > 0 ? images[0] : 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400';
  }

  if (typeof images === 'string') {
    return images;
  }

  return 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400';
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}