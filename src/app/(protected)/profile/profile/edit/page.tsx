"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import FileDropZone from "@/components/ui/file-dropzone";
import { toast } from "sonner";
import {
  EditProfileFormSchema,
  TEditProfileForm,
} from "@/validators/profile-edit-validator";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import { MultiInput } from "@/components/ui/multi-input";
export default function ProfileEditForm() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const form = useForm<TEditProfileForm>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {},
  });
  const tabs = ["about", "resume", "contact"];

  async function onSubmit(values: TEditProfileForm) {
    setLoading(true);
    const payload = { ...form.getValues() };
    toast.success("Edited successfully");
  }
  const formContentMap: Record<string, React.ReactNode> = {
    about: <AboutForm control={form.control} />,
    resume: <ResumeForm control={form.control} />,
    contact: <ContactForm control={form.control} />,
  };
  return (
    <section className="max-w-4xl">
      <div className="my-4 [&>*]:text-neutral-900">
        <Text
          variant="display-sm"
          className="text-left font-poppins !text-xl font-bold capitalize sm:!text-2xl"
        >
          Edit Profile
        </Text>
      </div>
      <Form {...form}>
        <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="e.g. john.doe@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-1.5">
            <FormLabel className="dark:text-gray-100">Image</FormLabel>
            <FileDropZone
              required={true}
              value={file}
              onChange={(file) => {
                setFile(file || null);
              }}
            />
          </div>
          <Tabs defaultValue="about" className="space-y-8">
            <TabsList className="flex w-full items-start justify-start gap-x-2 bg-transparent">
              {tabs.map((i) => (
                <TabsTrigger
                  key={i}
                  value={i}
                  className="rounded-lg border border-gray-200 bg-background capitalize text-foreground shadow-2xl data-[state=active]:bg-foreground data-[state=active]:text-background"
                >
                  {i}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((i) => (
              <TabsContent
                value={i}
                className="space-y-8"
                key={`tab-content-${i}`}
              >
                {formContentMap[i]}
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex flex-col justify-center gap-y-2 sm:justify-center">
            <Button
              type="submit"
              onClick={() => form.handleSubmit(onSubmit)}
              //disabled={!form.formState.isValid}
              className="w-fit items-center gap-x-3 self-start rounded-full bg-foreground px-10 py-6 font-poppins font-bold"
              isLoading={loading}
            >
              Done
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
const AboutForm = ({ control }: { control: Control<TEditProfileForm> }) => {
  return (
    <>
      <FormField
        control={control}
        name="facebook_link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Facebook Link</FormLabel>
            <FormControl>
              <Input placeholder="Enter link" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="instagram_link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instagram Link</FormLabel>
            <FormControl>
              <Input placeholder="Enter link" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="whatsapp_link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>WhatsApp Link</FormLabel>
            <FormControl>
              <Input placeholder="Enter link" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="about"
        render={({ field }) => (
          <FormItem>
            <FormLabel>About</FormLabel>
            <FormControl>
              <Textarea className="resize-none" minLength={5} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="about"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Services</FormLabel>
            <FormControl></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const ResumeForm = ({ control }: { control: Control<TEditProfileForm> }) => {
  return (
    <>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="top-2">
            <FormLabel>Contact</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="e.g. john.doe@mail.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <PhoneInput
                defaultCountry="NP"
                initialValueFormat="national"
                placeholder="977 **********"
                {...field}
                value={field.value as any}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Enter location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="portfolio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Portfolio</FormLabel>
            <FormControl>
              <Input placeholder="Enter link" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <MultiInput title="Education" />
      <MultiInput title="Hard Skills" />
      <MultiInput title="Technical Skills" showSlider />
      <MultiInput title="Interest" />
    </>
  );
};

const ContactForm = ({ control }: { control: Control<TEditProfileForm> }) => {
  return (
    <section className="relative space-y-4">
      <Label className="py-4 font-poppins">Info</Label>
      <div className="relative ml-4 space-y-8">
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="NP"
                  initialValueFormat="national"
                  placeholder="977 **********"
                  {...field}
                  value={field.value as any}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="top-2">
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="e.g. john.doe@mail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Enter link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem className="top-2">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="citizenship_no"
          render={({ field }) => (
            <FormItem className="top-2">
              <FormLabel>Citizenship no.</FormLabel>
              <FormControl>
                <Input placeholder="12xxxxxxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="nationality"
          render={({ field }) => (
            <FormItem className="top-2">
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="Nationality" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="religion"
          render={({ field }) => (
            <FormItem className="top-2">
              <FormLabel>Relgiion </FormLabel>
              <FormControl>
                <Input placeholder="Relgiion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="marital_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marital status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
    </section>
  );
};
