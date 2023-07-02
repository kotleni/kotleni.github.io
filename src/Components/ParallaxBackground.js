import React, { Component } from 'react';
import '../App.css'; // Import your CSS file

class ParallaxBackground extends Component {
  sensitivity = 1.4;

  constructor(props) {
    super(props);
    this.state = {
      position: { x: 0, y: 0 },
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(e) {
    // Get the mouse coordinates
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    // Calculate the new position for the parallax effect
    const newX = (mouseX / window.innerWidth) * this.sensitivity;
    const newY = (mouseY / window.innerHeight) * this.sensitivity;

    // Update the position state
    this.setState({
      position: { x: newX, y: newY },
    });
  }

  render() {
    const { x, y } = this.state.position;

    return (
      <div
        className="parallax"
        style={{
          opacity: 0.9,
          transform: `translate(${x}%, ${y}%)`,
        }}
      >
        <div class="parallax"><img class="parallax_image" src="editor.png" alt="Code Editor"></img><span class="parallax_overlay"></span></div>
      </div>
    );
  }
}

export default ParallaxBackground;
