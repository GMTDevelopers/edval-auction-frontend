'use client'

import ProtectedRoute from '@/app/(components)/ProtectedRoute.jsx/page';

const ArtistLayout = ({children}) => {
    return ( 
        <ProtectedRoute allowedRoles={['artist']}>
            <div>                
                {children}             
            </div>
        </ProtectedRoute>
    );
}
export default ArtistLayout;