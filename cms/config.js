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
  local_backend: true,
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
    // Projects -----------------------
    {
      name: "projects",
      label: "📁_ Projects",
      label_singular: "Project",
      i18n: true,
      folder: "content/projects",
      identifier_field: "name",
      create: true,
      slug: "{{name}}_{{id}}",
      // summary: "{{name}} | {{abstract | truncate(200, '...')}}",
      fields: [
        {
          label: "Order",
          name: "order",
          widget: "number",
          i18n: true,
        },
        {
          label: "ID",
          name: "id",
          widget: "string",
          i18n: true,
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
          i18n: true,
        },
        {
          label: "Reference",
          name: "reference",
          widget: "string",
          i18n: true,
        },
        {
          label: "Funding agency",
          name: "funding_agency",
          widget: "string",
          i18n: true,
        },
        {
          label: "Amount",
          name: "amount",
          widget: "number",
          pattern: [
            "\\d\\.?\\d{2}",
            "The correct format would be like 10000 or 10000.50 (American format)",
          ],
          i18n: true,
        },
        {
          label: "Currency",
          collection: "meta",
          name: "currency_type",
          search_fields: ["name"],
          value_field: "currency.*.code",
          widget: "relation",
          i18n: true,
        },
        {
          label: "Running from",
          name: "running_from",
          widget: "string",
          pattern: [
            "\\d{4}-\\d{4}",
            "The correct format would be like 2020-2022",
          ],
          i18n: true,
        },
        {
          label: "PI",
          collection: "authors",
          name: "pi",
          multiple: true,
          search_fields: ["name"],
          value_field: "name",
          widget: "relation",
          i18n: true,
        },
        {
          label: "Abstract",
          name: "abstract",
          widget: "markdown",
          i18n: true,
        },
        {
          i18n: true,
          label: "Relevant outputs",
          name: "relevant_outputs",
          required: false,
          widget: "list",
          fields: [
            {
              name: "resource_name",
              label: "Resource Name",
              widget: "string",
              i18n: true,
            },
            {
              name: "resource_link",
              label: "Resource",
              widget: "relation",
              collection: "resources",
              // required: false,
              value_field: "resource_link",
              search_fields: ["name", "label"],
              i18n: true,
              hint: "Link to a resource on the website",
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
          i18n: true,
        },
      ],
    },
    // Publications -------------------
    {
      name: "publications",
      label: "📚_ Publications",
      label_singular: "Publication",
      i18n: true,
      folder: "content/publications",
      identifier_field: "name",
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
          i18n: true,
        },
        {
          label: "Eds.",
          name: "eds",
          widget: "string",
          i18n: true,
        },
        {
          label: "Title",
          name: "name",
          widget: "string",
          i18n: true,
        },
        {
          label: "Journal",
          name: "journal",
          widget: "string",
          i18n: true,
        },
        {
          label: "Publishing house",
          name: "publishing_house",
          widget: "string",
          i18n: true,
        },
        {
          label: "Year",
          name: "year",
          widget: "string",
          i18n: true,
        },
        {
          label: "DOI/Link (insert the URL)",
          name: "doi",
          widget: "string",
          i18n: true,
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
          i18n: true,
        },
        {
          label: "Elbec members involved",
          collection: "authors",
          multiple: true,
          name: "elbec_members_involved",
          search_fields: ["name"],
          value_field: "name",
          widget: "relation",
          i18n: true,
        },
        {
          label: "Project",
          collection: "projects",
          multiple: true,
          name: "projects",
          search_fields: ["name"],
          value_field: "name",
          widget: "relation",
          i18n: true,
        },
      ],
    },
    // News & Events -------------------
    {
      name: "news_events",
      label: "📰_ News & Events",
      i18n: true,
      folder: "content/news-events",
      identifier_field: "name",
      create: true,
      fields: [
        {
          label: "Name",
          name: "name",
          widget: "string",
          i18n: true,
        },
        {
          label: "Date",
          name: "date",
          widget: "date",
          i18n: true,
        },
        {
          label: "Image",
          name: "image",
          media_folder: "/public/images",
          allow_multiple: false,
          widget: "image",
          required: false,
          i18n: true,
        },
        {
          label: "Abstract",
          name: "abstract",
          widget: "markdown",
          i18n: true,
        },
      ],
    },
    // Resource -----------------------
    {
      create: true,
      folder: "content/resources",
      i18n: true,
      identifier_field: "resource_name",
      label: "🧰 _ Resources",
      name: "resources",
      slug: "{{resource_name}}",
      fields: [
        {
          name: "resource_name",
          label: "Name",
          widget: "string",
          i18n: true,
        },
        {
          name: "resource_link",
          label: "Link",
          widget: "string",
          i18n: true,
        },
      ],
    },
    // Authors ------------------------
    {
      name: "authors",
      label: "👤_ Authors / Members",
      folder: "content/authors",
      identifier_field: "name",
      create: true,
      i18n: true,
      fields: [
        {
          label: "Order",
          name: "order",
          widget: "number",
          i18n: true,
        },
        {
          label: "Name",
          name: "name",
          widget: "string",
          i18n: true,
        },
        {
          label: "Photo",
          name: "photo",
          media_folder: "/public/images",
          widget: "image",
          required: false,
          i18n: true,
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
          i18n: true,
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
    // Pages --------------------------
    {
      name: "pages",
      label: "🧾_ Pages",
      files: [
        // Home -----------------------
        {
          name: "home",
          label: "Home [English]",
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
          label: "Home [Spanish]",
          file: "content/pages/es/home.md",
          fields: [
            {
              name: "hero_title",
              label: "[es] Hero Title",
              widget: "string",
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
          label: "Home [Catalan]",
          file: "content/pages/ca/home.md",
          fields: [
            {
              name: "hero_title",
              label: "[ca] Hero Title",
              widget: "string",
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
              widget: "markdown",
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
    // Publication Type ---------------
    {
      name: "publication_type",
      label: "📝_ Publication Type",
      folder: "content/publication_type",
      identifier_field: "name",
      create: true,
      i18n: true,
      fields: [
        {
          label: "Name",
          name: "name",
          widget: "string",
          i18n: true,
        },
      ],
    },
    // Configuration ------------------
    {
      name: "config",
      label: "⚙️_ Configuration",
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
    // Meta --------------------------
    {
      name: "meta",
      label: "📦_ Meta",
      label_singular: "Meta",
      identifier_field: "name",
      create: true,
      delete: false,
      files: [
        {
          name: "currency",
          identifier_field: "name",
          label: "Currencies",
          create: true,
          file: "content/meta/currency.md",
          fields: [
            {
              name: "currency",
              label: "Currency",
              widget: "list",
              fields: [
                {
                  label: "Name",
                  name: "name",
                  widget: "string",
                },
                {
                  label: "Code",
                  name: "code",
                  widget: "string",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
