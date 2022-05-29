import Tetris from './components/tetris/Tetris';
import SnakeBoard from './components/snake/SnakeBoard';
// import MyGame from './components/phaser/MyGame'
import './App.css';
import React, {Component} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation'
import SpaceInvaders from './components/test/SpaceInvaders'
import Space from './components/test/Space';

export default class App extends Component {
    constructor() {
        super();
        this.state = {

        }
        
        // let swiper = new Swiper('.swiper-Container', {
        //     zoom: {
        //         minRatio: 0.8,
        //         maxRatio: 1.2
        //     }
        // })
        //     swiper.on("slideChangeTransitionStart", swiper.zoom.out);
        //     swiper.on("slideChangeTransitionEnd", swiper.zoom.in)
    }
    
    render() {
     return (
      <div style={{ textAlign: "center" }}>
       <h1 className='siteName'>Retro Arcade</h1>
        <div className='swiper-container'>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination
                               
            >
                <SwiperSlide>
                    <Tetris />
                </SwiperSlide>
                <SwiperSlide>
                    <SnakeBoard />
                </SwiperSlide>
                <SwiperSlide>
                    <Space/>
                </SwiperSlide>
            </Swiper>
        </div>
        {/* <Controls /> */}
      </div>
     );
    }
   }