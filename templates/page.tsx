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
import { contact } from "@/server/actions/contact";

const formSchema = z.object({
  fullName: z.string().min(1, "Your name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const ContactPage = () => {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (pending) return;

    startTransition(() => {
      contact(values)
        .then((response) => {
          if (response?.success) {
            toast.success(
              "Message sent successfully. Thanks for getting in touch!",
            );
            form.reset();
          } else if (response?.error) {
            toast.error(
              "An error occurred while sending your message. Please try again later.",
            );
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error(
            "An error occurred while sending your message. Please try again later.",
          );
        });
    });
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="flex h-full w-full flex-col justify-between gap-y-4">
      <h1 className="text-center text-[3em] font-bold lg:text-[4rem]">
        Contact Me
      </h1>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-8 rounded-md border bg-black/10 px-4 py-8 shadow-lg dark:border-neutral-700 dark:bg-white/10 dark:shadow-md dark:shadow-neutral-700 md:px-12 md:py-24 lg:p-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <Required />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email Address <Required />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      disabled={isSubmitting}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Subject <Required />
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue placeholder="Select a Subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="General Inquiry">
                          General Inquiry
                        </SelectItem>
                        <SelectItem value="Feedback">Feedback</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Message <Required />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Why are you contacting me?"
                      disabled={isSubmitting}
                      className="max-h-32"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting}>
              {pending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

const Required = () => <span className="text-rose-500">*</span>;

export default ContactPage;
