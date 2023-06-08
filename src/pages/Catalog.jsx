import { Link, useNavigate } from "react-router-dom";
import { getAvatarsService } from "../services/avatar.services"
import { useEffect, useState } from "react";
import { Orbit } from '@uiball/loaders'



function Catalog() {

  const navigate = useNavigate()

  const [ avatars, setAvatars ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAvatars, setFilteredAvatars] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const getData = async () => {
    try {
      // const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todo`)
      const response = await getAvatarsService()
      setAvatars(response.data)
      setIsLoading(false)
    } catch (err) {
      navigate("/error");
    }
  }

  useEffect(()=> {
    getData()
  }, [])

  useEffect(() => {
    const filtered = avatars.filter((avatar) =>
      avatar.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let sorted = [...filtered];
    if (isSorted) {
      sorted = sorted.sort((a, b) => b.likes.length - a.likes.length);
    }

    setFilteredAvatars(sorted);
  }, [avatars, searchQuery, isSorted]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSortByPopularity = () => {
    setIsSorted(!isSorted);
  };

  const displayAvatars = isSorted ? filteredAvatars : (searchQuery ? filteredAvatars : avatars);

  return (
    <div>
      {isLoading ? (
       <Orbit 
       size={25}
       speed={1.5} 
       color="black" 
      />
      ) : (
        <>
          <input
            type="text"
            placeholder="Search avatars"
            value={searchQuery}
            onChange={handleSearch}
          />
          <label>
            Ordenar por popularidad:
            <input
              type="checkbox"
              checked={isSorted}
              onChange={handleSortByPopularity}
            />
          </label>
          {displayAvatars.map((avatar) => (
            <div key={avatar._id}>
              <h3>{avatar.name}</h3>
              <Link to={`/avatar/${avatar._id}`}>
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    avatar.json.svg
                  )}`}
                  alt="avatar"
                  style={{ width: "150px", height: "150px" }}
                />
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Catalog