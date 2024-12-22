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
import { urlToFile } from "@/lib/utils";
import { updateUser } from "@/server/auth/update-user";
export default function ProfileEditForm({ user }: { user: TUserDeep }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const router = useRouter();
  const image = user.profilePicture;

  useEffect(() => {
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
  }, []);
  const form = useForm<TEditProfileForm>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      firstname: user?.resume?.first_name || "",
      lastname: user?.resume?.last_name || "",
      email: user?.resume?.email || user?.contact?.email || "",
      post: "",
      profile_picture: file,
      phone: user?.resume?.phone || user?.contact?.phone || "",
      facebook_link: user?.about?.facebook || "",
      instagram_link: user?.about?.instagram || "",
      whatsapp_link: user?.about?.whatsapp || "",
      about: user?.about?.description || "",
      location: user?.resume?.location || "",
      portfolio: user?.resume?.portfolio || "",
      // education: user?.resume?.education?.map((e) => ({
      //   education: e.education || "",
      // })),
      education: user?.resume?.education?.map((i) => i.education).join("\n"),
      birthday: user?.contact?.birthday || "",
      gender: user?.contact?.gender || "",
      citizenship_no: user?.contact?.citizenship || "",
      nationality: user?.contact?.nationality || "",
      religion: user?.contact?.religion || "",
      marital_status: user?.contact?.marital_status || "",
    },
  });
  const tabs = ["about", "resume", "contact"];

  async function onSubmit(values: TEditProfileForm) {
    setLoading(true);
    const payload: TEditProfileForm = {
      ...form.getValues(),
      profile_picture: file,
    };
    try {
      const res = await updateUser(payload, user.id);
      if (res.status === 200) {
        toast.success("Profile updated");
        {
          /* router.refresh(); */
        }
        {
          /* router.back(); */
        }
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
            onClick={() => form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid}
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
      <FormField
        control={control}
        name="education"
        render={({ field }) => (
          <MultiInput title="Education" placeholder="e.g. SEE.." {...field} />
        )}
      />

      <FormField
        control={control}
        name="hard_skill"
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
        name="technical_skill"
        render={({ field }) => (
          <MultiInput title="Technical Skills" placeholder="e.g. coding" />
        )}
      />

      <FormField
        control={control}
        name="interest"
        render={({ field }) => (
          <MultiInput title="Interests" placeholder="e.g. cricket" />
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
