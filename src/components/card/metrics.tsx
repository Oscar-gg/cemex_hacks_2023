import React from 'react';

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  return (
    <a
      href="#"
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 p-2"
    >
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-lg"
        src={imageUrl}
        alt=""
      />
      <div className="ml-2 flex flex-col justify-between leading-normal">
        <h5 className=" text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700">{description}</p>
      </div>
    </a>
  );
};

export default Card;
