import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'

function Order() {
  const context = useContext(myContext);
  const {name,year} = context;
  return (
    <Layout>
      Order
      <h1>Name: {name}</h1>
      <h1>Year: {year}</h1>
      </Layout>
  )
}

export default Order