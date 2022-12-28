import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Loader } from '../Components/Loader';
import { Pagination } from '../Components/Pagination';
import { fetchCharacters } from '../queries/queries';

function Home() {
  const [activePage, setActivePage] = React.useState(1);

  const { prefetchQuery } = useQueryClient();

  const queryObj = {
    queryKey: ['fetchCharacters', activePage],
    queryFn: () => fetchCharacters(activePage),
  };

  const { data, isLoading } = useQuery(queryObj);

  const { results, info } = data as any;

  const onPageChange = (pageNumber: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setActivePage(pageNumber);
    prefetchQuery({
      queryKey: 'fetchCharacters',
      queryFn: () => fetchCharacters(activePage),
    });
  };

  return (
    <div className="xl:container px-4 md:px-8 lg:px-28 mx-auto">
      <h1 className="text-blue-500 py-10 text-4xl text-center font-bold">
        Rick And Morty
      </h1>
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
                {!isLoading ? (
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
                ) : (
                  <Loader />
                )}
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
    </div>
  );
}

export default Home;
