export const postQuery = `
    *[_type == "post"]{ author->{ name, image, bio } } | order(_createdAt desc)[0..3]
`;

export const experienceQuery = `
    *[_type == "experience"] | order(_startDate)
`;
