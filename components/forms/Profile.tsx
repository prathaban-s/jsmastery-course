"use client";

import React, { useState } from "react";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PorfileSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/lib/actions/user.action";

interface Props {
  clerkId: string;
  name: string;
  location: string;
  bio: string;
  username: string;
}

const Profile = ({ clerkId, name, location, bio, username }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const pathname = usePathname();

  const form = useForm<z.infer<typeof PorfileSchema>>({
    resolver: zodResolver(PorfileSchema),
    defaultValues: {
      name: name || "",
      username: username || "",
      bio: bio || "",
      location: location || "",
    },
  });

  async function onSubmit(values: z.infer<typeof PorfileSchema>) {
    console.log("On Submit");
    try {
      setIsSubmitting(true);

      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });
      router.push(`/profile/${clerkId}`);
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-9 flex w-full flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Name <span className="text-primary-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Username <span className="text-primary-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="username"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Location <span className="text-primary-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="location"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Bio <span className="text-primary-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Textarea
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="What's special about you?"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* <div className="mt-9 flex justify-end"> */}
        <Button
          type="submit"
          className="primary-gradient w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </Button>
        {/* </div> */}
      </form>
    </Form>
  );
};

export default Profile;
