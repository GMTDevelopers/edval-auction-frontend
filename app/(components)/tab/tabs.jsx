'use client';
import { CircleCheck, CircleX, Eye, EyeOff } from 'lucide-react';
import styles from './tabs.module.css';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import ButtonLoader from '../loader/buttonloader';
import { useModal } from '../ModalProvider/ModalProvider';
import { useRouter } from 'next/navigation';
const Tab = () => {
    const {login, signup, error, loading, user} = useAuth();
    const { closeModal } = useModal();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('signIn');
    const [isError, setIsError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);
    const tabs = [
        { key: 'signIn', label: 'Sign in to account' },
        { key: 'signUp', label: 'Create new account' }
    ];
    const [isVisible, setIsVisible] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [signupData, setSignupData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState("");

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const result = await login(loginData);
        if (result.success) {
            setIsSuccess("Login successful!");
           console.log('Login successful:', user);
           
           setTimeout(() => {
                if (user?.role==='admin'){
                    router.push('/admin/overview');
                }
                if (user?.role==='super_admin'){
                    router.push('/admin/overview');
                }
                if (user?.role==='artist'){
                    router.push('/user/artist/myArtworks');
                }
                if (user?.role==='registered_user'){
                    router.push('/user/client');
                }
                closeModal();
           }, 1000);
        } else {
            if(error.status === 401) {
                setIsError("You do not have an account, please sign up first.");
            } else {
                setIsError(error.message);
            }
           /*  setIsError(result.message);
            console.error('Login failed:', error.message); */
        }
    }

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if(signupData.password !== confirmPassword) {
            setIsError("Passwords do not match!");
            return;
        }
        const result = await signup(signupData);
        if (result.success) {
            setIsSuccess("User created successfully!");
            console.log('Signup successful');
            setTimeout(() => {
                closeModal();
            }, 1000);
        } else {
            setIsError(error.message);
            console.error('Signup failed:', error.status, error.message);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'signIn':
                return (
                    <div>
                        <form onSubmit={handleLoginSubmit}>
                            <input type="email" value={loginData.email} onChange={(e) => setLoginData(prev => ({...prev, email: e.target.value}))} name='email' placeholder='Email address' />
                            <div className={styles.passVisible}>
                                <input value={loginData.password}  onChange={(e) => setLoginData(prev => ({...prev, password: e.target.value}))} type={isVisible ? "text" : "password"} placeholder='Password' />
                                <span type="button" onClick={toggleVisibility} className={styles.visibility} aria-label={isVisible ? "Hide password" : "Show password"} >
                                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                            <p>Forgot password?</p>

  
                            { isError && <div className="error"><CircleX color="#D32F2F" />{isError}</div> }
                            
                            <button className="btn submit" disabled={loading}>
                                {loading ? <ButtonLoader /> : "Log in to account"}
                            </button>
                        </form>
                    </div>
                )

            case 'signUp':
                return ( 
                    <div className=''>
                        <form onSubmit={handleSignupSubmit}>
                            <div className={styles.Double}>
                                <input value={signupData.first_name} onChange={(e) => setSignupData(prev => ({...prev, first_name: e.target.value}))} name='firstName' type="text" placeholder='First Name' />
                                <input value={signupData.last_name} onChange={(e) => setSignupData(prev => ({...prev, last_name: e.target.value}))} name='lastName' type="text" placeholder='Last Name' />
                            </div>
                            <input value={signupData.phone} onChange={(e) => setSignupData(prev => ({...prev, phone: e.target.value}))} name='phone' type="tel" placeholder='Phone number' />
                            <input value={signupData.email} onChange={(e) => setSignupData(prev => ({...prev, email: e.target.value}))} name='email' type="email" placeholder='Email address' />
                            <div className={styles.passVisible}>                                
                                <input value={signupData.password} onChange={(e) => setSignupData(prev => ({...prev, password: e.target.value}))} type={isVisible ? "text" : "password"} placeholder='Password' />
                                <span type="button" onClick={toggleVisibility} className={styles.visibility} aria-label={isVisible ? "Hide password" : "Show password"} >
                                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                            <div className={styles.passVisible}>                                
                                <input value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} type={isVisible ? "text" : "password"} placeholder='Confirm Password' />
                                <span type="button" onClick={toggleVisibility} className={styles.visibility} aria-label={isVisible ? "Hide password" : "Show password"} >
                                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                            { isError && <div className="error"><CircleX color="#D32F2F" />{isError}</div> }
                            
                            <button className="btn submit" disabled={loading}>
                                {loading ? <ButtonLoader /> : "Create account"}
                            </button>
                        </form>
                    </div>          
                );

        default:
            return null;
        }
    };
    return (  
        <div className={`${styles.container}`}>
            {/* Pill Tabs */}
            <h2>Sign in to continue</h2>
            { isSuccess && <div className="success"><CircleCheck color="#388E3C" />{isSuccess}</div> }
            <div className={`${styles.tabBar}`}>
                {tabs.map((tab) => (
                <div
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`btn ${styles.tab} ${
                    activeTab === tab.key ? styles.active : ''
                    }`}
                >
                    {tab.label}
                </div>
                ))}
            </div>

        {/* Content */}
        <div className='container'>{renderContent()}</div>
    </div>
    );
}
 
export default Tab;