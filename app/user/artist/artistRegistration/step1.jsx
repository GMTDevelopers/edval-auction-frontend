'use client';

import styles from './artistReg.module.css';
import countries from '@/app/data/countries.json';
import artStyle from '@/app/data/artStyle.json';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const StepOne = ({ formData, setFormData, nextStep }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    return (
        <>
            <h2>Artist Registration</h2>

            <form>

                <section className={styles.section}>
                    <p>
                        SECTION A:
                        <span> PERSONAL INFORMATION</span>
                    </p>

                    <div className="double">
                        <input
                            value={formData.first_name}
                            onChange={(e)=>
                                setFormData(prev=>({
                                    ...prev,
                                    first_name:e.target.value
                                }))
                            }
                            placeholder="First name"
                        />

                        <input
                            value={formData.last_name}
                            onChange={(e)=>
                                setFormData(prev=>({
                                    ...prev,
                                    last_name:e.target.value
                                }))
                            }
                            placeholder="Last name"
                        />
                    </div>

                    <input
                        value={formData.email}
                        onChange={(e)=>
                            setFormData(prev=>({
                                ...prev,
                                email:e.target.value
                            }))
                        }
                        placeholder="Email address"
                        type="email"
                    />

                    <div className="passVisible">
                        <input
                            value={formData.password}
                            onChange={(e)=>
                                setFormData(prev=>({
                                    ...prev,
                                    password:e.target.value
                                }))
                            }
                            type={isVisible ? 'text' : 'password'}
                            placeholder="Password"
                        />

                        <span
                            className="visibility"
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            {isVisible ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </span>
                    </div>

                    <input
                        value={formData.phone}
                        onChange={(e)=>
                            setFormData(prev=>({
                                ...prev,
                                phone:e.target.value
                            }))
                        }
                        placeholder="Phone number"
                    />

                    <textarea
                        value={formData.address}
                        onChange={(e)=>
                            setFormData(prev=>({
                                ...prev,
                                address:e.target.value
                            }))
                        }
                        placeholder="Address"
                    />

                    <div className="double">

                        <select
                            value={formData.country}
                            onChange={(e)=>
                                setFormData(prev=>({
                                    ...prev,
                                    country:e.target.value
                                }))
                            }
                        >
                            <option value="">Country</option>

                            {countries.map((country,index)=>(
                                <option key={index} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>

                        <input
                            value={formData.state}
                            onChange={(e)=>
                                setFormData(prev=>({
                                    ...prev,
                                    state:e.target.value
                                }))
                            }
                            placeholder="State / City"
                        />
                    </div>

                </section>

                <section className={styles.section}>

                    <p>
                        SECTION B:
                        <span> ARTIST INFORMATION</span>
                    </p>

                    <div className="double">

                        <select
                            value={formData.artistic_style}
                            onChange={(e)=>
                                setFormData(prev=>({
                                    ...prev,
                                    artistic_style:e.target.value
                                }))
                            }
                        >
                            <option value="">Artistic Style</option>

                            {artStyle.map((style,index)=>(
                                <option key={index} value={style.value}>
                                    {style.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={formData.years_of_experience}
                            onChange={(e)=>
                                setFormData(prev=>({
                                    ...prev,
                                    years_of_experience:Number(e.target.value)
                                }))
                            }
                        >
                            <option value={0}>
                                Years of Experience
                            </option>

                            {[1,2,3,4,5,6,7].map(year=>(
                                <option key={year} value={year}>
                                    {year === 7 ? '7+ Years' : `${year} Year${year>1?'s':''}`}
                                </option>
                            ))}

                        </select>

                    </div>

                    <input
                        value={formData.portfolio_url}
                        onChange={(e)=>
                            setFormData(prev=>({
                                ...prev,
                                portfolio_url:e.target.value
                            }))
                        }
                        placeholder="Portfolio Link"
                    />

                    <input
                        value={formData.studio_name}
                        onChange={(e)=>
                            setFormData(prev=>({
                                ...prev,
                                studio_name:e.target.value
                            }))
                        }
                        placeholder="Studio Name"
                    />

                    <textarea
                        value={formData.bio}
                        onChange={(e)=>
                            setFormData(prev=>({
                                ...prev,
                                bio:e.target.value
                            }))
                        }
                        placeholder="Artist Bio"
                    />

                </section>

                <section className={styles.section}>

                    <p>
                        SECTION C:
                        <span> BANK INFORMATION</span>
                    </p>

                    <input
                        value={formData.bank_name}
                        onChange={(e)=>
                            setFormData(prev=>({
                                ...prev,
                                bank_name:e.target.value
                            }))
                        }
                        placeholder="Bank Name"
                    />

                    <input
                        value={formData.account_number}
                        onChange={(e)=>
                            setFormData(prev=>({
                                ...prev,
                                account_number:e.target.value
                            }))
                        }
                        placeholder="Account Number"
                    />

                </section>

                <section className={styles.section}>

                    <p>
                        SECTION D:
                    <span> SUBSCRIPTION </span>
                    </p>

                    <select
                        value={formData.years_of_experience}
                        onChange={(e)=>
                            setFormData(prev=>({
                                ...prev,
                                years_of_experience:Number(e.target.value)
                            }))
                        }
                    >
                        <option value='sponsorship'>
                            Sponsorship
                        </option>

                        <option value='subscription'>
                            Subscription
                        </option>
                        

                    </select>

                </section>

                <section className={styles.section}>

                    <div className="checkboxPack">
                        <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={(e)=>setIsAgreed(e.target.checked)}
                        />

                        <p>I agree to the Terms and Conditions.</p>
                    </div>

                </section>

                <button
                    type="button"
                    disabled={!isAgreed}
                    className="btn submit"
                    onClick={nextStep}
                >
                    Continue
                </button>

            </form>
        </>
    );
};

export default StepOne;