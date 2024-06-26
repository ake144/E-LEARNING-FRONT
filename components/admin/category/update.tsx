import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { categorySchema } from '@/types/course';
import { useUpdateCategory } from '@/utils/quries/hooks';
import { toast } from '@/components/ui/use-toast';

interface EditCategoryProps {
  category: categorySchema;
  onSubmit: (data: categorySchema) => void;
}

const EditCategory: React.FC<EditCategoryProps> = ({ category, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<categorySchema>({
    defaultValues: category,
  });

  const { mutate: updateCategory } = useUpdateCategory();

  const handleFormSubmit: SubmitHandler<categorySchema> = (data) => {
    updateCategory({ id: category.id, data }, {
      onSuccess: () => {
        toast({
          title: "Category updated successfully",
          variant: "default",
          duration: 5000,
        });
        onSubmit(data);
      },
      onError: () => {
        toast({
          title: "Category update failed",
          variant: "destructive",
          duration: 5000,
        });
      }
    });
  };

  return (
    <div className='w-[250px] h-[200px] flex justify-center items-center'>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label htmlFor="name">Category Name</label>
          <input
            className='border-2 border-gray-300 my-3 p-2 w-full rounded-md'
            id="name"
            {...register("name", { required: "Category name is required" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <button type="submit" className="bg-blue-500 my-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
