import { Component } from 'react';
import '../App.scss';
import editor_image from './editor.png'

class ParallaxBackground extends Component<object, {position: { x: number; y: number; }}> {
  sensitivity = 1.4;

  constructor() {
    super({});
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

  handleMouseMove(e: MouseEvent) {
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
        <div className="parallax-container"><img className="parallax-image" src={editor_image} alt="Code Editor"></img></div>
      </div>
    );
  }
}

export default ParallaxBackground;
