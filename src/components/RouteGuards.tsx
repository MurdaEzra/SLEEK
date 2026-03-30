import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export function RequireRole({
  children,
  role
}: {
  children: React.ReactNode;
  role: 'admin' | 'client';
}) {
  const { currentUser } = useAppContext();
  const location = useLocation();

  if (!currentUser || currentUser.role !== role) {
    return (
      <Navigate
        to={`/auth?role=${role}`}
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <>{children}</>;
}
