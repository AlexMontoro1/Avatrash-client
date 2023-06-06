import { useEffect, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { createAvatarService } from "../../services/avatar.services"
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate()

  const [seed, setSeed] = useState('Felix');
  const [accessory, setAccessory] = useState('blank');
  const [avatarSvg, setAvatarSvg] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(['65c9ff']);
  const [backgroundType, setBackgroundType] = useState('solid');
  const [accessoriesColor, setAccessoriesColor] = useState(['3c4f5c']);
  const [clothesColor, setClothesColor] = useState(['ff5c5c']);
  const [clothing, setClothing] = useState(['blank']);
  const [clothingGraphic, setClothingGraphic] = useState(['bear']);
  const [eyebrows, setEyebrows] = useState(['default']);
  const [eyes, setEyes] = useState(['default']);
  const [facialHair, setFacialHair] = useState(['blank']);
  const [facialHairColor, setFacialHairColor] = useState(['724133']);
  const [hairColor, setHairColor] = useState(['a55728']);
  const [hatColor, setHatColor] = useState(['5199e4']);
  const [mouth, setMouth] = useState(['default']);
  const [skinColor, setSkinColor] = useState(['d08b5b']);
  const [style, setStyle] = useState(['default']);
  const [top, setTop] = useState(['blank']);
  const [name, setName] = useState("")
  const [json, setJson] = useState(null)
  const [likes, setLikes] = useState(0)

  
  useEffect(() => {
    const generateAvatar = () => {
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
        backgroundColor : [backgroundColor],
        name,
        likes
      });
      setJson(avatar.toJson())
      console.log(avatar)
      setAvatarSvg(avatar);
    };
    generateAvatar()
  }, [seed, accessory, backgroundColor, backgroundType, accessoriesColor, clothesColor, clothing, clothingGraphic, eyebrows, eyes, facialHair, facialHairColor, hairColor, hatColor, mouth, skinColor, style, top]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const avatarData = {
        seed,
        accessories: accessory,
        backgroundColor,
        backgroundType,
        accessoriesColor,
        clothesColor,
        clothing,
        clothingGraphic,
        eyebrows,
        eyes,
        facialHair,
        facialHairColor,
        hairColor,
        hatColor,
        mouth,
        skinColor,
        style,
        top,
        name,
        json,
        likes
      };
  
      await createAvatarService(avatarData)
      navigate("/profile")
    } catch (error) {
      navigate("/error");
    }
  }
 

  

  
  
  return (
    <div>
    <form onSubmit={handleSubmit}>
    <div>
  <label htmlFor="skinColor-select">Color de piel:</label>
  <select
    id="skinColor-select"
    value={skinColor}
    onChange={(e) => setSkinColor(e.target.value)}
  >
    {Object.entries(skinColorOptions).map((([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        ))}
  </select>
</div>

<div>
  <label htmlFor="style-select">Estilo:</label>
  <select id="style-select" value={style} onChange={(e) => setStyle(e.target.value)}>
  {Object.entries(styleOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

    <div>
      <label htmlFor="accessory-select">Accesorio:</label>
      <select id="accessory-select" value={accessory} onChange={(e) => setAccessory(e.target.value)}>
      {Object.entries(accessoryOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
        ))}
        
      </select>
    </div>

    <div>
  <label htmlFor="accessoriesColor-select">Color del accesorio:</label>
  <select
    id="accessoriesColor-select"
    value={accessoriesColor}
    onChange={(e) => setAccessoriesColor(e.target.value)}
  >
    {Object.entries(accessoriesColorOptions).map((([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        ))}
  </select>
</div>

    <div>
      <label htmlFor="backgroundColor-select">Color de fondo:</label>
      <select id="backgroundColor-select" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}>
        {Object.entries(backgroundColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
        
      </select>
    </div>


<div>
  <label htmlFor="clothing-select">Ropa:</label>
  <select
    id="clothing-select"
    value={clothing}
    onChange={(e) => setClothing(e.target.value)}
  >
     {Object.entries(clothesOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="clothesColor-select">Color de la ropa:</label>
  <select
    id="clothesColor-select"
    value={clothesColor}
    onChange={(e) => setClothesColor(e.target.value)}
  >
    {Object.entries(clothesColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
  </select>
</div>

<div>
  <label htmlFor="clothingGraphic-select">Gráfico de la ropa:</label>
  <select
    id="clothingGraphic-select"
    value={clothingGraphic}
    onChange={(e) => setClothingGraphic(e.target.value)}
  >
     {Object.entries(clothesGraphicOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="eyebrows-select">Cejas:</label>
  <select id="eyebrows-select" value={eyebrows} onChange={(e) => setEyebrows(e.target.value)}>
  {Object.entries(eyebrowsOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="eyes-select">Ojos:</label>
  <select id="eyes-select" value={eyes} onChange={(e) => setEyes(e.target.value)}>
  {Object.entries(eyesOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="facialHair-select">Vello facial:</label>
  <select
    id="facialHair-select"
    value={facialHair}
    onChange={(e) => setFacialHair(e.target.value)}
  >
     {Object.entries(facialHairOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="facialHairColor-select">Color del vello facial:</label>
  <select
    id="facialHairColor-select"
    value={facialHairColor}
    onChange={(e) => setFacialHairColor(e.target.value)}
  >
    {Object.entries(facialHairColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
  </select>
</div>

<div>
  <label htmlFor="mouth-select">Boca:</label>
  <select id="mouth-select" value={mouth} onChange={(e) => setMouth(e.target.value)}>
  {Object.entries(mouthOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="top-select">Pelo o gorro:</label>
  <select id="top-select" value={top} onChange={(e) => setTop(e.target.value)}>
  {Object.entries(topOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="hairColor-select">Color del pelo:</label>
  <select id="hairColor-select" value={hairColor} onChange={(e) => setHairColor(e.target.value)}>
  {Object.entries(hairColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
  </select>
</div>

<div>
  <label htmlFor="hatColor-select">Color del gorro:</label>
  <select id="hatColor-select" value={hatColor} onChange={(e) => setHatColor(e.target.value)}>
  {Object.entries(hatColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
  </select>
</div>



    <div>
      {avatarSvg && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg)}`}
          alt="avatar"
          style={{ width: '300px', height: '300px' }}
        />
      )}
    </div>

    <div>
  <label htmlFor="name">Nombre:</label>
  <input type="text" placeholder="...nombre del avatar" id="name" value={name} onChange={(e) => setName(e.target.value)}>
  </input>
  </div>

  <button type="submit">Crear Avatar</button>
    </form>
    
  </div>
  );
}

export default AvatarCreate;