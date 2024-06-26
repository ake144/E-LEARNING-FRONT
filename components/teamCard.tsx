// components/TeamMembers.js
import Image from 'next/image';
import { CgProfile } from "react-icons/cg";



const teamMembers = [
  {
    name: 'Henok Assefa',
    role: 'Graphics Designer',
    image: '/HenokImage.png',
  },
  {
    name: 'Medhanit Birhane',
    role: 'Script Writer',
    image: '/MedhanitImage.jpg',
  },
  {
    name: 'Tigist Fishea',
    role: 'Senior Script Writer/Director',
    image: '/TigistImage/',
  },
  // Add other team members as needed
];

const TeamMembers = () => {
  return (
    <div className='lg:px-[100px] py-10 px-7 text-sans '>
     <h2 className='text-4xl flex py-5  text-black justify-center items-center'>Meet our Team</h2>
    
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
       
      {teamMembers.map((member, index) => (
        <div key={index} className="flex flex-col items-center p-4 bg-white rounded shadow-md">
         <CgProfile className='h-11 w-9'/>
          <Image
            src={member?.image}
            alt={member.name}
            height={24}
            width={24}
            className="w-24 h-24 rounded-full object-cover"
          />
          <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
          <p className="mt-2 text-gray-600">{member.role}</p>
        </div>
      ))}
    </div>
</div>
  );
};

export default TeamMembers;
