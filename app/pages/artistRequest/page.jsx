import styles from "./artistRequest.module.css";
const ArtistRequest = () => {
    return ( 
        <div className={styles.artistFormContainer}>
            <h2>Artist Request Form</h2>
            <form action="">
                <section className={styles.section}>
                    <p>SECTION A: <span>PERSONAL INFORMATION</span></p>
                    <div className="double">
                        <input placeholder="First name" type="text" name="firstName" required />
                        <input placeholder="Last name" type="text" name="lastName" required />
                    </div>
                    <input placeholder="Artist / Studio name" type="text" name="artistName" id="" />
                    <div className="double">
                        <input placeholder="Email address" type="email" name="email" required />
                        <input placeholder="Phone number" type="tel" name="phoneNum" required />
                    </div>
                    <textarea name="location" placeholder="Location"></textarea>
                    <div className='double'>
                        <select defaultValue="Country" name="country">
                            <option disabled>Country</option>                 
                            <option value="Delivery">
                                kongo
                            </option>                                
                            <option value="Pickup">
                                DRC
                            </option>                                                              
                        </select>
                        <select defaultValue="State" name="state">
                            <option disabled>State</option>                 
                            <option value="Delivery">
                                Address delivery
                            </option>                                
                            <option value="Pickup">
                                Physical Pickup
                            </option>                                                              
                        </select>
                    </div>
                    <input placeholder="Website / Portfolio link" type="url" name="website" />
                    <textarea name="inspiration" placeholder="Tell us briefly about your artistic practice, inspirations, and background."></textarea>
                </section>

                <section className={styles.section}>
                    <p>SECTION B: <span>ARTWORK INFORMATION</span></p>
                    <input placeholder="Artwork name" type="text" name="artistWorkName" id="" />
                    <div className='double'>
                        <select defaultValue="Artwork category" name="category">
                            <option disabled>Artwork category</option>                 
                            <option value="Delivery">
                                kongo
                            </option>                                
                            <option value="Pickup">
                                DRC
                            </option>                                                              
                        </select>
                        <select defaultValue="Artwork type" name="type">
                            <option disabled>Artwork type</option>                 
                            <option value="Delivery">
                                Address delivery
                            </option>                                
                            <option value="Pickup">
                                Physical Pickup
                            </option>                                                              
                        </select>
                    </div>
                    <div className="double">
                        <p>Dimensions (m):</p>
                        <input placeholder="Length" type="tel" name="length" required />
                        <input placeholder="Width" type="tel" name="width" required />
                        <input placeholder="Depth" type="tel" name="depth" required />
                    </div>
                    <input placeholder="Year created" type="date" name="yearCreated" />
                    <textarea name="artDesc" placeholder="Artwork description"></textarea>
                    <input placeholder="Selling price" type="tel" name="sellPrice" />
                    <select defaultValue="Request type" name="reqType">
                        <option disabled>Request type</option>                 
                        <option value="Delivery">
                            Address delivery
                        </option>                                
                        <option value="Pickup">
                            Physical Pickup
                        </option>                                                              
                    </select>
                </section>
                <button className="btn submit">Submit request</button>
            </form>
        </div>
    );
}
 
export default ArtistRequest;