'use client'
import GalleryCard from '../(components)/cards/galleryCard';
import CartCard from '../(components)/sideCard/cartCard';
import { useCart } from '../context/cartContext';
import styles from './cart.module.css';
const galleryData = [
    {
      "id":1,
      "slug": "modern-&-contemporary",
      "name":"Modern & Contemporary",
      "price":"400",
      "artist":"Michael Scarlet",
      "year": 2022,
      "status":"Available",
      "category": "Human Portrait",
      "type": "Painting",
      "theme": ["calm", "paece", "joy", "freedom", "Alive"],
      "size": "29.7 X 28 X 8",
      "frame": "No frame",
      "proofOfAuth": "yes",
      "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
      "images":['/images/homepage/gallery1.webp', '/images/homepage/gallery3.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery1.webp"
    },
    {
      "id":2,
      "slug": "modern-&-contemporary",
      "name":"Modern & Contemporary",
      "price":"400",
      "artist":"Michael Scarlet",
      "year": 2022,
      "status":"Available",
      "category": "Human Portrait",
      "type": "Painting",
      "theme": ["calm", "paece", "joy", "freedom", "Alive"],
      "size": "29.7 X 28 X 8",
      "frame": "No frame",
      "proofOfAuth": "yes",
      "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
      "images":['/images/homepage/gallery1.webp', '/images/homepage/gallery3.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery6.webp"
    },
    {
      "id":3,
      "slug": "modern-&-contemporary",
      "name":"Modern & Contemporary",
      "price":"400",
      "artist":"Michael Scarlet",
      "year": 2022,
      "status":"Available",
      "category": "Human Portrait",
      "type": "Painting",
      "theme": ["calm", "paece", "joy", "freedom", "Alive"],
      "size": "29.7 X 28 X 8",
      "frame": "No frame",
      "proofOfAuth": "yes",
      "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
      "images":['/images/homepage/gallery1.webp', '/images/homepage/gallery3.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery4.webp"
    },
    {
      "id":4,
      "slug": "modern-&-contemporary",
      "name":"Modern & Contemporary",
      "price":"400",
      "artist":"Michael Scarlet",
      "year": 2022,
      "status":"Available",
      "category": "Human Portrait",
      "type": "Painting",
      "theme": ["calm", "paece", "joy", "freedom", "Alive"],
      "size": "29.7 X 28 X 8",
      "frame": "No frame",
      "proofOfAuth": "yes",
      "description": "This piece captures the raw energy of liberation and pure joy. Through thick, textured palette knife strokes, the vibrant colors of the sweeping skirt feel alive, mimicking the dynamic rhythm of dance and heritage. Outstretched arms and an upturned face reflect a moment of absolute freedom and spiritual release, beautifully contrasted by the simplicity of a white top and headwrap. The warm, golden background acts as an atmospheric aura, celebrating a soul completely immersed in praise and light.",
      "images":['/images/homepage/gallery1.webp', '/images/homepage/gallery3.webp', '/images/auction/2.webp'],
      "img": "/images/homepage/gallery8.webp"
    },
]
const Cart = () => {
    const{cart,totalItems,totalPrice } = useCart();
    console.log("cart:", cart)
    return ( 
        <>
        <div className='auctionPack'>
            <div className={`container double`}>
                <div className={`big ${styles.cartBig}`}>
                    {
                        cart?.map((item)=>(

                            <CartCard key={item.id} id={item.id} name={item.name} img={item.image} artist={item.artist} price={item.price} description={item.description} />

                        ))
                    }
                </div>
                <div className={`small ${styles.cartSmall}`}>
                    <div className="container">
                        <h4>Items Ordered</h4>
                        <div className={styles.orderedItemSide}>
                            {
                                cart?.map((item)=>(
                                    <li key={item.id} className='double'>
                                        <p>{item.name}</p>
                                        <p><span>${item.price}</span></p>
                                    </li>
                                ))
                            }
                        </div>
                        <div className={styles.totalOrder}>
                            <div className="double">
                                <p>ORDER TOTAL</p>
                                <p className={styles.totalPrice}>${totalPrice}</p>
                            </div>
                            <div className="btn">Proceed to checkout</div>
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
                <div className="row4">
                    {
                        galleryData.map((data)=>(
                            <GalleryCard key={data.id} slug={data.slug} name={data.name} price={data.price} img={data.img} artist={data.artist}/>))
                    }
                </div>
            </div>
        </div>
    </>
    );
}
 
export default Cart;