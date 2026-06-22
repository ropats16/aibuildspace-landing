import { DocumentRenderer } from "@keystatic/core/renderer";
import type { DocumentRendererProps } from "@keystatic/core/renderer";
import type { DocumentNode } from "@keystatic/core";
import { VideoEmbed } from "./VideoEmbed";

// ---------------------------------------------------------------------------
// Slugify: stable, lowercase, alphanumeric + hyphens only
// ---------------------------------------------------------------------------
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

// ---------------------------------------------------------------------------
// Extract plain text from DocumentRenderer children (ReactNode)
// ---------------------------------------------------------------------------
type WithChildren = { children?: React.ReactNode };

function reactNodeToString(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactNodeToString).join("");
  if (node !== null && typeof node === "object" && "props" in node) {
    const props = (node as React.ReactElement<WithChildren>).props;
    return reactNodeToString(props?.children);
  }
  return "";
}

// ---------------------------------------------------------------------------
// Component block renderers
// ---------------------------------------------------------------------------

type CaptionedImageProps = {
  src: { data: Uint8Array; extension: string; filename: string } | string | null;
  alt: string;
  caption?: string;
};

function CaptionedImageBlock({ src, alt, caption }: CaptionedImageProps) {
  const srcString =
    typeof src === "string" ? src : src != null ? `/images/blog/inline/${src.filename}` : "";

  if (!srcString) return null;

  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={srcString} alt={alt} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

type ArticleRendererProps = {
  document: readonly DocumentNode[];
};

// ---------------------------------------------------------------------------
// Renderers config
// ---------------------------------------------------------------------------

const renderers: DocumentRendererProps["renderers"] = {
  inline: {
    link: ({ children, href }) => {
      const isExternal =
        typeof href === "string" && /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    heading: ({ level, children }) => {
      const text = reactNodeToString(children);
      const id = slugify(text);
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return <Tag id={id}>{children}</Tag>;
    },
    image: ({ src, alt, title }) => {
      return (
        <figure>
          {/* Plain img: intrinsic dimensions are unknown at render time */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" decoding="async" />
          {title && <figcaption>{title}</figcaption>}
        </figure>
      );
    },
  },
};

// ---------------------------------------------------------------------------
// Component blocks
// ---------------------------------------------------------------------------

const componentBlocks = {
  videoEmbed: ({ url }: { url: string }) => <VideoEmbed url={url} />,
  captionedImage: (props: CaptionedImageProps) => (
    <CaptionedImageBlock {...props} />
  ),
};

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function ArticleRenderer({ document }: ArticleRendererProps) {
  return (
    <div className="prose">
      <DocumentRenderer
        document={document as Parameters<typeof DocumentRenderer>[0]["document"]}
        renderers={renderers}
        componentBlocks={componentBlocks}
      />
    </div>
  );
}
