'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';
import Loader from '@/app/(components)/loader/loader';
import { useModal } from '../ModalProvider/ModalProvider';
import Tab from '../tab/tabs';

const ProtectedRoute = ({children, allowedRoles = [], redirectTo = '/'}) => {

    const router = useRouter();
    const { user, loading, isAuthenticated } = useAuth();
    const { closeModal, openModal } = useModal();

    useEffect(() => {

        // Wait until authContext finishes loading.
        if (loading) return;

        // User is not logged in.
        if (!isAuthenticated || !user) {
            openModal(<Tab />)
            /* router.replace('/login'); */
            return;
        }

        // Role is not allowed.
        if (
            allowedRoles.length > 0 &&
            !allowedRoles.includes(user.role)
        ) {
            router.replace(redirectTo);
        }

    }, [loading, isAuthenticated, user, allowedRoles, redirectTo, router]);

    if (loading) {
        return (
            <div className="emptyCont">
                <Loader />
            </div>
        );
    }

    if (!user || !isAuthenticated) {
        return null;
    }

    if (
        allowedRoles.length &&
        !allowedRoles.includes(user.role)
    ) {
        return null;
    }

    return children;
};

export default ProtectedRoute;