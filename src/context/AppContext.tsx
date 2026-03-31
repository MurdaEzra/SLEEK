import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedProducts, type Product, type ProductCategory } from '../lib/products';

export type UserRole = 'admin' | 'client';
export type ThemeMode = 'dark' | 'light';

export interface UserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  avatar: string;
  loyaltyTier?: string;
}

export interface CartItem {
  productId: string;
  size: string;
  quantity: number;
  addedAt: string;
}

interface LoginInput {
  email: string;
  password: string;
  role: UserRole;
}

interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

interface ProductInput {
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  description: string;
  sizes: string[];
  isNew?: boolean;
  discountPercent?: number;
}

interface AppContextValue {
  isReady: boolean;
  products: Product[];
  users: UserProfile[];
  currentUser: UserProfile | null;
  cart: CartItem[];
  theme: ThemeMode;
  login: (input: LoginInput) => Promise<{ success: boolean; message: string }>;
  registerClient: (
    input: RegisterInput
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  toggleTheme: () => void;
  addToCart: (productId: string, size: string) => Promise<{ success: boolean; message: string }>;
  createProduct: (input: ProductInput) => Promise<void>;
  updateProduct: (productId: string, input: ProductInput) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  applyDiscount: (productId: string, discountPercent: number) => Promise<void>;
}

const STORAGE_KEY = 'sleek-admin-client-experience';

const seededUsers: UserProfile[] = [
  {
    id: 'admin-1',
    role: 'admin',
    fullName: 'Ariana Vale',
    email: 'admin@sleekstudio.com',
    password: 'Admin@123',
    phone: '+1 (212) 555-0199',
    address: '870 Mercer Street, New York, NY',
    avatar: '/LOGO.png'
  },
  {
    id: 'client-1',
    role: 'client',
    fullName: 'Naomi Brooks',
    email: 'client@sleekstudio.com',
    password: 'Client@123',
    phone: '+1 (646) 555-0148',
    address: '45 Crosby Street, New York, NY',
    avatar: '/IMG_20251225_201231_401.png',
    loyaltyTier: 'Private Client'
  }
];

const AppContext = createContext<AppContextValue | undefined>(undefined);

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [users, setUsers] = useState<UserProfile[]>(seededUsers);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as {
          products?: Product[];
          users?: UserProfile[];
          currentUserId?: string | null;
          cart?: CartItem[];
          theme?: ThemeMode;
        };

        setProducts(parsed.products?.length ? parsed.products : seedProducts);
        setUsers(parsed.users?.length ? parsed.users : seededUsers);
        setCurrentUserId(parsed.currentUserId ?? null);
        setCart(parsed.cart ?? []);
        setTheme(parsed.theme ?? 'dark');
      } catch {
        setProducts(seedProducts);
        setUsers(seededUsers);
      }
    }

    const timer = window.setTimeout(() => setIsReady(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        products,
        users,
        currentUserId,
        cart,
        theme
      })
    );
  }, [cart, currentUserId, isReady, products, theme, users]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const currentUser = useMemo(
    () => users.find((user) => user.id === currentUserId) ?? null,
    [currentUserId, users]
  );

  const login = async ({ email, password, role }: LoginInput) => {
    await wait(1200);

    const user = users.find(
      (profile) =>
        profile.email.toLowerCase() === email.trim().toLowerCase() &&
        profile.password === password &&
        profile.role === role
    );

    if (!user) {
      return {
        success: false,
        message:
          role === 'admin'
            ? 'Admin credentials did not match our records.'
            : 'Client account not found. Create one to continue to checkout.'
      };
    }

    setCurrentUserId(user.id);

    return {
      success: true,
      message: `Welcome back, ${user.fullName.split(' ')[0]}.`
    };
  };

  const registerClient = async (input: RegisterInput) => {
    await wait(1400);

    const alreadyExists = users.some(
      (user) => user.email.toLowerCase() === input.email.trim().toLowerCase()
    );

    if (alreadyExists) {
      return {
        success: false,
        message: 'That email is already connected to a SLEEK account.'
      };
    }

    const newClient: UserProfile = {
      id: `client-${Date.now()}`,
      role: 'client',
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      password: input.password,
      phone: input.phone.trim(),
      address: input.address.trim(),
      avatar: '/IMG_20251225_201231_401.png',
      loyaltyTier: 'Member'
    };

    setUsers((currentUsers) => [...currentUsers, newClient]);
    setCurrentUserId(newClient.id);

    return {
      success: true,
      message: 'Your SLEEK client account is ready for checkout.'
    };
  };

  const logout = () => {
    setCurrentUserId(null);
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const addToCart = async (productId: string, size: string) => {
    if (!currentUser || currentUser.role !== 'client') {
      return {
        success: false,
        message: 'Only signed-in clients can continue to checkout.'
      };
    }

    await wait(900);

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.productId === productId && item.size === size
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          productId,
          size,
          quantity: 1,
          addedAt: new Date().toISOString()
        }
      ];
    });

    return {
      success: true,
      message: 'Added to your secure checkout bag.'
    };
  };

  const createProduct = async (input: ProductInput) => {
    await wait(900);
    setProducts((currentProducts) => [
      {
        id: `${Date.now()}`,
        ...input
      },
      ...currentProducts
    ]);
  };

  const updateProduct = async (productId: string, input: ProductInput) => {
    await wait(900);
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, ...input } : product
      )
    );
  };

  const deleteProduct = async (productId: string) => {
    await wait(700);
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    );
    setCart((currentCart) => currentCart.filter((item) => item.productId !== productId));
  };

  const applyDiscount = async (productId: string, discountPercent: number) => {
    await wait(800);
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, discountPercent } : product
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        isReady,
        products,
        users,
        currentUser,
        cart,
        theme,
        login,
        registerClient,
        logout,
        toggleTheme,
        addToCart,
        createProduct,
        updateProduct,
        deleteProduct,
        applyDiscount
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
}
