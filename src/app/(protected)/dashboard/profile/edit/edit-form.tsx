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
import { TUserDeep } from "@/types/auth";
import { capitalize, urlToFile } from "@/lib/utils";
import { updateUser } from "@/server/auth/update-user";
export default function ProfileEditForm({ user }: { user: TUserDeep }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const router = useRouter();
  const image = user.profilePicture;

  useEffect(() => {
    try {
      const getBlob = async () => {
        if (!image?.url) return;
        const imageBlob = await urlToFile(
          image?.url,
          image?.name || user?.username + " profile picture",
        );
        setFile(imageBlob);
      };
      //eslint-disable-next-line
      getBlob();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const form = useForm<TEditProfileForm>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      profilePicture: file,
      about: {
        facebook: user?.about?.facebook,
        instagram: user?.about?.instagram,
        whatsapp: user?.about?.whatsapp,
        description: user?.about?.description || "",
      },
      resume: {
        first_name: user?.resume?.first_name || "",
        last_name: user?.resume?.last_name || "",
        email: user?.resume?.email || "",
        phone: user?.resume?.phone || user?.contact?.phone || "",
        location: user.resume?.location || "",
        portfolio: user.resume?.portfolio,
        hard_skill: user?.resume?.hard_skill || "",
        technical_skill: user?.resume?.technical_skill || "",
        education: user?.resume?.education?.map((i) => i.education).join("\n"),

        // education: user?.resume?.education?.map((e) => ({
        //   education: e.education || "",
        // })),
        interest: user?.resume?.interest || "",
      },
      contact: {
        phone: user?.resume?.phone || user?.contact?.phone || "",
        address: user?.resume?.location || "",
        birthday: user?.contact?.birthday || "",
        gender: user?.contact?.gender || "",
        citizenship: user?.contact?.citizenship || "",
        nationality: user?.contact?.nationality || "",
        religion: user?.contact?.religion || "",
        marital_status: user?.contact?.marital_status || "",
      },
    },
  });

  const {
    formState: { errors },
  } = form;
  const tabs = ["about", "resume", "contact"];

  async function onSubmit(values: TEditProfileForm) {
    setLoading(true);
    const payload: TEditProfileForm = {
      ...form.getValues(),
      profilePicture: file,
    };
    try {
      const res = await updateUser(payload, user.id);
      if (res.status === 200) {
        toast.success("Profile updated");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }
  const formContentMap: Record<string, React.ReactNode> = {
    about: <AboutForm control={form.control} />,
    resume: <ResumeForm control={form.control} />,
    contact: <ContactForm control={form.control} />,
  };
  return (
    <Form {...form}>
      <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
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
              if (file) {
                setFile(file);
              } else {
                setFile(undefined);
              }
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
            onClick={() => {
              if (!form.formState.isValid) {
                console.log(form.getFieldState('resume.portfolio'))
                const firstError = Object.keys(errors).reduce((field, a) => {
                  return errors[field as keyof TEditProfileForm] ? field : a;
                }, "");
                if (firstError) {
                  toast.error(`${capitalize(firstError)} Field is invalid`, {
                    className: "bg-red-100",
                  });
                } else {
                  toast.error(`Please check all the fields`, {
                    className: "bg-red-100",
                  });
                }
              } else {
                form.handleSubmit(onSubmit);
              }
            }}
            //disabled={!form.formState.isValid}
            className="w-fit items-center gap-x-3 self-start rounded-full bg-foreground px-10 py-6 font-poppins font-bold"
            isLoading={loading}
          >
            Done
          </Button>
        </div>
      </form>
    </Form>
  );
}
const AboutForm = ({ control }: { control: Control<TEditProfileForm> }) => {
  return (
    <>
      <FormField
        control={control}
        name="about.facebook"
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
        name="about.instagram"
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
        name="about.whatsapp"
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
        name="about.description"
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

      {/* <FormField
        control={control}
        name="about"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Services</FormLabel>
            <FormControl></FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
    </>
  );
};

const ResumeForm = ({ control }: { control: Control<TEditProfileForm> }) => {
  return (
    <>
      <FormField
        control={control}
        name="resume.first_name"
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
        control={control}
        name="resume.last_name"
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
        control={control}
        name="resume.email"
        render={({ field }) => (
          <FormItem className="top-2">
            <FormLabel>Contact email</FormLabel>
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
        name="resume.phone"
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
        name="resume.location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="Enter location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="resume.portfolio"
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
      <FormField
        control={control}
        name="resume.education"
        render={({ field }) => (
          <MultiInput title="Education" placeholder="e.g. SEE.." {...field} />
        )}
      />

      <FormField
        control={control}
        name="resume.hard_skill"
        render={({ field }) => (
          <MultiInput
            title="Hard Skills"
            placeholder="e.g. Designing.."
            {...field}
          />
        )}
      />

      <FormField
        control={control}
        name="resume.technical_skill"
        render={({ field }) => (
          <MultiInput
            title="Technical Skills"
            placeholder="e.g. coding"
            {...field}
          />
        )}
      />

      <FormField
        control={control}
        name="resume.interest"
        render={({ field }) => (
          <MultiInput title="Interests" placeholder="e.g. cricket" {...field} />
        )}
      />
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
          name="contact.phone"
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
          name="contact.email"
          render={({ field }) => (
            <FormItem className="top-2">
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

        <FormField
          control={control}
          name="contact.birthday"
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
          name="contact.address"
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
          name="contact.gender"
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
                  <SelectItem value="other">Others</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="contact.citizenship"
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
          name="contact.nationality"
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
          name="contact.religion"
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
          name="contact.marital_status"
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
