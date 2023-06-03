import { useEffect, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

function AvatarCreate() {
  const [seed, setSeed] = useState('Felix');
  const [accessory, setAccessory] = useState("blank")
  const [avatarSvg, setAvatarSvg] = useState('');
  const [backgroundColor, setBackgroundColor] = useState("blank")

  useEffect(() => {
    const generateAvatar = () => {
        console.log(accessory);
        const avatar = createAvatar(avataaars, {
            "seed": seed,
            "accessories" : [accessory],
            "accessoriesProbability" : 100,
            "backgroundColor" : [backgroundColor]
          });
          setAvatarSvg(avatar);
        };

    generateAvatar();
  }, [seed, accessory, backgroundColor]);

  const handleSeedChange = (e) => {
    setSeed(e.target.value);
  };

  const handleAccessoryChange = (e) => {
    setAccessory(e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const accessoryOptions = ["blank", "eyepatch", "kurt", "prescription01", "prescription02", "round", "sunglasses", "wayfarers"];
  const backgroundColorOptions = {
    blank: "Blank",
    b6e3f4: 'Blue',
    c0aede: 'Purple',
    d1d4f9: 'Lavender',
  };
  return (
    <div>
    <div>
      <label htmlFor="seed-input">Seed:</label>
      <input id="seed-input" type="text" value={seed} onChange={handleSeedChange} />
    </div>

    <div>
      <label htmlFor="accessory-select">Accessory:</label>
      <select id="accessory-select" value={accessory} onChange={handleAccessoryChange}>
        {accessoryOptions.map((eachAccesory) => <option value={eachAccesory}>{eachAccesory}</option>
        )}
        
      </select>
    </div>

    <div>
      <label htmlFor="backgroundColor-select">Background Color:</label>
      <select id="backgroundColor-select" value={backgroundColor} onChange={handleBackgroundColorChange}>
        {Object.entries(backgroundColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
        
      </select>
    </div>

    <div>
      {avatarSvg && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg)}`}
          alt="avatar"
          style={{ width: '200px', height: '200px' }}
        />
      )}
    </div>
  </div>
  );
}

export default AvatarCreate;