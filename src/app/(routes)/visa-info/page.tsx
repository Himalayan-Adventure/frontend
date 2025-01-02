import { Banner } from "@/components/ui/banner";
import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Visa Info | ${siteConfig.siteName}`,
  description: `${siteConfig.siteName}`,
};
export default async function Page() {
  return (
    <section>
      <Banner title={"Visa Info"} desc="" />
      <article className="container relative space-y-2 lg:mt-40">
        <p>
          Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus.
          Vivamus elementum semper nisi. Curabitur ullamcorper ultricies nisi..
          Aliquam lobortis. Fusce fermentum. Nam quam nunc, blandit vel, luctus
          pulvinar, hendrerit id, lorem. Vivamus consectetuer hendrerit lacus.
          Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus.
          Morbi ac felis. Vivamus consectetuer hendrerit lacus. Nulla facilisi.
          Sed lectus. Praesent ut ligula non mi varius sagittis. Nulla neque
          dolor, sagittis eget, iaculis quis, molestie non, velit. Nam at tortor
          in tellus interdum sagittis. Aenean vulputate eleifend tellus. Fusce
          fermentum. Aliquam eu nunc. Praesent ac sem eget est egestas volutpat.
          Nunc sed turpis. Quisque id odio. Vestibulum turpis sem, aliquet eget,
          lobortis pellentesque, rutrum eu, nisl. Vivamus quis mi. Praesent
          egestas tristique nibh.
        </p>

        <p>
          Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus.
          Vivamus elementum semper nisi. Curabitur ullamcorper ultricies nisi..
          Aliquam lobortis. Fusce fermentum. Nam quam nunc, blandit vel, luctus
          pulvinar, hendrerit id, lorem. Vivamus consectetuer hendrerit lacus.
          Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus.
          Morbi ac felis. Vivamus consectetuer hendrerit lacus. Nulla facilisi.
          Sed lectus. Praesent ut ligula non mi varius sagittis. Nulla neque
          dolor, sagittis eget, iaculis quis, molestie non, velit. Nam at tortor
          in tellus interdum sagittis. Aenean vulputate eleifend tellus. Fusce
          fermentum. Aliquam eu nunc. Praesent ac sem eget est egestas volutpat.
          Nunc sed turpis. Quisque id odio. Vestibulum turpis sem, aliquet eget,
          lobortis pellentesque, rutrum eu, nisl. Vivamus quis mi. Praesent
          egestas tristique nibh.
        </p>
      </article>
    </section>
  );
}
