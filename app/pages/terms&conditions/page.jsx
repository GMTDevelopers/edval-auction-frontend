'use client';

import styles from './artistReg.module.css';

const TermsCondition = () => {
    return (
        <div>
            <div className="headerCenter pageHeader">
                <h1>Terms and Conditions</h1>

                <p>
                    Please read these terms carefully before using our services. By accessing or using our website, you agree to be bound by these terms.
                </p>
            </div>
            <div className={styles.regForm}>
                <div className={styles.regContainer}>
                    <section className={styles.section}>
                        <p>
                            SECTION A:
                            <span> GENERAL TERMS AND CONDITIONS </span><br />
                             Effective Date:<span> 21/09/2026 </span>
                        </p>
                        <div className={styles.ruleItemPack}>
                            <div className={styles.ruleItem}>                           
                                <p><span>1. Introduction & Scope</span> </p>
                                These General Terms and Conditions (“Terms”) govern the overall operations of Edval Art Auction (“Company,” “We,” “Us,” or “Our”) and set forth the binding agreement between the Company, artists/consignors (“Artists”), and buyers/bidders (“Collectors”). By accessing our platform, subscribing, bidding, buying, or consigning artwork, all parties agree to be bound by these Terms.
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>2. Definitions</span></p>
                                <li>Artist / Consignor: An individual or entity submitting original artwork for exhibition, auction, or sale on the platform.</li>
                                <li>Collector / Buyer: An individual or entity registering to bid on or purchase artwork.</li>
                                <li>Hammer Price / Sale Price: The final winning bid amount or buy-it-now price accepted for an artwork, excluding commission, taxes, and shipping fees.</li>
                                <li>Buyer’s Premium: A percentage fee charged to the buyer on top of the hammer price.</li>
                                <li>Seller’s Commission: A percentage fee deducted from the hammer price payable by the artist/consignor.</li>
                            </div>
                            <div className={styles.ruleItem}>                            
                                <p><span>3. Artist & Consignor Terms</span></p>
                                <div className={styles.ruleItem}>   
                                    <p><span>3.1. Subscriptions & Listings</span></p>
                                    <li>Artists must maintain an active subscription or consignment agreement to list works on the platform.</li>
                                    <li>All submitted artwork must undergo approval and quality review by Edval Art Auction prior to being featured.</li>
                                </div>
                                <div className={styles.ruleItem}>   
                                    <p><span>3.2. Commission & Remittance</span></p>
                                    <li>Commission Deduction: Edval Art Auction deducts a standard seller commission of [Insert Commission %, e.g., 15%–25%] from the final hammer price of each sold work.</li>
                                    <li>Payout Schedule: Net sales proceeds (Hammer Price minus Commission and processing fees) will be remitted to the Artist within [Insert Number, e.g., 14] business days after cleared funds are received from the Collector.</li>
                                </div>
                                <div className={styles.ruleItem}>   
                                    <p><span>3.3. Authenticity & Copyright</span></p>
                                    <li>The Artist guarantees that all works are genuine, original, and free from third-party liens, encumbrances, or intellectual property infringements.</li>
                                    <li>The Artist retains copyright to their original artwork but grants Edval Art Auction a worldwide, royalty-free license to display, advertise, and promote the work in digital and print materials.</li>
                                </div>
                                <div className={styles.ruleItem}>   
                                    <p><span>3.4. Transit, Packaging, & Damage Disclaimer</span></p>
                                    <li>Shipping Responsibility: The Artist is responsible for securely packaging artwork in accordance with Company standards.</li>
                                    <li>Transit Damage: Edval Art Auction is NOT liable for any loss, theft, damage, or deterioration of artwork occurring while in transit to or from our facilities. Artists and Collectors are strongly advised to secure adequate shipping insurance.</li>
                                </div>
                                
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>4. Collector & Buyer Terms</span></p>
                                <div className={styles.ruleItem}>   
                                    <p><span>4.1. Registration & Bidding</span></p>
                                    <li>Collectors must register an account and provide accurate identity and billing information to participate in auctions</li>
                                    <li>All bids placed are binding legal commitments to purchase the artwork at the bid amount if determined to be the winning bid.</li>
                                </div>
                                <div className={styles.ruleItem}>   
                                    <p><span>4.2. Buyer’s Premium & Taxes</span></p>
                                    <li>A Buyer’s Premium of [Insert Buyer Premium %, e.g., 10%–15%] will be added to the final hammer price of each lot.</li>
                                    <li>The total amount due from the Collector includes:</li>
                                </div>
                                <div className={styles.ruleItem}>   
                                    <p><span>4.3. Payment & Default</span></p>
                                    <li>Full payment must be made within [Insert Number, e.g., 5-7] business days following the close of the auction.</li>
                                    <li>If a Collector fails to pay within the stipulated time, Edval Art Auction reserves the right to cancel the sale, offer the lot to the underbidder, or pursue legal remedies.</li>
                                </div>
                                <div className={styles.ruleItem}>   
                                    <p><span>4.4. Delivery & Risk of Loss</span></p>
                                    <li>Risk of loss and title pass to the Collector upon receipt of full payment and transfer of the item to the shipping carrier.</li>
                                    <li>Collectors are responsible for all customs duties, import taxes, and shipping expenses unless explicitly stated otherwise.</li>
                                </div>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>5. Limitation of Liability</span></p>
                                <li>Edval Art Auction acts as an intermediary facilitating sales between Artists and Collectors.</li>
                                <li>To the maximum extent permitted by law, the Company shall not be liable for indirect, incidental, or consequential damages, or for physical damage to artworks occurring during transportation or third-party handling.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>6. Termination & Account Suspension</span></p>
                                <li>Edval Art Auction reserves the right to suspend or terminate any user account (Artist or Collector) at any time for violation of these Terms, non-payment, misrepresentation of authenticity, or fraudulent activity.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>7. Governing Law & Dispute Resolution</span></p>
                                <li>These Terms shall be governed by and construed in accordance with the laws of [Insert Country/State, e.g., Nigeria / Lagos State]. Any disputes arising under this Agreement shall first be submitted to good-faith mediation before pursuing formal legal arbitration or litigation.</li>
                                <li>By creating an account, consigning work, or placing a bid on Edval Art Auction, you confirm that you have read, understood, and agreed to these General Terms and Conditions.</li>
                            </div>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <p>
                            SECTION B:
                            <span> SUBSCRIBER TERMS AND CONDITIONS </span>
                        </p>
                        <div className={styles.ruleItemPack}>
                            <div className={styles.ruleItem}>                           
                                <p><span>1. Overview & Service Scope</span> </p>
                                These Terms and Conditions ("Agreement") govern the relationship between Edval Art Auction ("Company," "We," "Us," "Our") and the artist/subscriber ("Subscriber," "Artist," "You"). By subscribing to Edval Art Auction and submitting artwork for auction or sale, you agree to comply with and be bound by the terms outlined below.
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>2. Subscriptions & Platform Access</span></p>
                                <li>Subscriber Status: Active subscription grants the Artist access to list original artworks on the Edval Art Auction platform, subject to approval and quality review.</li>
                                <li>Subscription Fees: Any applicable recurring subscription fees are non-refundable unless expressly stated otherwise in writing by the Company.</li>
                            </div>
                            <div className={styles.ruleItem}>                            
                                <p><span>3. Sales Commission & Payment Terms</span></p>
                                <li>Commission Deduction: Edval Art Auction charges a sales commission on every piece of artwork sold through our platform. The Company will automatically deduct a commission fee of [Insert Commission Percentage, e.g., 15% - 25%] from the final gross sale price (hammer price) of each sold item.</li>
                                <li>Calculation & Net Earnings:</li>
                                <li>Payout Schedule: Net sales proceeds will be remitted to your designated bank account within [Insert Number, e.g., 14] business days following receipt and confirmation of cleared funds from the buyer.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>4. Transit, Shipping, and Limitation of Liability for Damages</span></p>
                                <li>Transit to Facilities: The Artist is solely responsible for packaging, insuring, and shipping artwork to Edval Art Auction’s facilities or directly to buyers.</li>
                                <li>No Liability for Damage in Transit: Edval Art Auction is NOT responsible for any loss, damage, theft, or deterioration of artwork that occurs while the item is in transit to our facilities or offices.</li>
                                <li>Insurance Recommendation: The Artist is strongly advised to secure adequate transit and cargo insurance covering the full appraised value of the artwork prior to shipment.</li>
                                <li>Inspection Upon Receipt: Artwork received at our facilities will be inspected upon arrival. Any pre-existing damage or transit-related damage discovered upon arrival will be documented, and the Artist will be notified promptly.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>5. Authenticity & Ownership Representations</span></p>
                                <li>Title & Authenticity: The Artist warrants and represents that all artwork submitted is an original creation, that the Artist holds clear title and unencumbered ownership of the work, and that the work does not infringe upon any third-party copyright, trademark, or intellectual property rights.</li>
                                <li>Accurate Description: The Artist agrees to provide complete, truthful, and accurate descriptions, dimensions, provenance, and condition reports for all submitted pieces.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>6. Termination & Cancellation</span></p>
                                <li>Cancellation by Subscriber: You may cancel your subscription at any time; however, any ongoing or active auctions at the time of cancellation must run to completion under these Terms.</li>
                                <li>Termination by Company: Edval Art Auction reserves the right to suspend or terminate any subscription or listing immediately in the event of a breach of these Terms, non-payment, or suspected fraudulent activity.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>7. Governing Law</span></p>
                                <li>This Agreement shall be governed by and construed in accordance with the laws of [Insert Country/State, e.g., Nigeria / Lagos State], without regard to its conflict of law principles.
                                By completing your subscription or listing artwork on Edval Art Auction, you confirm that you have read, understood, and agreed to these Terms and Conditions.</li>
                            </div>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <p>
                            SECTION C:
                            <span> SPONSORED SUBSCRIBER TERMS AND CONDITIONS </span>
                        </p>
                        <div className={styles.ruleItemPack}>
                            <div className={styles.ruleItem}>                           
                                <p><span>1. Overview & Sponsorship</span> </p>
                                These Terms and Conditions ("Agreement") govern the relationship between Edval Art Auction ("Company," "We," "Us") and the Sponsored Subscriber ("Artist," "Subscriber," "You"). Under this arrangement, the Company provides financial sponsorship/payment to the Artist to support their work and feature their artwork on the Edval Art Auction platform.
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>2. Art Listing & Platform Exclusivity</span></p>
                                <li>Submission: The Artist agrees to provide original, authenticated artworks for auction during the agreed sponsorship period.</li>
                                <li>Exclusivity: Artworks submitted under this sponsorship cannot be listed on competing auction platforms or sold privately without prior written consent from the Company</li>
                            </div>
                            <div className={styles.ruleItem}>                            
                                <p><span>3. Commission Structure & Sales Deductions</span></p>
                                <li>Percentage Retention: In exchange for platform access, promotional services, and direct sponsorship payments provided by the Company, Edval Art Auction will deduct a fixed percentage fee of [Insert Percentage, e.g., 15% - 25%] from the final hammer price (sale price) of each sold artwork.</li>
                                <li>Payout Calculation: The net payout to the Artist per sold piece will be calculated as follows:</li>
                                <li>Payment Schedule: Net earnings from sold artworks will be remitted to the Artist’s designated bank account within [Insert Number, e.g., 14] business days following receipt of cleared funds from the buyer.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>4.  Sponsorship Remuneration</span></p>
                                <li>The stipend, sponsorship fee, or allowance paid by the Company to the Artist is separate from sales earnings and will be disbursed according to the schedule set forth in your primary Sponsorship Agreement</li>
                                <li>Failure to submit agreed-upon artworks on schedule may result in the temporary suspension of sponsorship payments.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>5. Authenticity, Ownership & Shipping</span></p>
                                <li>Warranty of Ownership: The Artist guarantees that all submitted works are original creations, free of copyright infringement, encumbrances, or third-party claims.</li>
                                <li>Fulfillment: Upon successful sale, the Artist agrees to package the artwork according to Company guidelines within [Insert Number, e.g., 3] business days to ensure safe delivery to the buyer.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>6. Termination</span></p>
                                <li>Cancellation by Subscriber: You may cancel your subscription at any time; however, any ongoing or active auctions at the time of cancellation must run to completion under these Terms.</li>
                                <li>Termination by Company: Edval Art Auction reserves the right to suspend or terminate any subscription or listing immediately in the event of a breach of these Terms, non-payment, or suspected fraudulent activity.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>7. Governing Law</span></p>
                                <li>Either party may terminate this agreement with [Insert Number, e.g., 30] days' written notice. Upon termination, any ongoing auctions will be completed under these terms, and remaining active sponsorship payments will cease.
                                    By accepting sponsorship funding or listing artwork under this program, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</li>
                            </div>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <p>
                            SECTION D:
                            <span> Initial Deposit & Forfeiture Operational Method </span>
                        </p>
                        <div className={styles.ruleItemPack}>
                            <div className={styles.ruleItem}>                           
                                <p><span>1. Deposit Requirement & Account Verification</span> </p>
                                <li> Pre-Bidding Qualification: Prospective buyers must pay a fixed initial deposit (or place an authorized card hold) prior to placing bids on any auction lot.</li>
                                <li>Deposit Status: The deposit serves as a financial guarantee of intent and remains held in escrow by EdvalArt Auction for the duration of the auction.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>2. Post-Auction Settlement</span></p>
                                <li>Winning Bidders: Upon winning a lot, the initial deposit is applied directly as a partial credit toward the final invoice total (hammer price plus buyer’s premium and applicable taxes).</li>
                                <li>Unsuccessful Bidders: If a bidder wins no lots, the initial deposit is fully refunded or released within 3 to 5 business days following the auction's close.</li>
                            </div>
                            <div className={styles.ruleItem}>                            
                                <p><span>3. Payment Window & Default Threshold</span></p>
                                <li>Settlement Deadline: Successful bidders are issued an official invoice immediately following the lot closure and must settle the remaining balance in full within 48 to 72 hours (or the designated settlement window).</li>
                                <li>Notice of Impending Default: If payment is not received within the initial payment window, a final 24-hour settlement notice is issued to the buyer.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>4. Deposit Forfeiture Mechanics</span></p>
                                <li>Automatic Forfeiture: If the winning bidder fails to pay the balance in full before the expiration of the final settlement window, the full initial deposit is automatically forfeited to EdvalArt Auction.</li>
                                <li>Administrative Offset: The forfeited funds are retained by EdvalArt Auction to liquidate administrative fees, cataloging costs, platform overhead, and seller disruption fees.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>5. Right of Resale & Balance Recovery</span></p>
                                <li>Lot Cancellation: Upon default and deposit forfeiture, the sale is formally canceled, and the bidder forfeits all claim to the lot.</li>
                                <li>Re-Listing or Backup Sale: EdvalArt Auction reserves the right to offer the lot to the second-highest bidder (underbidder) or re-consign it for a future auction.</li>
                                <li>Liability for Deficit: If the lot resells for less than the original hammer price, EdvalArt Auction reserves the right to seek recovery from the defaulting buyer for the price shortfall, accrued storage fees, and secondary commission costs, over and above the forfeited deposit.</li>
                            </div>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <p>
                            SECTION E:
                            <span> Initial Deposit, Bidding Qualification, and Payment Default Policy </span>
                        </p>
                        <div className={styles.ruleItemPack}>
                            <div className={styles.ruleItem}>                           
                                <p><span>1. Registration & Initial Deposit Requirement</span> </p>
                                <li> To qualify for bidding on any lot offered by EdvalArt Auction (the "Auctioneer"), all prospective bidders ("Bidders") must complete the registration process and submit a mandatory Initial Deposit in the amount specified for the respective auction or lot category. The Initial Deposit shall be held by the Auctioneer in an escrow or segregated client ledger account as a commitment guarantee and a condition precedent for bidding authorization.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>2. Application of Deposit & Refund Mechanics</span></p>
                                <li>Successful Bidders: Upon the fall of the hammer or digital confirmation of sale to the highest accepted Bidder (the "Buyer"), the Initial Deposit shall be credited directly toward the Total Purchase Price (comprising the hammer price, buyer's premium, applicable taxes, and logistics or handling fees).</li>
                                <li>Unsuccessful Bidders: If a registered Bidder places no winning bids during the auction event, the Initial Deposit shall be refunded in full or released from card pre-authorization within five (5) to seven (7) business days following the formal conclusion of the auction, subject to standard banking processing timelines.</li>
                            </div>
                            <div className={styles.ruleItem}>                            
                                <p><span>3. Payment Obligations & Settlement Window</span></p>
                                <li>Upon the close of the auction, the Buyer shall be issued an official invoice detailing the remaining balance due. The Buyer agrees to pay the outstanding balance of the Total Purchase Price in full within seventy-two (72) hours (the "Settlement Window") from the issuance of the invoice. Payment must be cleared via an approved payment method (bank wire transfer, certified bank draft, or verified electronic transfer) prior to the release or delivery of any lot.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>4. Payment Default & Forfeiture of Initial Deposit</span></p>
                                <p>In the event the Buyer fails to remit the full balance within the specified Settlement Window:</p>
                                <li>The Buyer shall be deemed in material breach and full default of the purchase agreement without requiring further notice from the Auctioneer.</li>
                                <li>The Initial Deposit shall be automatically and irrevocably forfeited to the Auctioneer.</li>
                                <li>The forfeited Initial Deposit shall be retained by the Auctioneer to liquidate administrative overhead, platform fees, cataloging expenses, lost buyer commissions, and seller disruption compensation.</li>
                            </div>
                            <div className={styles.ruleItem}>
                                <p><span>5. Right of Resale and Deficiency Recovery</span></p>
                                <p>Forfeiture of the Initial Deposit shall not extinguish the Buyer's remaining liabilities or bar the Auctioneer from seeking further remedies. Upon default, the Auctioneer reserves the unqualified right to:</p>
                                <li>Cancel the sale and re-offer the subject lot to the immediate underbidder or re-consign the lot for re-sale at a future public or private sale</li>
                                <li> Hold the defaulting Buyer liable for any financial deficiency between the original Total Purchase Price and the lower price realized upon re-sale</li>
                                <li>Recover from the defaulting Buyer all secondary costs, including but not limited to warehousing/storage fees, legal expenses, re-cataloging costs, and interest accrued at the maximum legal rate.</li>
                            </div>
                        </div>
                    </section>
                    
                </div>
            </div>
        </div>
    );
};

export default TermsCondition;