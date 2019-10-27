import React from 'react'
import Swiper from 'react-id-swiper';
import 'isomorphic-fetch'
import Layout from '@components/Layout/Layout'
import styles from './list.scss'


 

const List = ({ productList = [], ...props }) => {
    console.log('productList',productList);
    (<Layout disableBackBtn={true}>
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
            <div>
                <img src="/static/images/banner-03.jpg" />
            </div>
    
        </Swiper>
        <h1>list</h1>
    </Layout>
)
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
                    <div>
                        <img src="/static/images/banner-03.jpg" />
                    </div>
            
                </Swiper>
                {/* <ul className={styles.categoryList}>
                    {productList.products.map((item, i) => (
                        <li onClick={e => setCateIndex(i)} key={item.cateId}
                            >
                            {item.category}
                        </li>
                    ))}
                </ul> */}
                <h1>list</h1>
            </Layout>
        )
    )
}

   List.getInitialProps = async  context => {
    const res = await fetch('https://flask-shopping.herokuapp.com/api/v1/product')
    const json = await res.json()
    return { productList: json }
}
export default List