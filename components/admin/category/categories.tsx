'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AddCategory from './AddNew';
import EditCategory from './update';
import { UseGetAllCategories, useDeleteCategory } from '@/utils/quries/hooks';
import { categorySchema } from '@/types/course';
import { toast } from '@/components/ui/use-toast';

interface CategoriesTableProps {
  limit?: number;
  title?: string;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ limit, title }) => {
  const [categories, setCategories] = useState<categorySchema[]>([]);
  const [editingCategory, setEditingCategory] = useState<categorySchema | null>(null);
  const { data: allCategories, refetch } = UseGetAllCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  useEffect(() => {
    if (allCategories) {
      setCategories(allCategories);
    }
  }, [allCategories]);

  const handleEditCategory = (updatedCategory: categorySchema) => {
    setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: any) => {
    deleteCategory(id, {
      onSuccess: () => {
        setCategories(categories.filter(category => category.id !== Number(id)));
        toast({
          title: "Category deleted successfully",
          variant: "default",
          duration: 5000,
        });
      },
      onError: () => {
        toast({
          title: "Category deletion failed",
          variant: "destructive",
          duration: 5000,
        });
      }
    });
  };

  const sortedCategories = [...categories]; // Modify if sorting is needed
  const filteredCategories = limit ? sortedCategories.slice(0, limit) : sortedCategories;

  return (
    <div className='mt-10'>
      <h3 className='text-2xl mb-4 font-semibold'>{title ? title : 'Categories'}</h3>

      <Popover>
        <PopoverTrigger asChild>
          <button type="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add New Category
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <AddCategory />
        </PopoverContent>
      </Popover>

      <Table>
        <TableCaption>A list of categories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <div className='flex space-x-2'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs'
                        onClick={() => setEditingCategory(category)}
                      >
                        Edit
                      </button>
                    </PopoverTrigger>
                    {editingCategory?.id === category.id && (
                      <PopoverContent>
                        <EditCategory category={editingCategory} onSubmit={handleEditCategory} />
                      </PopoverContent>
                    )}
                  </Popover>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(category.id)}
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs'
                  >
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesTable;
