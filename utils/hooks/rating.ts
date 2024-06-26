import { getAllRatings, updateRating, deleteRating, createRating,getRatingById } from "../quries/getcourse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useAllRatings() {
  return useQuery(
    {queryKey:["ratings"],
    queryFn:getAllRatings,
    staleTime:60000
    }
)
}

export function useRatingById(id:string) {
  return useQuery(
    {queryKey:["rating",id],
    queryFn:()=>getRatingById(id),
    staleTime:60000
    }
)
}

export function useCreateRating() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createRating'],
    mutationFn: createRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ratings'] });
    },
    });
}

export function useUpdateRating() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateRating'],
    mutationFn: updateRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ratings'] });
    },
    });
}

export function useDeleteRating() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteRating'],
    mutationFn: deleteRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ratings'] });
    },
    });
}




