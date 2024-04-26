"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { AddDevice } from "@/server/actions/addDevice";

export const FormSchema = z.object({
  deviceName: z.string().min(1, "A device name is required"),
  roomName: z.string().min(1, "A room is required"),
  teacherName: z.string().min(1, "A teacher is requried"),
});

const DevicePage = () => {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      deviceName: "WLS-",
      roomName: "",
      teacherName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (pending) return;

    startTransition(() => {
      AddDevice(values)
        .then((response) => {
          if (response?.success) {
            toast.success("Device added successfully.");
          } else if (response?.error) {
            toast.error(
              "Something went wrong. Please try again later (or fix it if you're Luke)"
            );
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error(
            "Something went wrong. Please try again later (or fix it if you're Luke)"
          );
        });
    });
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div>
      <h1>Add Device</h1>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="deviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Device Name <Required />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="WLS-"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Room
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger disabled={isSubmitting}>
                            <SelectValue placeholder="Select a room" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            
                          }
                        </SelectContent>
                      </Select>
                  </FormControl>
                </FormItem>
              )}
          </form>
        </Form>
      </div>
    </div>
  );
};

const Required = () => <span className="text-rose-500">*</span>;
