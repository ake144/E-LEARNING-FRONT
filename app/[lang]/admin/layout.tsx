import Navbar from '@/components/admin/Navbar';
import Sidebar from '@/components/admin/Sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <div className='hidden md:block h-[100vh] w-[300px]'>
          <Sidebar />
        </div>
        <div className='p-5 mt-[80px] ml-[30px] w-full md:max-w-[1140px]'>
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
