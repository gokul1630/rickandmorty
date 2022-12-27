import React from 'react';
import { useQueries, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { Loader } from '../Components/Loader';
import { fetchEpisodes, fetchLocations } from '../queries/queries';

function Character() {
  const { state } = useLocation() as any;

  const { name, species, origin, image, location } = state.user;

  const { data, isLoading } = useQuery({
    queryKey: 'fetchLocations',
    queryFn: () => fetchLocations(location.url),
  });

  const { name: locationName, dimension, residents } = data as any;

  const episodeUrls = JSON.parse(state.episode) as unknown as Array<any>;

  const queriedData = useQueries([
    ...episodeUrls?.map((url) => {
      return {
        queryKey: url,
        queryFn: () => fetchEpisodes(url),
      };
    }),
  ]);

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
          {!isLoading ? (
            <p className="text-xl mt-2">{`Dimension: ${dimension}`}</p>
          ) : (
            <Loader />
          )}
          {!isLoading ? (
            <p className="text-xl mt-2">{`Location: ${locationName}`}</p>
          ) : (
            <Loader />
          )}
          {!isLoading ? (
            <p className="text-xl mt-2">{`Amount of Residents: ${residents.length}`}</p>
          ) : (
            <Loader />
          )}
        </div>
        <h1 className="text-2xl lg:text-3xl text-blue-500 mt-4">
          Episodes Appeared
        </h1>

        <ol className="mt-4">
          {queriedData?.map(({ isLoading, data = {} }, idx) => {
            const { name, id } = data;
            return (
              <>
                {isLoading ? (
                  <Loader />
                ) : (
                  <li key={id} className="text-lg lg:text-xl text-gray-800">
                    {idx + 1}. {name}
                  </li>
                )}
              </>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Character;
