import { Order, Address } from './types';

// Mock encryption/decryption to simulate secure storage (e.g., AES-256 in a real backend)
// This provides a layer of obfuscation in the browser's local storage.
const secureEncrypt = (data: any): string => {
  return btoa(encodeURIComponent(JSON.stringify(data)));
};

const secureDecrypt = (encryptedStr: string): any => {
  try {
    return JSON.parse(decodeURIComponent(atob(encryptedStr)));
  } catch (e) {
    return null;
  }
};

export const getOrders = (): Order[] => {
  try {
    const encrypted = localStorage.getItem('gp_secure_orders');
    if (!encrypted) return [];
    return secureDecrypt(encrypted) || [];
  } catch {
    return [];
  }
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  const encrypted = secureEncrypt([order, ...orders]);
  localStorage.setItem('gp_secure_orders', encrypted);
};

export const updateOrderStatus = (id: string, status: Order['status'], trackingId?: string) => {
  const orders = getOrders();
  const updated = orders.map(o => o.id === id ? { ...o, status, trackingId } : o);
  localStorage.setItem('gp_secure_orders', secureEncrypt(updated));
};

export const getAddresses = (): Address[] => {
  try {
    const encrypted = localStorage.getItem('gp_secure_addresses');
    if (!encrypted) return [];
    return secureDecrypt(encrypted) || [];
  } catch {
    return [];
  }
};

export const saveAddress = (address: Address) => {
  const addresses = getAddresses();
  localStorage.setItem('gp_secure_addresses', secureEncrypt([address, ...addresses]));
};
