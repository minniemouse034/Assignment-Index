import Image from "next/image";
const Navbar = () => {
  return (
    <div className="py-5">
      <div className="max-w-7xl w-11/12 mx-auto flex justify-center">
        <Image
          src={"/pokemon-logo.svg"}
          alt="pokemon logo"
          width={300}
          height={150}
        />
      </div>
    </div>
  );
};

export default Navbar;
