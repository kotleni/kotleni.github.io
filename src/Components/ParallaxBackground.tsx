import {useEffect, useState} from 'react';
import '../App.scss';
import editor_image from './editor.png'

const SENSITIVITY = 1.4;

function ParallaxBackground() {
  const [{x, y}, setPosition] = useState({x: 0, y: 0});
  const handleMouseMove = (e: MouseEvent) => {
    // Get the mouse coordinates
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    // Calculate the new position for the parallax effect
    const newX = (mouseX / window.innerWidth) * SENSITIVITY;
    const newY = (mouseY / window.innerHeight) * SENSITIVITY;

    // Update the position state
    setPosition({ x: newX, y: newY });
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }; // as didUnmount
  }, [] /* as didMount */)

  return (
      <div
          className="parallax"
          style={{
            transform: `translate(${x}%, ${y}%)`,
          }}
      >
        <div className="parallax-container"><img className="parallax-image" src={editor_image} alt="Code Editor"></img>
        </div>
      </div>
  );
}

export default ParallaxBackground;
