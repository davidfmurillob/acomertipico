import React from "react";


const NosotrosView = () => {

  const team = [
    {
      id: 1,
      image: "https://firebasestorage.googleapis.com/v0/b/react-imagenes.appspot.com/o/cristian.jpg?alt=media&token=210b30c2-23c5-43b7-8171-fa12c32d4b8e",
      name: "Cristian Jacanamijoy",
      description: "Backend developer"
    },
    {
      id: 2,
      image: "https://firebasestorage.googleapis.com/v0/b/react-imagenes.appspot.com/o/rodrigo3.jpg?alt=media&token=627c9497-ad52-453c-8728-6490c10ca5fb",
      name: "Rodrigo Papamija",
      description: "Backend developer"
    },    
    {
      id: 3,
      image: "https://firebasestorage.googleapis.com/v0/b/react-imagenes.appspot.com/o/david.jpg?alt=media&token=d0432ff8-fc12-4cda-8f04-929c39bffa2b",
      name: "David F. Murillo",
      description: "Frontend developer"
    },
    {
      id: 4,
      image: "https://firebasestorage.googleapis.com/v0/b/react-imagenes.appspot.com/o/lidia.jpg?alt=media&token=dc4b3934-5c72-47fe-ae00-904f084a0b0f",
      name: "Lidia Zambrano",
      description: "Android developer"
    },
    
    {
      id: 5,
      image: "https://firebasestorage.googleapis.com/v0/b/react-imagenes.appspot.com/o/jonathan.jpg?alt=media&token=3d266d6c-b2cd-4be7-a576-d0c36144eea7",
      name: "Jhonatan Urrea",
      description: "Android developer"
    },
    {
      id: 6,
      image: "https://firebasestorage.googleapis.com/v0/b/react-imagenes.appspot.com/o/viviana2.jpg?alt=media&token=15f01926-b10d-4736-9120-3a7de81c5814",
      name: "Viviana Montilla",
      description: "Android developer"    
    }
  ];

  return (




    <div className="h-full bg-zinc-800">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-10">
        <div className="text-center pb-12">
          <h1 className="text-2xl md:text-3xl lg:text-3xl text-white italic">
            Nuestro{" "}
            <span className="text-2xl sm:text-3xl text-orange-400">equipo</span>{" "}
            de desarrollo
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(member => (
            <div className="w-full bg-zinc-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center" key={member.id}>
            <div className="mb-8">
              <img
                className="object-center object-cover rounded-full h-36 w-36"
                src={member.image}
                alt={member.name}
              />
            </div>
            <div className="text-center">
              <p className="text-xl text-white font-bold mb-2">{member.name}</p>
              <p className="text-base text-gray-400 font-normal">
              {member.description}
              </p>
            </div>
          </div>
          ))}
          
          
        </div>
      </section>
    </div>
  );
};

export default NosotrosView;
