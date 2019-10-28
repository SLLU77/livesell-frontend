import React from 'react'
import Swiper from 'react-id-swiper';
import 'isomorphic-fetch'
import Layout from '@components/Layout/Layout'
import styles from './list.scss'


 

const List = (
        { productList = [], 
          categoryList = [], 
        ...props }) => {
    
    

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
                        <li onClick={ e => {} } key={item.cateId}>
                                {item.name}
                        </li>
                    ))}
                </ul>
                <h1>list</h1>
            </Layout>
        )
    )
}

   List.getInitialProps = async  context => {
    const productRes = await fetch('https://flask-shopping.herokuapp.com/api/v1/product')
    const productList = await productRes.json()
    const categoryRes = await fetch('https://flask-shopping.herokuapp.com/api/v1/category')
    const categoryList = await categoryRes.json()
    
    return { productList, categoryList  }
}
export default List