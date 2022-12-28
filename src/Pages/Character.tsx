import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Character() {
  const [episodeData, setEpisodeData] = useState<any[]>([]);
  const [locationsData, setLocationsData] = useState({
    name: '',
    dimension: '',
    residents: [],
  });

  const fetchEpisodes = async (episode: string) => {
    const response = await fetch(episode);
    const data = await response.json();
    setEpisodeData((state) => [...state, data.name]);
  };

  const fetchLocations = async (episode: string) => {
    const response = await fetch(episode);
    const data = await response.json();

    setLocationsData(data);
  };

  const { state } = useLocation() as any;

  const { name, species, origin, image, location } = state.user;

  useEffect(() => {
    // fetch episodes
    const data = JSON.parse(state.episode) as unknown as Array<any>;
    data.map(fetchEpisodes);

    // fetch locations
    fetchLocations(location.url);
  }, []);

  return (
    <div className="flex justify-center flex-wrap gap-10 p-4 md:p-8">
      <img
        alt={name}
        src={image}
        className="rounded-md object-cover self-start w-full md:max-w-md h-auto shadow-md hover:shadow-xl"
      />
      <div>
        <div>
          {name && <h4 className="text-xl">{`Name: ${name}`}</h4>}
          {species && <p className="text-xl mt-2">{`Species: ${species}`}</p>}
          {origin.name && (
            <p className="text-xl mt-2">{`Origin: ${origin.name}`}</p>
          )}
          {locationsData.name && (
            <p className="text-xl mt-2">{`Dimension: ${locationsData.dimension}`}</p>
          )}
          {locationsData.name && (
            <p className="text-xl mt-2">{`Location: ${locationsData.name}`}</p>
          )}
          {locationsData.residents && (
            <p className="text-xl mt-2">{`Amount of Residents: ${locationsData.residents.length}`}</p>
          )}
        </div>
        <h1 className="text-2xl lg:text-3xl text-blue-500 mt-4">
          Episodes Appeared
        </h1>
        <ol className="mt-4">
          {episodeData?.map((episode, idx) => (
            <li key={episode} className="text-lg lg:text-xl text-gray-800">
              {idx + 1}. {episode}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Character;
