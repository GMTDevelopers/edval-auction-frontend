'use client'
import { useRouter } from 'next/navigation';
import GalleryCard from '../(components)/cards/galleryCard';
import CartCard from '../(components)/sideCard/cartCard';
import { useCart } from '../context/cartContext';
import styles from './cart.module.css';
import { CircleOff } from 'lucide-react';

const Cart = () => {
    const{cart,totalItems,totalPrice } = useCart();
    const router = useRouter();
    console.log("cart:", cart)
    return ( 
        <>
            { cart?.length===0 || cart?.subtotal===0 ? <div className='emptyCont'>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"12px"}}>
                    <CircleOff />
                    <p>Cart is empty</p>
                </div>
                
            </div> :<> 
                <div className='auctionPack'>
                    <div className={`container double`}>
                        <div className={`big ${styles.cartBig}`}>
                            {
                                cart?.items?.map((item)=>(

                                    <CartCard key={item.id} id={item.id} name={item.title} img={item.artwork.images[0].url} artist={item.artwork.artist_details.first_name || item.artwork.artist_details.last_name} price={item.price} description={item.artwork.description} />

                                ))
                            }
                        </div>
                        <div className={`small ${styles.cartSmall}`}>
                            <div className="container">
                                <h4>Items Ordered</h4>
                                <div className={styles.orderedItemSide}>
                                    {
                                        cart?.items.map((item)=>(
                                            <li key={item.id} className='double'>
                                                <p>{item.title}</p>
                                                <p><span>${item.price}</span></p>
                                            </li>
                                        ))
                                    }
                                </div>
                                <div className={styles.totalOrder}>
                                    <div className="double">
                                        <p>ORDER TOTAL</p>
                                        <p className={styles.totalPrice}>${cart?.subtotal}</p>
                                    </div>
                                    <div onClick={()=> {router.push('/pages/shipping/cartCheckout')}} className="btn">Proceed to checkout</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='auctionPack'>
                    <div className="container">
                        <div>
                            <p className="subHeading">GALLERY</p>
                            <h2>Explore Other Artworks </h2>
                        </div>
                    {/*  <div className="row4">
                            {
                                galleryData.map((data)=>(
                                    <GalleryCard key={data.id} slug={data.slug} name={data.name} price={data.price} img={data.img} artist={data.artist}/>))
                            }
                        </div> */}
                    </div>
                </div></>
            }  
        </>
    );
}
 
export default Cart;