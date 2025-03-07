"use client"


import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus, Trash2 } from "lucide-react"
import { CourseFormData, courseSchema } from "@/lib/validation"
import { createCourse } from "@/utils/quries/getcourse"

const AddCourseForm = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      level: "Beginner",
      language: "",
      duration: "",
      trending: false,
      price: 0,
      old_price: undefined,
      content: {
        about: "",
        requirements: [""],
        targetAudience: [""],
        whatYouWillLearn: [""],
        units: [
          {
            title: "",
            description: "",
            lessons: [
              {
                title: "",
                duration: "",
                videoUrl: "",
                resources: [],
                quiz: [],
              },
            ],
          },
        ],
      },
      category_id: 1,
      image_url: "",
      short_video_url: "",
    },
  })

  const {
    fields: unitFields,
    append: appendUnit,
    remove: removeUnit,
  } = useFieldArray({
    control,
    name: "content.units",
  })

  const { mutate, status } = useMutation(createCourse, {
    onSuccess: () => {
      toast({ title: "Course created successfully", description: "Your new course has been added." })
      reset()
      queryClient.invalidateQueries(["courses"])
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create course. Please try again.", variant: "destructive" })
    },
  })

  const onSubmit = (data: CourseFormData) => {
    if (session?.user?.id) {
      mutate({ ...data, user_id: session.user.id })
    } else {
      toast({ title: "Error", description: "You must be logged in to create a course.", variant: "destructive" })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" {...register("title")} placeholder="Enter course title" />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.level && <p className="text-sm text-red-500">{errors.level.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input id="language" {...register("language")} placeholder="e.g., English, Spanish" />
              {errors.language && <p className="text-sm text-red-500">{errors.language.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" {...register("duration")} placeholder="e.g., 10 hours" />
              {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                {...register("price", { valueAsNumber: true })}
                placeholder="Enter price"
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="old_price">Old Price (Optional)</Label>
              <Input
                id="old_price"
                type="number"
                {...register("old_price", { valueAsNumber: true })}
                placeholder="Enter old price"
              />
              {errors.old_price && <p className="text-sm text-red-500">{errors.old_price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input id="image_url" {...register("image_url")} placeholder="Enter image URL" />
              {errors.image_url && <p className="text-sm text-red-500">{errors.image_url.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="short_video_url">Short Video URL</Label>
              <Input id="short_video_url" {...register("short_video_url")} placeholder="Enter short video URL" />
              {errors.short_video_url && <p className="text-sm text-red-500">{errors.short_video_url.message}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="trending"
              control={control}
              render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} id="trending" />}
            />
            <Label htmlFor="trending">Trending</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content.about">About Course</Label>
            <Textarea id="content.about" {...register("content.about")} placeholder="Describe your course" />
            {errors.content?.about && <p className="text-sm text-red-500">{errors.content.about.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Requirements</Label>
            <Controller
              name="content.requirements"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {field.value.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={req}
                        onChange={(e) => {
                          const newReqs = [...field.value]
                          newReqs[index] = e.target.value
                          field.onChange(newReqs)
                        }}
                        placeholder={`Requirement ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newReqs = field.value.filter((_, i) => i !== index)
                          field.onChange(newReqs)
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => field.onChange([...field.value, ""])}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Requirement
                  </Button>
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Target Audience</Label>
            <Controller
              name="content.targetAudience"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {field.value.map((audience, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={audience}
                        onChange={(e) => {
                          const newAudience = [...field.value]
                          newAudience[index] = e.target.value
                          field.onChange(newAudience)
                        }}
                        placeholder={`Target Audience ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newAudience = field.value.filter((_, i) => i !== index)
                          field.onChange(newAudience)
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => field.onChange([...field.value, ""])}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Target Audience
                  </Button>
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>What You Will Learn</Label>
            <Controller
              name="content.whatYouWillLearn"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {field.value.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const newItems = [...field.value]
                          newItems[index] = e.target.value
                          field.onChange(newItems)
                        }}
                        placeholder={`Learning Objective ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newItems = field.value.filter((_, i) => i !== index)
                          field.onChange(newItems)
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => field.onChange([...field.value, ""])}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Learning Objective
                  </Button>
                </div>
              )}
            />
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="units">
              <AccordionTrigger>Course Units</AccordionTrigger>
              <AccordionContent>
                {unitFields.map((field, index) => (
                  <div key={field.id} className="space-y-4 mb-4 p-4 border rounded">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold">Unit {index + 1}</h4>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeUnit(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input {...register(`content.units.${index}.title`)} placeholder="Unit Title" />
                    <Textarea {...register(`content.units.${index}.description`)} placeholder="Unit Description" />
                    <div className="space-y-2">
                      {field.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="space-y-2 p-2 border rounded">
                          <Input
                            {...register(`content.units.${index}.lessons.${lessonIndex}.title`)}
                            placeholder="Lesson Title"
                          />
                          <Input
                            {...register(`content.units.${index}.lessons.${lessonIndex}.duration`)}
                            placeholder="Lesson Duration"
                          />
                          <Input
                            {...register(`content.units.${index}.lessons.${lessonIndex}.videoUrl`)}
                            placeholder="Lesson Video URL"
                          />
                          {/* Add fields for resources and quiz here if needed */}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const lessons = [...field.lessons]
                          lessons.push({ title: "", duration: "", videoUrl: "", resources: [], quiz: [] })
                          // Update the specific unit's lessons
                          const updatedUnits = [...unitFields]
                          updatedUnits[index] = { ...updatedUnits[index], lessons }
                          // Set the updated units back to the form
                          control._formValues.content.units = updatedUnits
                          control._updateFieldArray("content.units", updatedUnits)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Lesson
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendUnit({
                      title: "",
                      description: "",
                      lessons: [{ title: "", duration: "", videoUrl: "", resources: [], quiz: [] }],
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Unit
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-2">
            <Label htmlFor="category_id">Category ID</Label>
            <Input
              id="category_id"
              type="number"
              {...register("category_id", { valueAsNumber: true })}
              placeholder="Enter category ID"
            />
            {errors.category_id && <p className="text-sm text-red-500">{errors.category_id.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? "Creating Course..." : "Create Course"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export default AddCourseForm

