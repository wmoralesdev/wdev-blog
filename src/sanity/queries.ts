export const postFields = `
    _id,
    _createdAt,
    _updatedAt,
    author->{
        name,
        'image': image.asset->url,
        bio[]{
            children[]{
                _type,
                text,
                marks
            }
        }
    },
    body[]{
        _type == 'image' => {
            _type,
            'url': asset->url
        },
        _type != 'image' => @
    },
    categories[]->{
        title
    },
    title,
    slug,
    'coverImage': mainImage.asset->url,
    'miniatureImage': miniature.asset->url,
`;

export const postsSlugs = `
    *[_type == "post"] {
        'slug': slug.current
    }
`;

export const mostRecentPostsQuery = `
    *[_type == "post"] | order(_createdAt desc) {
        _id,
        _createdAt,
        _updatedAt,
        categories[]->{
            title
        },
        title,
        slug,
        'coverImage': mainImage.asset->url,
    }
`;

export const threeTopPostsQuery = `
    *[_type == "post"] | order(_createdAt desc)[0..3] {
        ${postFields}
    }
`;

export const postBySlugQuery = `
    *[_type == "post" && slug.current == $slug][0] {
        ${postFields}
    }
`;

export const experienceQuery = `
    *[_type == "experience"] | order(_startDate)
`;
