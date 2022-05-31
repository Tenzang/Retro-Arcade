import Tetris from './components/tetris/Tetris';
import SnakeBoard from './components/snake/SnakeBoard';
// import MyGame from './components/phaser/MyGame'
import './App.css';
import React, { useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation'
import SpaceInvaders from './components/SpaceInvaders/SpaceInvaders'
import Controls from './components/UI/Controls';

const App = () => {

    const games = ["Tetris", "Snake", "Space Invaders", "Pong"]
    const [game, setGame] = useState("Tetris")

    const handleChange = (index) => {
        setGame(games[index])
    }
    
     return (
      <div style={{ textAlign: "center" }}>
       <h1 className='siteName'>Retro Arcade</h1>
        <div className='swiper-container'>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination
                allowTouchMove={false}
                onSlideChange={(swiper) => handleChange(swiper.activeIndex)}
            >
                <SwiperSlide>                    
                    {({ isActive }) => (
                        <div>{isActive ? <Tetris/> : ''}</div>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                    {({ isActive }) => (
                        <div>{isActive ? <SnakeBoard/> : ''}</div>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                    {({ isActive }) => (
                        <div>{isActive ? <SpaceInvaders /> : ''}</div>
                    )}
                </SwiperSlide>
            </Swiper>
        </div>
        <Controls name={game} />
      </div>
     );
    
   }

   export default App;