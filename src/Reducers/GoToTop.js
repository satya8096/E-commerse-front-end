import React from 'react'
import { Link } from 'react-router-dom';
export default function GoToTop() {

  function goToTop(){
    document.documentElement.scrollTop = 0;
  }

  const scrollBtn =()=>{
    let scrollProgress = document.getElementById('top-btn1');
    let position = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollHeight = Math.round((position*100)/calcHeight);

    if(position > 100){
      scrollProgress.style.display = 'grid';
    }
    else{
      scrollProgress.style.display = 'none';
    }

    scrollProgress.style.background = `conic-gradient(#00AF54 ${scrollHeight}%,#d7d7d7 ${scrollHeight}%)`

  }

  window.onscroll = scrollBtn;
  window.onload = scrollBtn;
  return (
    <>
    <Link className='top-button text-decoration-none' id='top-btn1' onClick={goToTop}><span className='scrollValue'><i className="fa-solid fa-arrow-up"></i></span></Link>
    </>
  )
}
