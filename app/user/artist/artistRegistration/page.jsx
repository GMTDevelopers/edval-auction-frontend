'use client';

import { useState } from 'react';
import styles from './artistReg.module.css';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/authContext';
import { useRouter } from 'next/navigation';
import StepOne from './step1';
import StepTwo from './step2';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const CreateArtist = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register/artist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw data.error || { message: 'Registration failed.' };
        }

        return {
            success: true,
            data,
        };
    } catch (err) {
        return {
            success: false,
            err,
        };
    }
};

// Placeholder for future subscription endpoint.
const CreateSubscription = async (subscriptionData, accessToken) => {
    console.log('Subscription Payload:', subscriptionData);

    // Backend developer will provide endpoint later.
    return {
        success: true,
    };
};

const ArtistRegistration = () => {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        account_number: '',
        address: '',
        artistic_style: '',
        bank_name: '',
        bio: '',
        country: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        phone: '',
        portfolio_url: '',
        state: '',
        studio_name: '',
        years_of_experience: 0,
    });

    const [subscription, setSubscription] = useState({
        billing_cycle: 'monthly',
    });

    const validateStepOne = () => {
        if (!formData.first_name.trim()) {
            toast.error('First name is required.');
            return false;
        }

        if (!formData.last_name.trim()) {
            toast.error('Last name is required.');
            return false;
        }

        if (!formData.email.trim()) {
            toast.error('Email address is required.');
            return false;
        }

        if (!formData.password.trim()) {
            toast.error('Password is required.');
            return false;
        }

        if (!formData.phone.trim()) {
            toast.error('Phone number is required.');
            return false;
        }

        if (!formData.studio_name.trim()) {
            toast.error('Studio name is required.');
            return false;
        }

        if (!formData.bio.trim()) {
            toast.error('Artist bio is required.');
            return false;
        }

        if (!formData.bank_name.trim()) {
            toast.error('Bank name is required.');
            return false;
        }

        if (!formData.account_number.trim()) {
            toast.error('Account number is required.');
            return false;
        }

        return true;
    };

    const nextStep = () => {
        if (!validateStepOne()) return;
        setStep(2);
    };

    const previousStep = () => setStep(1);

    const handleSubmit = async () => {
        setLoading(true);

        const artist = await CreateArtist(formData);

        if (!artist.success) {
            setLoading(false);

            toast.error(artist.err.message);

            if (artist.err.details) {
                artist.err.details.password &&
                    toast.error(artist.err.details.password);

                artist.err.details.studio_name &&
                    toast.error(artist.err.details.studio_name);
            }

            return;
        }

        const accessToken = artist.data.data.access_token;

        localStorage.setItem('access_token', accessToken);
        localStorage.setItem(
            'refresh_token',
            artist.data.data.refresh_token
        );

        setIsAuthenticated(true);

        const subscriptionResult = await CreateSubscription(
            subscription,
            accessToken
        );

        if (!subscriptionResult.success) {
            setLoading(false);
            toast.error('Subscription setup failed.');
            return;
        }

        toast.success('Artist account created successfully.');

        setLoading(false);

        setTimeout(() => {
            router.push('/user/artist/myArtworks');
        }, 2500);
    };

    return (
        <div>
            <div className="headerCenter pageHeader">
                <h1>Artist Registration</h1>

                <p>
                    Fill the form below to register as an artist on Edval Art
                    Auction.
                </p>
            </div>

            <div className={styles.banner}>
                <img src="/images/artistReg.webp" alt="" />
            </div>

            <div className={styles.regForm}>
                <div className={styles.regContainer}>

                    {/* Progress Bar */}
                    <div className={styles.progressContainer}>
                        <div
                            className={styles.progressFill}
                            style={{
                                width: step === 1 ? '50%' : '100%',
                            }}
                        />

                        <div className={styles.progressText}>
                            Step {step} of 2
                        </div>
                    </div>

                    {step === 1 && (
                        <StepOne
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                        />
                    )}

                    {step === 2 && (
                        <StepTwo
                            subscription={subscription}
                            setSubscription={setSubscription}
                            previousStep={previousStep}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            formData={formData}
                        />
                    )}

                </div>
            </div>
        </div>
    );
};

export default ArtistRegistration;