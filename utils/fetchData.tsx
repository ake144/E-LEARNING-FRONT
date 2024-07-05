import { Mutation, useQuery } from "@tanstack/react-query";



export const getCourses = async () => {
    fetch('url/posts')
    .then(response => response.json())
    .then(data => {
        return data
    });

}

export function getCourse(){
    return useQuery({
        queryKey: ['courses'],
        queryFn: getCourses
    })
}

// export function createPost(post: any){
//     return Mutation({
//         mutationKey: ['createPost'],
//         mutationFn: async () => {
//             const response = await fetch('url/posts', {
//                 method: 'POST',
//                 body: JSON.stringify(post),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             return response.json();
//         }
         
//     })

// }    



// const {register , handleChange , Errors} = useForm();

// const {mutation , mutationAsync , isLoading , isError} = useMutation(postData);

// const Submit = (data) => {
// mutateAsync(data);
// }

// return(
// <form onSubmit={handleChange(Submit)}>
// <input type="text" register={'name'}/>
// </form>
// )



export const getCourseBySlug = async (slug: string) => {
    fetch(`url/posts/${slug}`)
    .then(response => response.json())
    .then(data => {
        return data
    });

}

export function CourseBySlug(slug: string){
    return useQuery({
        queryKey: ['courses', slug],
        queryFn: ()=>getCourseBySlug(slug)
    })
}



