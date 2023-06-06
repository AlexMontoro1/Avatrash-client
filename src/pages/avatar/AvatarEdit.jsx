import { useEffect, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { editAvatarService, getAvatarDetailsService } from "../../services/avatar.services"
import {  useParams, useNavigate } from "react-router-dom";
import {
  accessoryOptions,
  backgroundColorOptions,
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

function AvatarEdit() {
  const { avatarId } = useParams()  

  const navigate = useNavigate()

  // accesorios de Avatr
  const [seed, setSeed] = useState('Felix');
  const [accessory, setAccessory] = useState('blank')
  const [backgroundColor, setBackgroundColor] = useState(['65c9ff']);
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

  // otros
  const [name, setName] = useState("");
  const [json, setJson] = useState(null);
  const [avatarSvg, setAvatarSvg] = useState('');
  

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatar = await getAvatarDetailsService(avatarId);
        const avatarData = avatar.data.avatar;

        setSeed(avatarData.seed);
        setAccessory(avatarData.accessories);
        setBackgroundColor(avatarData.backgroundColor);
        setAccessoriesColor(avatarData.accessoriesColor);
        setClothesColor(avatarData.clothesColor);
        setClothing(avatarData.clothing);
        setClothingGraphic(avatarData.clothingGraphic);
        setEyebrows(avatarData.eyebrows);
        setEyes(avatarData.eyes);
        setFacialHair(avatarData.facialHair);
        setFacialHairColor(avatarData.facialHairColor);
        setHairColor(avatarData.hairColor);
        setHatColor(avatarData.hatColor);
        setMouth(avatarData.mouth);
        setSkinColor(avatarData.skinColor);
        setStyle(avatarData.style);
        setTop(avatarData.top);

        setName(avatarData.name);
        //setAvatarSvg(avatarData.json.svg);
        //setJson(avatarData.json);
      } catch (error) {
        navigate('/error');
      }
    };

    fetchAvatar();
  }, [avatarId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedAvatarData = {
      seed,
      accessories: accessory,
      backgroundColor,
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
      json
    };

    try {
      await editAvatarService(avatarId, editedAvatarData);
      navigate('/profile');
    } catch (error) {
      navigate('/error');
    }
  };

  useEffect(() => {
    const generateAvatar = () => {
        const avatar = createAvatar(avataaars, {
          seed: seed,
          flip: false,
          rotate: 0,
          scale: 100,
          radius: 0,
          size: 64,
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
          name
        });
      
      setJson(avatar.toJson())
      setAvatarSvg(avatar);
      
    }
    generateAvatar()
  }, [
    seed, accessory, backgroundColor, accessoriesColor, clothesColor, clothing, clothingGraphic, eyebrows, eyes, facialHair, facialHairColor, hairColor, hatColor, mouth, skinColor, style, top
  ]);
 

  
  
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

  <button type="submit">Editar Avatar</button>
    </form>
    
  </div>
  );
}

export default AvatarEdit;