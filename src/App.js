import Tetris from './components/tetris/Tetris';
import SnakeBoard from './components/snake/SnakeBoard';
import MyGame from './components/phaser/MyGame'
import './App.css';
import React, {Component} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation'

export default class App extends Component {
    render() {
     return (
      <div style={{ textAlign: "center" }}>
       <h1>Arcade Games</h1>
        <div className='swiper-container'>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination
                
            >
                <SwiperSlide>
                    <div className='gameContainer'>
                        <Tetris />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <SnakeBoard />
                </SwiperSlide>
                {/* <SwiperSlide id="phaser">
                    <MyGame />
                </SwiperSlide> */}
            </Swiper>
        </div>
      </div>
     );
    }
   }