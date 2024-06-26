'use client';

// components/AddCourseForm.tsx
import { useForm, useFieldArray } from 'react-hook-form';
import { CourseSchema } from '@/utils/types/identifiers';
import { useCreateCourse } from '@/utils/hooks/getCourse';
import 'tailwindcss/tailwind.css';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

const AddCourseForm = () => {
  const { data: session } = useSession();
  const user = session;

  const { register, handleSubmit, control, reset } = useForm<any>({
    defaultValues: {
      units: [{ id: Date.now(), title: '', lessons: [{ id: Date.now(), title: '', duration: '' }] }],
      ratings: [{ id: Date.now(), value: 0, message: '', course_id: 0, reviewer_id: 0 }],
    },
  });

  const { fields: unitFields, append: appendUnit, remove: removeUnits } = useFieldArray({
    control,
    name: "units",
  });

  // const { fields: ratingFields, append: appendRating } = useFieldArray({
  //   control,
  //   name: "ratings",
  // });

  const ManageLesson = ({ unitIndex }: { unitIndex: number }) => {
    const { fields: lessonFields, remove: removeLesson, append: appendLesson } = useFieldArray({
      control,
      name: `units.${unitIndex}.lessons`
    });

    return (
      <div className='my-4'>
        {lessonFields.map((lesson, lessonIndex) => (
          <div key={lesson.id} className='py-4 bg-gray-100 p-4 rounded-lg shadow-md'>
            <div className='flex justify-between items-center'>
              <div className='mb-2 font-semibold text-lg'>Lesson</div>
              <button
                type='button'
                onClick={() => removeLesson(lessonIndex)}
                className='text-red-500 text-sm underline'
              >
                Remove Lesson
              </button>
            </div>
            <label title={'Title'} className='block mb-2'>
              <span className='text-gray-700'>Title</span>
              <input
                placeholder='Enter lesson title'
                className='block w-full mt-1 border border-gray-300 rounded-md px-3 py-2'
                {...register(`units.${unitIndex}.lessons.${lessonIndex}.title`)}
              />
            </label>
          </div>
        ))}

        <button
          type='button'
          onClick={() => appendLesson({ id: Date.now(), title: '', duration: '' })}
          className='text-blue-500 w-full text-center underline mt-2'
        >
          Add Lesson
        </button>
      </div>
    );
  };

  const { mutate: createCourse } = useCreateCourse();

  const onSubmit = (data: any) => {
    const structuredContent = {
      about: data.about,
      requirements: data.requirements.split('\n'),
      targetAudience: data.targetAudience.split('\n'),
      units: data.units.map((unit: any) => ({
        title: unit.title,
        lessons: unit.lessons.map((lesson: any) => ({
          title: lesson.title,
          duration: lesson.duration
        }))
      }))
    };
  
    const finalData = {
      ...data,
      user_id: user?.user?.id,
      content: JSON.stringify(structuredContent)
    };
  
    createCourse(finalData, {
      onSuccess: () => {
        toast({
          variant: "default",
          title: 'Course created successfully',
          description: 'You have successfully added a new course.',
        });
        reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Course creation failed",
          description: "An unexpected error occurred.",
        });
      },
    });
  };
  

  return (
    <div className='container mx-auto p-4'>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Course</h2>
        
        {/* Basic Course Information */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Title</label>
            <input {...register("title")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <input {...register("level")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Short Video URL</label>
            <input {...register("short_video_url")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input {...register("image_url")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <input {...register("language")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input {...register("duration")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          
          <div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mt-5 mb-3">Course Content</h3>
            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700">About the Course</label>
              <textarea {...register("about")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700">Requirements (separate each requirement with a new line)</label>
              <textarea {...register("requirements")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700">Who is this course for? (separate each audience with a new line)</label>
              <textarea {...register("targetAudience")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" {...register("price")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category ID</label>
            <input type="number" {...register("category_id")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Instructor</label>
            <input {...register("instructor")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
       

        {/* Units and Lessons */}
        <div className='mt-6'>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Units</h3>
          {unitFields.map((unit, unitIndex) => (
            <div key={unit.id} className="mb-4 p-4 bg-gray-50 rounded-md shadow-md">
              <div className='flex justify-between items-center mb-2'>
                <label className="block text-sm font-medium text-gray-700">Unit Title</label>
                <Button
                  type='button'
                  onClick={() => removeUnits(unitIndex)}
                  className='text-red-500 text-sm underline'
                >
                  Remove Unit
                </Button>
              </div>
              <input
                placeholder='Enter unit title'
                {...register(`units.${unitIndex}.title`)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />

              {/* Lessons */}
              <ManageLesson unitIndex={unitIndex} />
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendUnit({ id: Date.now(), title: '', lessons: [{ id: Date.now(), title: '', duration: '' }] })}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Unit
          </button>
        </div>
        </div>
        <button type="submit" className="mt-9 items-center justify-center flex px-4 py-2 bg-green-500 text-white rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
