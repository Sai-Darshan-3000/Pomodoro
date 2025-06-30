import '../styles/dashboard.css'; 
const backgrounds = {
  black: '/backgrounds/black.jpg',
  academia: '/backgrounds/Ocean.jpg',
  gradient: '/backgrounds/grad.jpg',
};

function BackgroundSelector() {
  const handleChange = (e) => {
    const selected = e.target.value;
    document.body.style.backgroundImage = `url(${backgrounds[selected]})`;
  };

  return (
    <select onChange={handleChange} defaultValue="black">
      <option value="black"> Black</option>
      <option value="academia"> Ocean</option>
      <option value="gradient">Gradient</option>
    </select>
  );
}

export default BackgroundSelector;
