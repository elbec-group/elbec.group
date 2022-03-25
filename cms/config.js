// eslint-disable-next-line import/no-anonymous-default-export
export default {
  cms_manual_init: true,
  backend: {
    name: "github",
    repo: "elbec-group/elbec.group",
    branch: "main",
    publish_mode: "editorial_workflow",
    commit_messages: {
      create: "Create {{collection}} “{{slug}}”",
      update: "Update {{collection}} “{{slug}}”",
      delete: "Delete {{collection}} “{{slug}}”",
      uploadMedia: "[skip ci] Upload “{{path}}”",
      deleteMedia: "[skip ci] Delete “{{path}}”",
    },
  },
  // local_backend: true,
  media_folder: "images",
  public_folder: "/images",
  slug: {
    encoding: "ascii",
    clean_accents: true,
    sanitize_replacement: "-",
  },
  i18n: {
    structure: "multiple_folders",
    locales: ["en", "es", "ca"],
    default_locale: "en",
  },
  collections: [
    // Meta --------------------------
    {
      name: "meta",
      label: "Meta",
      delete: false,
      files: [
        {
          name: "authors",
          label: "Authors / Members",
          identifier_field: "name",
          create: true,
          file: "content/meta/authors.yml",
          fields: [
            {
              name: "authors",
              label: "Authors / Members",
              label_singular: "Authors / Members",
              widget: "list",
              fields: [
                {
                  label: "Name",
                  name: "name",
                  widget: "string",
                },
                {
                  label: "Photo",
                  name: "photo",
                  widget: "image",
                  required: false,
                },
                {
                  label: "Role",
                  name: "role",
                  widget: "string",
                  required: false,
                },
                {
                  label: "Link",
                  name: "url",
                  widget: "list",
                  required: false,
                  fields: [
                    {
                      label: "Link",
                      name: "url",
                      widget: "string",
                    },
                  ],
                },
                {
                  label: "Biography",
                  name: "bio",
                  widget: "markdown",
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    },
    // Pages --------------------------
    {
      name: "pages",
      label: "Pages",
      files: [
        // Home -----------------------
        {
          name: "home",
          label: "Home 🇬🇧",
          file: "content/pages/en/home.md",
          fields: [
            {
              name: "hero_title",
              label: "[en] Hero Title",
              widget: "string",
            },
            {
              name: "logo_alt",
              label: "[en] Logo Alt Text",
              widget: "string",
            },
            {
              name: "home_title",
              label: "[en] Home Title",
              widget: "string",
            },
          ],
        },
        {
          name: "home-es",
          label: "Home 🇪🇸",
          file: "content/pages/es/home.md",
          fields: [
            {
              name: "hero_title",
              label: "[es] Hero Title",
              widget: "markdown",
            },
            {
              name: "logo_alt",
              label: "[es] Logo Alt Text",
              widget: "string",
            },
            {
              name: "home_title",
              label: "[es] Home Title",
              widget: "string",
            },
          ],
        },
        {
          name: "home-ca",
          label: "Home 🇦🇩",
          file: "content/pages/ca/home.md",
          fields: [
            {
              name: "hero_title",
              label: "[ca] Hero Title",
              widget: "markdown",
            },
            {
              name: "logo_alt",
              label: "[ca] Logo Alt Text",
              widget: "string",
            },
            {
              name: "home_title",
              label: "[ca] Home Title",
              widget: "string",
            },
          ],
        },
        // Mission
        {
          name: "mission",
          label: "Mission [English]",
          file: "content/pages/en/mission.md",
          fields: [
            {
              name: "mission",
              label: "[en] Mission",
              widget: "text",
            },
          ],
        },
        {
          name: "mission-es",
          label: "Mission [Spanish]",
          file: "content/pages/es/mission.md",
          fields: [
            {
              name: "mission",
              label: "[es] Mission",
              widget: "markdown",
            },
          ],
        },
        {
          name: "mission-ca",
          label: "Mission [Catalan]",
          file: "content/pages/ca/mission.md",
          fields: [
            {
              name: "mission",
              label: "[ca] Mission",
              widget: "markdown",
            },
          ],
        },
      ],
    },
    // Authors ------------------------
    {
      name: "authors",
      label: "Authors / Members",
      folder: "content/authors",
      identifier_field: "name",
      create: true,
      i18n: true,
      fields: [
        {
          label: "Name",
          name: "name",
          widget: "string",
        },
        {
          label: "Order",
          name: "order",
          widget: "number",
        },
        {
          label: "Photo",
          name: "photo",
          widget: "image",
          required: false,
        },
        {
          label: "Role",
          name: "role",
          widget: "string",
          required: false,
          i18n: true,
        },
        {
          label: "Link",
          name: "url",
          widget: "string",
          required: false,
        },
        {
          label: "Biography",
          name: "bio",
          widget: "markdown",
          required: false,
          i18n: true,
        },
      ],
    },
    // Publication Type ---------------
    {
      name: "publication_type",
      label: "Publication Type",
      folder: "content/publication_type",
      identifier_field: "name",
      create: true,
      fields: [
        {
          label: "Name",
          name: "name",
          widget: "string",
        },
      ],
    },
    // Projects -----------------------
    {
      name: "projects",
      label: "Projects",
      label_singular: "Project",
      i18n: true,
      folder: "content/projects",
      identifier_field: "name",
      create: true,
      slug: "{{fields.name}}",
      // summary: "{{name}} | {{abstract | truncate(200, '...')}}",
      fields: [
        {
          label: "Is Publish",
          name: "draft",
          widget: "boolean",
          default: false,
          required: false,
        },
        {
          label: "ID",
          name: "id",
          widget: "string",
        },
        {
          label: "Publication Date",
          name: "publication_date",
          widget: "date",
        },
        {
          label: "Name",
          name: "name",
          widget: "string",
          i18n: true,
        },
        {
          label: "Image",
          name: "image",
          media_folder: "/public/images",
          allow_multiple: false,
          widget: "image",
          required: false,
        },
        {
          label: "Reference",
          name: "reference",
          widget: "string",
        },
        {
          label: "Funding agency",
          name: "funding_agency",
          widget: "string",
        },
        {
          label: "Amount",
          name: "amount",
          widget: "string",
          pattern: [
            "\\d\\.?\\d{2}",
            "The correct format would be like 10000 or 10000.50 (American format)",
          ],
        },
        {
          label: "Running from",
          name: "running_from",
          widget: "string",
          pattern: [
            "\\d{4}-\\d{4}",
            "The correct format would be like 2020-2022",
          ],
        },
        {
          label: "PI",
          collection: "authors",
          name: "pi",
          multiple: true,
          search_fields: ["name"],
          value_field: "name",
          widget: "relation",
        },
        {
          label: "Abstract",
          name: "abstract",
          widget: "markdown",
          i18n: true,
        },
        {
          label: "Relevant outputs",
          name: "relevant_outputs",
          widget: "list",
          required: false,
          fields: [
            {
              name: "resource",
              label: "Resource",
              widget: "text",
              i18n: true,
            },
            {
              name: "link",
              label: "Link",
              widget: "text",
              i18n: true,
              pattern: [
                "^https?://",
                "The correct format would be like https://www.elbec.group/",
              ],
              hint: "Link to the resource",
            },
          ],
        },
        {
          label: "Members",
          collection: "authors",
          multiple: true,
          name: "members",
          required: false,
          search_fields: ["name"],
          value_field: "name",
          widget: "relation",
        },
      ],
    },
    // Publications -------------------
    {
      name: "publications",
      label: "Publications",
      label_singular: "Publication",
      i18n: true,
      folder: "content/publications",
      identifier_field: "title",
      create: true,
      fields: [
        {
          label: "Publication Type",
          collection: "publication_type",
          multiple: false,
          name: "publication_type",
          search_fields: ["name"],
          value_field: "name",
          widget: "relation",
        },
        {
          label: "Eds.",
          name: "eds",
          widget: "string",
        },
        {
          label: "Title",
          name: "title",
          widget: "string",
          i18n: true,
        },
        {
          label: "Journal",
          name: "journal",
          widget: "string",
        },
        {
          label: "Publishing house",
          name: "publishing_house",
          widget: "string",
        },
        {
          label: "Year",
          name: "year",
          widget: "string",
        },
        {
          label: "DOI/Link (insert the URL)",
          name: "doi",
          widget: "string",
        },
        {
          label: "Abstract",
          name: "abstract",
          widget: "markdown",
          i18n: true,
        },
        {
          label: "Authors",
          collection: "authors",
          multiple: true,
          name: "authors",
          search_fields: ["name"],
          value_field: "name",
          widget: "relation",
        },
        {
          label: "Elbec members involved",
          collection: "authors",
          multiple: true,
          name: "elbec_members_involved",
          search_fields: ["name"],
          value_field: "name",
          widget: "relation",
        },
        {
          label: "Project",
          collection: "projects",
          multiple: true,
          name: "projects",
          search_fields: ["name"],
          value_field: "name",
          widget: "relation",
        },
      ],
    },
    // Configuration ------------------
    {
      name: "config",
      label: "Configuration",
      label_singular: "Configuration",
      i18n: false,
      identifier_field: "title",
      create: true,
      files: [
        {
          name: "home",
          label: "Home",
          file: "content/config/home.md",
          fields: [
            {
              name: "num_news",
              label: "Number of news & events",
              widget: "number",
              default: 2,
              value_type: "int",
              min: 1,
              max: 4,
              step: 1,
            },
            {
              name: "num_projects",
              label: "Number of projects",
              widget: "number",
              default: 2,
              value_type: "int",
              min: 1,
              max: 4,
              step: 1,
            },
          ],
        },
      ],
    },
    // Resource -----------------------
    {
      name: "resources",
      label: "Resources",
      label_singular: "Resources",
      i18n: false,
      identifier_field: "title",
      create: true,
      files: [
        {
          name: "home",
          label: "Resources",
          file: "content/resources.md",
          fields: [
            {
              name: "num_news",
              label: "Number of news & events",
              widget: "number",
              default: 2,
              value_type: "int",
              min: 1,
              max: 4,
              step: 1,
            },
            {
              name: "num_projects",
              label: "Number of projects",
              widget: "number",
              default: 2,
              value_type: "int",
              min: 1,
              max: 4,
              step: 1,
            },
          ],
        },
      ],
    },
  ],
};
