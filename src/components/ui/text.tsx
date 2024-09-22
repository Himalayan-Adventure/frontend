import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/* TYPOGRAPHY 
  Reference: https://www.figma.com/file/dVf8vS7TiI4Y3XFVR0axrC/Typography?type=design&node-id=5-25&mode=design&t=IWHuQLW9s73wLePZ-4

  * font-weight shall be passed as a boolean props on the JSX. e.g., <Text variant="display-lg" semibold></Text>
*/

const textVariants = cva("font-medium whitespace-normal", {
  variants: {
    /**
     * Typography variants for the Text component.
     * Each variant corresponds to a specific CSS class.
     * @property {string} 'display-2xl' - Represents the CSS class for text with font size 7xl, leading-tight, and tracking -1.44px.
     * @property {string} 'display-xl' - Represents the CSS class for text with font size 6xl, leading-1.2, and tracking -1.2px.
     * @property {string} 'display-lg' - Represents the CSS class for text with font size 5xl, leading-tight, and tracking -0.96px.
     * @property {string} 'display-md' - Represents the CSS class for text with font size 4xl, leading-1.22, and tracking -0.72px.
     * @property {string} 'display-sm' - Represents the CSS class for text with font size 3xl and leading-tight.
     * @property {string} 'display-xs' - Represents the CSS class for text with font size 2xl.
     * @property {string} 'text-xl' - Represents the CSS class for text with font size xl and leading-normal.
     * @property {string} 'text-lg' - Represents the CSS class for text with font size lg and leading-1.55.
     * @property {string} 'text-md' - Represents the CSS class for text with font size base.
     * @property {string} 'text-sm' - Represents the CSS class for text with font size sm.
     * @property {string} 'text-xs' - Represents the CSS class for text with font size xs.
     */

    variant: {
      "display-2xl": `text-6xl 2xl:text-7xl leading-tight tracking-[-1.44px]`,
      "display-xl": `text-5xl 2xl:text-6xl leading-[1.2] tracking-[-1.2px]`,
      "display-lg": `text-4xl 2xl:text-5xl leading-tight tracking-[-0.96px]`,
      "display-md": `text-3xl 2xl:text-4xl leading-[1.22] tracking-[-0.72px]`,
      "display-sm": "text-2xl 2xl:text-3xl leading-tight",
      "display-xs": "text-xl 2xl:text-2xl",
      "text-xl": "text-lg lg:text-xl leading-normal",
      "text-lg": "text-sm md:text-base lg:text-lg leading-[1.55]",
      "text-md": "text-base",
      "text-sm": "text-sm",
      "text-xs": "text-xs",
    },

    gradient: {
      primary:
        "!bg-gradient-to-br from-green-700 to-green-600 !bg-clip-text !text-transparent",
    },
  },
  defaultVariants: {
    variant: "display-md",
  },
});

type TextElement =
  | HTMLParagraphElement
  | HTMLHeadingElement
  | HTMLSpanElement
  | HTMLDivElement;

export interface TextProps
  extends HTMLAttributes<TextElement>,
    VariantProps<typeof textVariants> {
  bold?: boolean;
  medium?: boolean;
  semibold?: boolean;

  as?: React.ElementType;
}

const Text = forwardRef<TextElement, TextProps>(
  (
    {
      as = "p",
      className,
      children,
      variant,
      gradient,
      medium,
      bold,
      semibold,
      ...props
    },
    ref,
  ) => {
    let fontWeightClass = "font-normal";

    if (bold) {
      fontWeightClass = "font-bold";
    } else if (semibold) {
      fontWeightClass = "font-semibold";
    } else if (medium) {
      fontWeightClass = "font-medium";
    }

    const Component = as; // 'as' is passed via props., defining what type of text to render.

    return (
      <Component
        className={cn(
          "text-[inherit]",
          textVariants({ variant, gradient }),
          fontWeightClass,
          className,
        )}
        ref={ref as React.Ref<TextElement>}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = "Text";

export { Text, textVariants };
