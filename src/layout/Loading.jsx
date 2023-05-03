import React from 'react'
import ReactLoading from 'react-loading';

const Loading = ({color}) => {
  return (
    <ReactLoading type={'spin'} color={color} width={"15px"} height={"15px"}/>
  )
}

export default Loading