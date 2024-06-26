'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { CategorySchema } from '@/utils/types/identifiers';
import {useCreateCategory} from '@/utils//quries/hooks';
import { toast } from '@/components/ui/use-toast';


const AddCategory = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CategorySchema>();
const {mutate: createCategory} = useCreateCategory();

  const onSubmit =(data:any)=>{
    createCategory(data,{
      onSuccess: ()=>{
        toast({
          title: "Category added successfully",
          variant: "default",
          duration: 5000,
        });
        reset();
      },
      onError: ()=>{
        toast({
          title: "Category creation failed",
          variant: "destructive",
          duration: 5000,
        });
      },
    
    });
  }

  return (
    <div className='w-[250px] flex justify-center items-center h-[200px]'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className='my-3'>Category Name</label>
          <input
            className='border-2 border-gray-300 p-2 w-full rounded-md'
            id="name"
            {...register("name", { required: "Category name is required" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <button type="submit" className="bg-green-500 my-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
