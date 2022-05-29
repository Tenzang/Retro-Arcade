import React, { Component } from "react";
import Title from "./Title";

class Space extends Component {
    constructor() {
        super();
        this.pressedKeys = { left: 0, right: 0, space: 0, enter: 0 };
    }

    // setting direction to true or false
    handleKeys(value, e) {
        let keys = this.pressedKeys;
        const { key } = e;
        switch(key) {
            case 'ArrowLeft':
                keys.left = value;
                console.log(key, value)
                break;
            case 'ArrowRight':
                keys.right = value;
                console.log(key, value)
                break;
            case ' ':
                keys.space = value;
                console.log(key, value)
                break;
            case 'Enter':
                keys.enter = value;
                console.log(key, value)
                break;
        }
        this.pressedKeys = keys;
        console.log(this.pressedKeys)
    }

    // we have two event listeners because when a key is pressed the direction pressed is set to true, and when released it is set back to false. Otherwise the object will continue moving in that direction pressed.
    bindKeys() {
        document.addEventListener("keyup", this.handleKeys.bind(this, false));
        document.addEventListener("keydown", this.handleKeys.bind(this, true));
    }

    unbindKeys() {
        document.removeEventListener("keyup", this.handleKeys);
        document.removeEventListener("keydown", this.handleKeys);
    }

    componentDidMount() {
        this.bindKeys();
    }

    componentWillUnmount() {
        this.unbindKeys();
    }


    render() {
        return (
            <div>
                <Title />
                <canvas ref="canvas" width={600} height={600}/>
            </div>
        )
    }
}

export default Space