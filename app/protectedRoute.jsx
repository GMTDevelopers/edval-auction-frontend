'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';
import Loader from './(components)/loader/loader';
import { useModal } from './(components)/ModalProvider/ModalProvider';
import Tab from './(components)/tab/tabs';
/* import Loader from '../loader/loader'; */

const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = '/', }) => {

    const router = useRouter();
    const { user, loading, isAuthenticated} = useAuth();
    const { openModal, closeModal } = useModal();

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            openModal(<Tab />)
            return;
        }
        // Wait until user has loaded
        if (!user) return;
        if (allowedRoles.length && !allowedRoles.includes(user?.role)) {
            router.replace(redirectTo);
        }

    }, [loading, isAuthenticated, user, router, allowedRoles, redirectTo]);

    if (loading || (isAuthenticated && !user)) {
        return(
            <div className='emptyCont'>
                <Loader />
            </div>
            
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    if (allowedRoles.length && !allowedRoles.includes(user?.role)) {
        return null;
    }

    return children;
};

export default ProtectedRoute;