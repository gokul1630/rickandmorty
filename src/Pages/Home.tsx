import React, { useEffect, useState, useTransition } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import { Pagination } from '../Components/Pagination';

function Home() {
  const [data, setData] = useState<any>({});
  const [isLoading, startTransition] = useTransition();

  const fetchCharacters = async (page?: number) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

    const parsedData = await response.json();
    startTransition(() => {
      if (response.ok) setData(parsedData);
    });
  };

  useEffect(() => {
    fetchCharacters(1);
  }, []);

  const { results, info } = data;

  const onPageChange = (pageNumber: number) => {
    fetchCharacters(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="xl:container px-4 md:px-8 lg:px-28 mx-auto">
      <h1 className="text-blue-500 py-10 text-4xl text-center font-bold">
        Rick And Morty
      </h1>

      {!isLoading ? (
        <>
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {results?.map((datas: any) => {
              const {
                id,
                name,
                species,
                gender,
                origin,
                location,
                image,
                episode,
              } = datas;
              return (
                <li
                  key={id}
                  className="p-4 border rounded-xl shadow-md hover:shadow-xl"
                >
                  <Link
                    state={{
                      episode: JSON.stringify(episode),
                      user: {
                        name,
                        species,
                        image,
                        origin,
                        location,
                      },
                    }}
                    to={`character/${id}`}
                  >
                    <img
                      alt={name}
                      src={image}
                      className="rounded-lg object-cover w-full h-auto"
                    />
                    <div className="mt-5 flex gap-2">
                      <div>
                        {name ? <p>Name: </p> : null}
                        {species ? <p>Species: </p> : null}
                        {gender ? <p>Gender: </p> : null}
                        {origin.name ? <p>Origin: </p> : null}
                        {location.name ? <p>Location: </p> : null}
                      </div>
                      <div>
                        {name ? <h4> {name}</h4> : null}
                        {species ? <p> {species}</p> : null}
                        {gender ? <p>{gender}</p> : null}
                        {origin.name ? <p>{origin.name}</p> : null}
                        {location.name ? <p> {location.name}</p> : null}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          {info ? (
            <Pagination
              pageCount={info.count}
              className="py-10 w-full"
              pageSize={20}
              onPageChange={onPageChange}
            />
          ) : null}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Home;
