"use client";

import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionSchema } from "@/lib/validation";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { createQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  mongoUserId: string;
}

const Question = ({ mongoUserId }: Props) => {
  const editorRef = useRef(null);

  const type: string = "new";

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const pathname = usePathname();

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setIsSubmitting(true);
    try {
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });

      router.push("/");
      // call API
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
    console.log(values);
  }

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (event.key === "Enter" && field.name === "tags") {
      event.preventDefault();
      const tagInput = event.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        } else {
          form.trigger();
        }
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and image you are asking question to another person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed Explanation <span className="text-primary-500">*</span>
              </FormLabel>
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                onInit={(evt, editor) =>
                  // @ts-ignore
                  (editorRef.current = editor)
                }
                onBlur={field.onBlur}
                onEditorChange={(content) => field.onChange(content)}
                initialValue=""
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "codesample |bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Inetr,Arial,sans-serif; font-size:16px }",
                }}
              />
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Itroduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Add tags"
                  onKeyDown={(e) => handleInputKeyDown(e, field)}
                />
              </FormControl>
              {field.value.length > 0 && (
                <div className="flex-start mt-2.5 gap-2.5">
                  {field.value.map((tag: any) => (
                    <>
                      <Badge
                        className="subtle-medium background-light800_dark300 text-light400_light500 flex-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                        key={tag}
                      >
                        {tag}
                        <Image
                          src="/assets/icons/close.svg"
                          alt="close"
                          height={12}
                          width={12}
                          onClick={() => handleTagRemove(tag, field)}
                          className="cursor-pointer object-contain invert-0 dark:invert"
                        />
                      </Badge>
                    </>
                  ))}
                </div>
              )}
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add upto 3 tags to describe what your question about. You beed
                to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting"}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
