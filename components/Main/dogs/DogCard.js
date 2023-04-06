import Image from "next/image";
import Liked from "./Liked";

const DogCard = ({ dog }) => {
  return (
    <div className="w-full max-w-sm h-[30rem] border shadow-md">
      <div className="relative w-full h-80">
        <Image
          className="object-cover"
          src={dog.img}
          fill
          sizes="30vw"
          alt={dog.breed}
        />
        <Liked dog={dog} />
      </div>
      <div className="p-4 space-y-1">
        <h2 className="text-2xl">{dog.name}</h2>
        <h3 className="text-1xl font-semibold">{dog.breed}</h3>
        <p>
          <span>Age: </span>
          {dog.age > 0 ? `${dog.age} years old` : "under a year old"}
        </p>
        <p>
          <span>Location: </span>
          {dog.zip_code}
        </p>
      </div>
    </div>
  );
};

export default DogCard;
