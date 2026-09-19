'use client';

import styles from './artistReg.module.css';

const StepTwo = ({
    subscription,
    setSubscription,
    previousStep,
    handleSubmit,
    loading,
    formData
}) => {

    const plans = [
        {
            id:'monthly',
            title:'Monthly',
            price:'₦5,000',
            period:'Per Month'
        },
        {
            id:'biannual',
            title:'Bi-Annual',
            price:'₦27,000',
            period:'Every 6 Months'
        },
        {
            id:'annual',
            title:'Annual',
            price:'₦50,000',
            period:'Per Year'
        }
    ];

    return (
        <>
            <h2>Subscription</h2>

            <p className={styles.subscriptionText}>
                Complete your artist registration by selecting your preferred billing cycle.
            </p>

            <div className={styles.subscriptionCard}>
                <h3>Edval Artist Membership</h3>

                <p>
                    Access exhibitions, artwork submissions,
                    artist dashboard, auctions and future premium benefits.
                </p>
            </div>

            <div className={styles.planContainer}>

                {plans.map((plan)=>(
                    <div
                        key={plan.id}
                        onClick={()=>
                            setSubscription({
                                billing_cycle:plan.id
                            })
                        }
                        className={
                            subscription.billing_cycle===plan.id
                            ? styles.activePlan
                            : styles.plan
                        }
                    >
                        <div>
                            <h3>{plan.title}</h3>
                            <p>{plan.period}</p>
                        </div>

                        <h2>{plan.price}</h2>
                    </div>
                ))}

            </div>

            <div className={styles.summaryCard}>
                <h3>Registration Summary</h3>

                <div className={styles.summaryRow}>
                    <span>Artist</span>

                    <span>
                        {formData.first_name} {formData.last_name}
                    </span>
                </div>

                <div className={styles.summaryRow}>
                    <span>Studio</span>

                    <span>{formData.studio_name}</span>
                </div>

                <div className={styles.summaryRow}>
                    <span>Billing Cycle</span>

                    <span>{subscription.billing_cycle}</span>
                </div>
            </div>

            <div className={styles.buttonRow}>
                <button
                    type="button"
                    className="btn"
                    onClick={previousStep}
                >
                    Back
                </button>

                <button
                    type="button"
                    className="btn submit"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading
                        ? 'Creating Account...'
                        : 'Complete Registration'
                    }
                </button>
            </div>
        </>
    );
};

export default StepTwo;