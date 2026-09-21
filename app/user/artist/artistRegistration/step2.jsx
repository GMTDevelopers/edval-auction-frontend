'use client';
import { useState } from 'react';
import styles from './artistReg.module.css';

const StepTwo = ({subscription, setSubscription, previousStep, handleSubmit, loading, setFormData, formData, plans}) => {
    console.log('sub plans',plans)
    const [isAgreed, setIsAgreed] = useState(false);
    return (
        <>
            <h2>Subscription</h2>

            <p className={styles.subscriptionText}>
                Complete your artist registration by selecting your preferred billing cycle.
            </p>

            <div className={styles.planContainer}>

                {plans?.map((plan)=>(
                    <div key={plan.id} className={subscription.billing_cycle===plan?.id ? styles.activePlan : styles.plan } onClick={()=>
                        {setFormData(prev=>({
                            ...prev,
                            plan_id:plan.id,
                            plan_slug: plan.slug,
                        }));
                        setSubscription({
                            billing_cycle:plan.id
                        })}
                    } >
                        <div className={styles.planInner}>
                            <h3>{plan?.name}</h3>
                            <h2>{plan?.price.toLocaleString()}</h2>
                            <p>{plan?.billing_cycle}</p>
                            <p>{plan?.description}</p>
                            <hr />
                            <p>Whats is included</p>
                            {plan.features.map((feat,index)=>(
                                <div key={index} className={styles.features}>
                                    <li>{feat}</li>
                                </div>
                                    
                            ))}
                        </div>

                        
                    </div>
                ))}

            </div>
            <form>
                <section className={styles.section}>
                    <div className="checkboxPack">
                        <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={(e)=>setIsAgreed(e.target.checked)}
                        />
                        <p>I agree to the <a style={{color:"#D2B270"}} href="/pages/terms&conditions" target='_blank'>Terms and Conditions.</a> </p>
                    </div>

                </section>
            </form>
            <div className={styles.buttonRow}>
                <button type="button" className="btn submit" onClick={previousStep}>
                    Back
                </button>

                <button type="button" className="btn submit" onClick={handleSubmit} disabled={!isAgreed} >
                    {loading ? 'Creating Account...' : 'Complete Registration'}
                </button>
            </div>
        </>
    );
};

export default StepTwo;