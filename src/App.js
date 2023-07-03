//import paralax_image from '../public/editor.png';
import './App.css';
import ParallaxBackground from './Components/ParallaxBackground';

function AppHeader() {
  return (
    <header class="header">
      <h1 class="header_title" onClick={()=> window.open('/rick', '_blank')}>Viktor Varenik</h1>
      <h2 class="header_subtitle">Android and iOS developer</h2>
    </header>
  );
}

function SocialItem(props) {
  return (
    <li class="social_item"><a class="social_link" href={props.link}>{props.title}</a></li>
  );
}

function AppBody() {
  return (
    <footer class="footer">
      <p class="footer_desc">I'm a developer based in Kharkiv, Ukraine. Specialized in developing react frontend and mobile applications using native technologies.</p>
      <ul class="social">
        <h3 class="social_title">Contacts:</h3>
        <SocialItem title="email" link="mailto:yavarenikya@gmail.com"/>
        <SocialItem title="telegram" link="https://t.me/kotleni"/>
        <SocialItem title="github" link="https://github.com/kotleni"/>
        <SocialItem title="linkedin" link="https://www.linkedin.com/in/kotleni"/>
      </ul>
    </footer>
  );
}

function App() {
  return (
    <div className="subroot">
      <div className="App">
        <AppHeader/>
        <AppBody/>
      </div>
      <ParallaxBackground/>
    </div>
  );
}

export default App;
