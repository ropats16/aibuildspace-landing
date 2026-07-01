import { config, fields, collection, component } from '@keystatic/core';

const componentBlocks = {
  videoEmbed: component({
    label: 'Video Embed',
    schema: {
      url: fields.url({
        label: 'Video URL (YouTube or Instagram)',
        validation: { isRequired: true },
      }),
    },
    preview: () => null,
  }),
  captionedImage: component({
    label: 'Captioned Image',
    schema: {
      src: fields.image({
        label: 'Image',
        directory: 'public/images/blog/inline',
        publicPath: '/images/blog/inline/',
        validation: { isRequired: true },
      }),
      alt: fields.text({
        label: 'Alt text',
        validation: { isRequired: true },
      }),
      caption: fields.text({
        label: 'Caption',
      }),
    },
    preview: () => null,
  }),
  fileDownload: component({
    label: 'File Download',
    schema: {
      file: fields.file({
        label: 'File',
        directory: 'public/downloads',
        publicPath: '/downloads/',
        validation: { isRequired: true },
      }),
      title: fields.text({
        label: 'Title',
        description: 'Card heading, e.g. "Claude skill file".',
        validation: { isRequired: true },
      }),
      downloadName: fields.text({
        label: 'Download filename',
        description:
          'Exact filename the reader saves, e.g. skill.md. Leave blank to use the uploaded filename.',
      }),
      description: fields.text({
        label: 'Description',
        description: 'Optional one-liner shown under the title.',
      }),
    },
    preview: () => null,
  }),
};

export default config({
  storage:
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === 'github'
      ? {
          kind: 'github',
          repo: { owner: 'ropats16', name: 'aibuildspace-landing' },
        }
      : { kind: 'local' },

  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        publishedDate: fields.date({
          label: 'Published date',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description:
            'Hidden from the blog, sitemap, and search until unchecked.',
          defaultValue: true,
        }),
        summary: fields.text({
          label: 'Summary',
          description: 'Shown on cards and used as OG description fallback.',
          multiline: true,
          validation: { isRequired: true, length: { max: 320 } },
        }),
        metaDescription: fields.text({
          label: 'Meta description',
          description: 'SEO meta description (~150-160 chars).',
          multiline: true,
        }),
        keywords: fields.text({
          label: 'Keywords',
          description:
            'Comma-separated. e.g. ai workflows, claude code, prompt engineering',
          multiline: true,
        }),
        structuredData: fields.text({
          label: 'Structured data (JSON-LD)',
          description:
            'Advanced SEO/AEO. Paste full <script type="application/ld+json">…</script> blocks (e.g. HowTo, FAQPage). Injected into the article head as-is. Leave blank if unsure.',
          multiline: true,
        }),
        tags: fields.text({
          label: 'Tags',
          description: 'Comma-separated. Shown as pills on the post card.',
        }),
        bannerImage: fields.image({
          label: 'Banner image',
          description:
            '1200x675 (16:9). Doubles as the social preview image.',
          directory: 'public/images/blog/banners',
          publicPath: '/images/blog/banners/',
          validation: { isRequired: true },
        }),
        bannerAlt: fields.text({
          label: 'Banner alt text',
          validation: { isRequired: true },
        }),
        videoUrl: fields.url({
          label: 'Source video URL',
          description: 'YouTube or Instagram. Optional.',
        }),
        content: fields.document({
          label: 'Body',
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
          images: {
            directory: 'public/images/blog/inline',
            publicPath: '/images/blog/inline/',
            schema: {
              alt: fields.text({ label: 'Alt text' }),
              title: fields.text({ label: 'Caption' }),
            },
          },
          componentBlocks,
        }),
      },
    }),
  },
});
