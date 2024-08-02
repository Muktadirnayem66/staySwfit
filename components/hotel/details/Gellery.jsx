import Image from "next/image";

const Gallery = ({gellary}) => {

  const newGellary = [...gellary]
  newGellary.shift()

    return (
      <section className="container">
        <div className="grid grid-cols-2 imageshowCase">
          <Image src={gellary[0]} className="h-[400px] rounded-sm" alt="Main pic" width={400} height={400} />
  
          <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
            {
              newGellary.map((image)=>(

                <Image key={image} className="rounded-sm" src={image} alt="sub pics" width={400} height={400} />
              ))
            }
            
          </div>
        </div>
      </section>
    );
  };
  
  export default Gallery;
  