import { useEffect, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import {
  handleSeedChange,
  handleAccessoryChange,
  handleBackgroundColorChange,
  handleBackgroundTypeChange,
  handleAccessoriesColorChange,
  handleClothesColorChange,
  handleClothingChange,
  handleClothingGraphicChange,
  handleEyebrowsChange,
  handleEyesChange,
  handleFacialHairChange,
  handleFacialHairColorChange,
  handleHairColorChange,
  handleHatColorChange,
  handleMouthChange,
  handleSkinColorChange,
  handleStyleChange,
  handleTopChange,
} from '../../utils/avatarChanges.js';
import {
  accessoryOptions,
  backgroundColorOptions,
  backgroundTypeOptions,
  accessoriesColorOptions,
  clothesColorOptions,
  clothesOptions,
  clothesGraphicOptions,
  eyebrowsOptions,
  eyesOptions,
  facialHairOptions,
  facialHairColorOptions,
  hairColorOptions,
  hatColorOptions,
  mouthOptions,
  skinColorOptions,
  topOptions,
  styleOptions,
} from '../../utils/avatarOptions.js';

function AvatarCreate() {
  const [seed, setSeed] = useState('Felix');
  const [accessory, setAccessory] = useState('blank');
  const [avatarSvg, setAvatarSvg] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('blank');
  const [backgroundType, setBackgroundType] = useState(['solid']);
  const [accessoriesColor, setAccessoriesColor] = useState(['3c4f5c']);
  const [clothesColor, setClothesColor] = useState(['ff5c5c']);
  const [clothing, setClothing] = useState(['blank']);
  const [clothingGraphic, setClothingGraphic] = useState(['blank']);
  const [eyebrows, setEyebrows] = useState(['blank']);
  const [eyes, setEyes] = useState(['blank']);
  const [facialHair, setFacialHair] = useState(['blank']);
  const [facialHairColor, setFacialHairColor] = useState(['724133']);
  const [hairColor, setHairColor] = useState(['a55728']);
  const [hatColor, setHatColor] = useState(['5199e4']);
  const [mouth, setMouth] = useState(['blank']);
  const [skinColor, setSkinColor] = useState(['d08b5b']);
  const [style, setStyle] = useState(['blank']);
  const [top, setTop] = useState(['blank']);

  
  useEffect(() => {
    const generateAvatar = () => {
      console.log(accessory);
      const avatar = createAvatar(avataaars, {
        seed: seed,
        flip: false,
        rotate: 0,
        scale: 100,
        radius: 0,
        size: 64,
        backgroundType: [backgroundType],
        backgroundRotation: 0,
        translateX: 0,
        translateY: 0,
        clip: true,
        randomizeIds: false,
        accessoriesColor: [accessoriesColor],
        base: ["default"],
        clothesColor: [clothesColor],
        clothing: [clothing],
        clothingGraphic: [clothingGraphic],
        eyebrows: [eyebrows],
        eyes:[eyes],
        facialHair: [facialHair],
        facialHairColor: [facialHairColor],
        facialHairProbability: 100,
        hairColor: [hairColor],
        hatColor: [hatColor],
        mouth: [mouth],
        nose: ["default"],
        skinColor: [skinColor],
        style: [style],
        top: [top],
        topProbability: 100,
        accessories : [accessory],
        accessoriesProbability: 100,
        backgroundColor : [backgroundColor]
      });
      setAvatarSvg(avatar);
    };
    generateAvatar()
  }, [seed, accessory, backgroundColor, backgroundType, accessoriesColor, clothesColor, clothing, clothingGraphic, eyebrows, eyes, facialHair, facialHairColor, hairColor, hatColor, mouth, skinColor, style, top]);


 

  

  
  
  return (
    <div>
    <div>
      <label htmlFor="seed-input">Seed:</label>
      <input id="seed-input" type="text" value={seed} onChange={handleSeedChange(setSeed)} />
    </div>

    <div>
  <label htmlFor="skinColor-select">Skin Color:</label>
  <select
    id="skinColor-select"
    value={skinColor}
    onChange={handleSkinColorChange(setSkinColor)}
  >
    {skinColorOptions.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="style-select">Style:</label>
  <select id="style-select" value={style} onChange={handleStyleChange(setStyle)}>
    {styleOptions.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
</div>

    <div>
      <label htmlFor="accessory-select">Accessory:</label>
      <select id="accessory-select" value={accessory} onChange={handleAccessoryChange(setAccessory)}>
        {accessoryOptions.map((eachAccesory) => <option value={eachAccesory}>{eachAccesory}</option>
        )}
        
      </select>
    </div>

    <div>
  <label htmlFor="accessoriesColor-select">Accessories Color:</label>
  <select
    id="accessoriesColor-select"
    value={accessoriesColor}
    onChange={handleAccessoriesColorChange(setAccessoriesColor)}
  >
    {Object.entries(accessoriesColorOptions).map((([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        ))}
  </select>
</div>

    <div>
      <label htmlFor="backgroundColor-select">Background Color:</label>
      <select id="backgroundColor-select" value={backgroundColor} onChange={handleBackgroundColorChange(setBackgroundColor)}>
        {Object.entries(backgroundColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
        
      </select>
    </div>

    <div>
  <label htmlFor="backgroundType-select">Background Type:</label>
  <select
    id="backgroundType-select"
    value={backgroundType}
    onChange={handleBackgroundTypeChange(setBackgroundType)}
  >
    {backgroundTypeOptions.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="clothing-select">Clothing:</label>
  <select
    id="clothing-select"
    value={clothing}
    onChange={handleClothingChange(setClothing)}
  >
    {clothesOptions.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="clothesColor-select">Clothes Color:</label>
  <select
    id="clothesColor-select"
    value={clothesColor}
    onChange={handleClothesColorChange(setClothesColor)}
  >
    {Object.entries(clothesColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
  </select>
</div>

<div>
  <label htmlFor="clothingGraphic-select">Clothing Graphic:</label>
  <select
    id="clothingGraphic-select"
    value={clothingGraphic}
    onChange={handleClothingGraphicChange(setClothingGraphic)}
  >
    {clothesGraphicOptions.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="eyebrows-select">Eyebrows:</label>
  <select id="eyebrows-select" value={eyebrows} onChange={handleEyebrowsChange(setEyebrows)}>
    {eyebrowsOptions.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="eyes-select">Eyes:</label>
  <select id="eyes-select" value={eyes} onChange={handleEyesChange(setEyes)}>
    {eyesOptions.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="facialHair-select">Facial Hair:</label>
  <select
    id="facialHair-select"
    value={facialHair}
    onChange={handleFacialHairChange(setFacialHair)}
  >
    {facialHairOptions.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="facialHairColor-select">Facial Hair Color:</label>
  <select
    id="facialHairColor-select"
    value={facialHairColor}
    onChange={handleFacialHairColorChange(setFacialHairColor)}
  >
    {Object.entries(facialHairColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
  </select>
</div>

<div>
  <label htmlFor="mouth-select">Mouth:</label>
  <select id="mouth-select" value={mouth} onChange={handleMouthChange(setMouth)}>
    {mouthOptions.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="top-select">Top:</label>
  <select id="top-select" value={top} onChange={handleTopChange(setTop)}>
    {topOptions.map((option) => (
      <option value={option} key={option}>
        {option}
      </option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="hairColor-select">Hair Color:</label>
  <select id="hairColor-select" value={hairColor} onChange={handleHairColorChange(setHairColor)}>
  {Object.entries(hairColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
  </select>
</div>

<div>
  <label htmlFor="hatColor-select">Hat Color:</label>
  <select id="hatColor-select" value={hatColor} onChange={handleHatColorChange(setHatColor)}>
  {Object.entries(hatColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
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