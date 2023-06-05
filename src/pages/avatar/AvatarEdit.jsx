import { useEffect, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { editAvatarService, getAvatarDetailsService } from "../../services/avatar.services"
import {  useParams, useNavigate } from "react-router-dom";
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

function AvatarEdit() {
  const { avatarId } = useParams()  

  const navigate = useNavigate()

  const [seed, setSeed] = useState('Felix');
  const [accessory, setAccessory] = useState('blank');
  const [avatarSvg, setAvatarSvg] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('65c9ff');
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
  const [name, setName] = useState("");
  const [json, setJson] = useState(null);
  const [editedSeed, setEditedSeed] = useState('Felix');
  const [editedAccessory, setEditedAccessory] = useState('blank');
  const [editedAvatarSvg, setEditedAvatarSvg] = useState('');
  const [editedBackgroundColor, setEditedBackgroundColor] = useState('65c9ff');
  const [editedBackgroundType, setEditedBackgroundType] = useState('solid');
  const [editedAccessoriesColor, setEditedAccessoriesColor] = useState(['3c4f5c']);
  const [editedClothesColor, setEditedClothesColor] = useState(['ff5c5c']);
  const [editedClothing, setEditedClothing] = useState(['blank']);
  const [editedClothingGraphic, setEditedClothingGraphic] = useState(['bear']);
  const [editedEyebrows, setEditedEyebrows] = useState(['default']);
  const [editedEyes, setEditedEyes] = useState(['default']);
  const [editedFacialHair, setEditedFacialHair] = useState(['blank']);
  const [editedFacialHairColor, setEditedFacialHairColor] = useState(['724133']);
  const [editedHairColor, setEditedHairColor] = useState(['a55728']);
  const [editedHatColor, setEditedHatColor] = useState(['5199e4']);
  const [editedMouth, setEditedMouth] = useState(['default']);
  const [editedSkinColor, setEditedSkinColor] = useState(['d08b5b']);
  const [editedStyle, setEditedStyle] = useState(['default']);
  const [editedTop, setEditedTop] = useState(['blank']);
  const [editedName, setEditedName] = useState("");
  const [editedJson, setEditedJson] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatar = await getAvatarDetailsService(avatarId);
        const avatarData = avatar.data.avatar;

        setEditedSeed(avatarData.seed);
        setEditedAccessory(avatarData.accessories);
        setEditedBackgroundColor(avatarData.backgroundColor);
        setEditedBackgroundType(avatarData.backgroundType);
        setEditedAccessoriesColor(avatarData.accessoriesColor);
        setEditedClothesColor(avatarData.clothesColor);
        setEditedClothing(avatarData.clothing);
        setEditedClothingGraphic(avatarData.clothingGraphic);
        setEditedEyebrows(avatarData.eyebrows);
        setEditedEyes(avatarData.eyes);
        setEditedFacialHair(avatarData.facialHair);
        setEditedFacialHairColor(avatarData.facialHairColor);
        setEditedHairColor(avatarData.hairColor);
        setEditedHatColor(avatarData.hatColor);
        setEditedMouth(avatarData.mouth);
        setEditedSkinColor(avatarData.skinColor);
        setEditedStyle(avatarData.style);
        setEditedTop(avatarData.top);
        setEditedName(avatarData.name);
        setEditedAvatarSvg(avatarData.json.svg);
        setEditedJson(avatarData.json);
      } catch (error) {
        navigate('/error');
      }
    };

    fetchAvatar();
  }, [avatarId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedAvatarData = {
      seed: editedSeed,
      accessories: editedAccessory,
      backgroundColor: editedBackgroundColor,
      backgroundType: editedBackgroundType,
      accessoriesColor: editedAccessoriesColor,
      clothesColor: editedClothesColor,
      clothing: editedClothing,
      clothingGraphic: editedClothingGraphic,
      eyebrows: editedEyebrows,
      eyes: editedEyes,
      facialHair: editedFacialHair,
      facialHairColor: editedFacialHairColor,
      hairColor: editedHairColor,
      hatColor: editedHatColor,
      mouth: editedMouth,
      skinColor: editedSkinColor,
      style: editedStyle,
      top: editedTop,
      name: editedName,
      json: editedJson,
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
          backgroundType: [editedBackgroundType],
          backgroundRotation: 0,
          translateX: 0,
          translateY: 0,
          clip: true,
          randomizeIds: false,
          accessoriesColor: [editedAccessoriesColor],
          base: ["default"],
          clothesColor: [editedClothesColor],
          clothing: [editedClothing],
          clothingGraphic: [editedClothingGraphic],
          eyebrows: [editedEyebrows],
          eyes:[editedEyes],
          facialHair: [editedFacialHair],
          facialHairColor: [editedFacialHairColor],
          facialHairProbability: 100,
          hairColor: [editedHairColor],
          hatColor: [editedHatColor],
          mouth: [editedMouth],
          nose: ["default"],
          skinColor: [editedSkinColor],
          style: [editedStyle],
          top: [editedTop],
          topProbability: 100,
          accessories : [editedAccessory],
          accessoriesProbability: 100,
          backgroundColor : [editedBackgroundColor],
          name
        });
      
    
    setEditedAvatarSvg(avatar);
    }
    generateAvatar()
  }, [
    seed,
    accessory,
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
  ]);
 

  
  
  return (
    <div>
    <form onSubmit={handleSubmit}>
    <div>
  <label htmlFor="skinColor-select">Color de piel:</label>
  <select
    id="skinColor-select"
    value={editedSkinColor}
    onChange={(e) => setEditedSkinColor(e.target.value)}
  >
    {Object.entries(skinColorOptions).map((([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        ))}
  </select>
</div>

<div>
  <label htmlFor="style-select">Estilo:</label>
  <select id="style-select" value={editedStyle} onChange={(e) => setEditedStyle(e.target.value)}>
  {Object.entries(styleOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

    <div>
      <label htmlFor="accessory-select">Accesorio:</label>
      <select id="accessory-select" value={editedAccessory} onChange={(e) => setEditedAccessory(e.target.value)}>
      {Object.entries(accessoryOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
        ))}
        
      </select>
    </div>

    <div>
  <label htmlFor="accessoriesColor-select">Color del accesorio:</label>
  <select
    id="accessoriesColor-select"
    value={editedAccessoriesColor}
    onChange={(e) => setEditedAccessoriesColor(e.target.value)}
  >
    {Object.entries(accessoriesColorOptions).map((([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        ))}
  </select>
</div>

    <div>
      <label htmlFor="backgroundColor-select">Color de fondo:</label>
      <select id="backgroundColor-select" value={editedBackgroundColor} onChange={(e) => setEditedBackgroundColor(e.target.value)}>
        {Object.entries(backgroundColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
        
      </select>
    </div>


<div>
  <label htmlFor="clothing-select">Ropa:</label>
  <select
    id="clothing-select"
    value={editedClothing}
    onChange={(e) => setEditedClothing(e.target.value)}
  >
     {Object.entries(clothesOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="clothesColor-select">Color de la ropa:</label>
  <select
    id="clothesColor-select"
    value={editedClothesColor}
    onChange={(e) => setEditedClothesColor(e.target.value)}
  >
    {Object.entries(clothesColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
  </select>
</div>

<div>
  <label htmlFor="clothingGraphic-select">Gráfico de la ropa:</label>
  <select
    id="clothingGraphic-select"
    value={editedClothingGraphic}
    onChange={(e) => setEditedClothingGraphic(e.target.value)}
  >
     {Object.entries(clothesGraphicOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="eyebrows-select">Cejas:</label>
  <select id="eyebrows-select" value={editedEyebrows} onChange={(e) => setEditedEyebrows(e.target.value)}>
  {Object.entries(eyebrowsOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="eyes-select">Ojos:</label>
  <select id="eyes-select" value={editedEyes} onChange={(e) => setEditedEyes(e.target.value)}>
  {Object.entries(eyesOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="facialHair-select">Vello facial:</label>
  <select
    id="facialHair-select"
    value={editedFacialHair}
    onChange={(e) => setEditedFacialHair(e.target.value)}
  >
     {Object.entries(facialHairOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="facialHairColor-select">Color del vello facial:</label>
  <select
    id="facialHairColor-select"
    value={editedFacialHairColor}
    onChange={(e) => setEditedFacialHairColor(e.target.value)}
  >
    {Object.entries(facialHairColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
  </select>
</div>

<div>
  <label htmlFor="mouth-select">Boca:</label>
  <select id="mouth-select" value={editedMouth} onChange={(e) => setEditedMouth(e.target.value)}>
  {Object.entries(mouthOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="top-select">Pelo o gorro:</label>
  <select id="top-select" value={editedTop} onChange={(e) => setEditedTop(e.target.value)}>
  {Object.entries(topOptions).map((([paramCode, paramName]) => <option value={paramCode} key={paramCode}>{paramName}</option>
    ))}
  </select>
</div>

<div>
  <label htmlFor="hairColor-select">Color del pelo:</label>
  <select id="hairColor-select" value={editedHairColor} onChange={(e) => setEditedHairColor(e.target.value)}>
  {Object.entries(hairColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
  </select>
</div>

<div>
  <label htmlFor="hatColor-select">Color del gorro:</label>
  <select id="hatColor-select" value={editedHatColor} onChange={(e) => setEditedHatColor(e.target.value)}>
  {Object.entries(hatColorOptions).map(([colorCode, colorName]) => <option value={colorCode} key={colorCode}>{colorName}</option>
        )}
  </select>
</div>



    <div>
      {editedAvatarSvg && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(editedAvatarSvg)}`}
          alt="avatar"
          style={{ width: '300px', height: '300px' }}
        />
      )}
    </div>

    <div>
  <label htmlFor="name">Nombre:</label>
  <input type="text" placeholder="...nombre del avatar" id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)}>
  </input>
  </div>

  <button type="submit">Editar Avatar</button>
    </form>
    
  </div>
  );
}

export default AvatarEdit;