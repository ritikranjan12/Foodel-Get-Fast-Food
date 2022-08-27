import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
    projectId: "fofo4h1t",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-08-25",
    token:"skwWzkrOQRnkwkP3wXSpcH1psZuSp8w91hf4UTMparntO83Wp9OMDDtAsHdC5C1NulEPxafxFQG8747PdZN8eAsKI8UxK7it7Isyt3XALrBF533sh4pNxFT1vneZSrVSikkBR6Qy9C1lp404sSZOTyWDk8IrZMZQAWe2tfON5d9sr6HBpR0G",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;