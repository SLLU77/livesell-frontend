import React,{useState,useEffect} from 'react'
import Swiper from 'react-id-swiper';
import 'isomorphic-fetch'
import Layout from '@components/Layout/Layout'
import Image from '@components/Image/Image'
import styles from './list.scss'


 

const List = ({ productList = [], 
          categoryList = [], 
        ...props }) => {
    
    let [currentCategory ,setCategory] = useState(-1) 
    let [currentList, setCurrentList] = useState([])
    useEffect(()=>{
        setCurrentList(productList.products)
    },[])
    return (
        (
            <Layout disableBackBtn={true}>
                <Swiper
                   pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                }}>
                      
                    <div>
                        <img src="/static/images/banner-01.jpg" />
                    </div>
                    <div>
                        <img src="/static/images/banner-02.jpg" />
                    </div>
                    
            
                </Swiper>
                <ul className={styles.categoryList}>
                    {categoryList.categories.map((item, i) => (
                        <li onClick={ e => {} } key={item.id}>
                                {item.name}
                        </li>
                    ))}
                </ul>
                <div className={styles.productList}>
                {currentList.map(product => (
                        <div
                            className={styles.productItem}
                            onClick={() =>{}}
                            key={product.id}
                        >
                            {
                                product.name
                            }
                             <Image src={product.image} className={styles.productImg} />
                            {/* <div className={styles.promoWrap}>
                                <Image src={product.image} className={styles.productImg} />
                                {product.promoMsg && <div className={styles.tag}>{product.promoMsg}</div>}
                            </div>
                            <ul className={styles.productInfo}>
                                <li className={styles.productName}>{product.name}</li>
                                <li className={`ehsPrice ${styles.productPrice}`}>{product.price}</li>
                            </ul> */}
                        </div>
                    ))}
            </div>
            </Layout>
        )
    )
}

   List.getInitialProps = async  context => {
    const productRes = await fetch('https://flask-shopping.herokuapp.com/api/v1/product')
    const productList = await productRes.json()
    const categoryRes = await fetch('https://flask-shopping.herokuapp.com/api/v1/category')
    const categoryList = await categoryRes.json()
    console.log('productList: ', productList);
    
    
    return { productList, categoryList  }
}
export default List