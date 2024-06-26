import StatCard from "@/components/admin/main";

export default function Home() {
  return (
    <>
      <div className='flex flex-col md:flex-row justify-between gap-5 mb-5 text-white'>
        <h3 className='text-2xl text-black font-semibold'>This is the admin dashboard</h3>
      </div>
   
        <div className='p-4 rounded-lg shadow-lg px-6  flex-1'>
         <StatCard />
      </div>
    </>
  );
}
