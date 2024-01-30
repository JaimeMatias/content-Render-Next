import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import Image from "next/image";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "recipe",
  });

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });
  return {
    props: {
      recipe: items[0],
    },
  };
}

export default function RecipeDetails({ recipe }) {
  const { featuredImage, title, cookingTime, ingredients, method } = recipe.fields;

  return (
    <div>
      <div className="banner">
        <Image
        src={'https:'+ featuredImage.fields.file.url}
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}/>
        <h2>{title}</h2>
      </div>
      <div className="info">
        <p>Take about {cookingTime} mins to cook.</p>
        <h3>ingredient:</h3>
        {ingredients.map(ing=>{
          <span key={ing}>{ing}</span>
        })}
      </div>
      <div className="method">
        <h3>{documentToReactComponents(method)}</h3>
      </div>
      <style jsx>{`
      h2,h2{
        text-transform:uppercase
      }
      .recipe-list { 
        display: grid;
        grid-template-colums: 1fr 1fr;
        grid-gap: 20px 60px;
      }
      `}</style>
    </div>
  );
}
